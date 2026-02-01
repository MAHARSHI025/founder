"use client"
import FaceIdLoader from '@/components/FaceIdLoader'
import * as faceapi from "face-api.js";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'


export default function FaceLogin() {
    const videoRef = useRef(null)
    const detectIntervalRef = useRef(null)
    const registeringRef = useRef(false);

    const [faceDetected, setFaceDetected] = useState(false);
    const [modelsLoaded, setModelsLoaded] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    /* ================= CAMERA CONTROL ================= */

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "user" },
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            registerFace()
            toast.error('Camera permission denied')
        }
    };

    const stopCamera = () => {
        const stream = videoRef.current?.srcObject;
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
            videoRef.current.srcObject = null;
        }
    };

    /* ================= LOAD MODELS ================= */

    useEffect(() => {
        let mounted = true;

        const loadModels = async () => {
            await Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
                faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
                faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
            ]);

            if (mounted) {
                setModelsLoaded(true);
                setLoading(false);
                startCamera();
            }
        };

        loadModels();

        return () => {
            mounted = false;
            stopCamera();
            if (detectIntervalRef.current) {
                clearInterval(detectIntervalRef.current)
            }
        };
    }, []);

    /* ================= LIVE FACE DETECTION ================= */

    useEffect(() => {
        if (!modelsLoaded || !videoRef.current) return;

        detectIntervalRef.current = setInterval(async () => {
            if (!videoRef.current) return;

            const detection = await faceapi.detectSingleFace(
                videoRef.current,
                new faceapi.TinyFaceDetectorOptions({
                    inputSize: 416,
                    scoreThreshold: 0.5,
                })
            );
            if (detection && !registeringRef.current) {
                registeringRef.current = true;
                registerFace();
            }

            setFaceDetected(!!detection);
        }, 300);

        return () => clearInterval(detectIntervalRef.current);
    }, [modelsLoaded]);

    /* ================= REGISTER FACE ================= */

    const registerFace = async () => {

        const result = await faceapi
            .detectSingleFace(
                videoRef.current,
                new faceapi.TinyFaceDetectorOptions({
                    inputSize: 416,
                    scoreThreshold: 0.5,
                })
            )
            .withFaceLandmarks()
            .withFaceDescriptor();

        if (!result) {
            registerFace()
            toast.error('No face detected')
            return
        }

        stopCamera();

        clearInterval(detectIntervalRef.current);


        const response = await fetch(
            "/api/face/verify",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    descriptor: Array.from(result.descriptor),
                }),
            }
        );

        const data = await response.json();

        if (!data.success || response.status !== 200) {
            toast.error("Error registering face");
            registerFace()
            return
        } else {
            toast.success("Welcome " + data?.email);
            router.push('/')
            return
        }
    };

    return (
        <div className="flex justify-center items-center flex-col h-screen gap-4 bg-gray-100">
            <h1 className="text-xl font-semibold">Face Register</h1>

            {loading && <p>Loading models...</p>}

            <video
                ref={videoRef}
                autoPlay
                muted
                width={300}
                height={300}
                className={`rounded-full h-72 w-72 border-2 ${faceDetected ? "border-green-600" : "border-red-600"}`}
                style={{ transform: "scaleX(-1)" }}
            />


        </div>
    );
}