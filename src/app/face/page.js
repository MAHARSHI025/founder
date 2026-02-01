'use client'

import * as faceapi from 'face-api.js'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';

export default function FaceRegister() {
    const videoRef = useRef(null)
    const detectIntervalRef = useRef(null);
    const { data: session, status } = useSession();
    const router = useRouter();


    const [faceDetected, setFaceDetected] = useState(false);
    const [modelsLoaded, setModelsLoaded] = useState(false);
    const [loading, setLoading] = useState(true);

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
            toast.error("Camera not available or permission denied");
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
        if (status === 'unauthenticated' || !session?.user?.email) {
            router.push('/');
            return
        }
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
                clearInterval(detectIntervalRef.current);
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
            if (!!detection) {
                registerFace()
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
            alert("No face detected. Please look at the camera.");
            return;
        }

        stopCamera();

        clearInterval(detectIntervalRef.current);


        const response = await fetch("/api/face", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: session?.user?.email,
                descriptor: Array.from(result.descriptor),
            }),

        });

        if (!response.ok) {
            alert("Error registering face");
            toast.error("Error registering face");
            return;
        } else {
            toast.success("Face registered successfully");
            router.push('/');
            return;
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
                className="rounded-2xl border border-gray-300"
                style={{ transform: "scaleX(-1)" }}
            />

            <h2
                className={`text-lg font-medium ${faceDetected ? "text-green-600" : "text-red-500"
                    }`}
            >
                {faceDetected ? "Face Detected" : "No Face Detected"}
            </h2>


        </div>
    );
}