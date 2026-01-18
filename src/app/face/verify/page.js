'use client'

import FaceIdLoader from '@/components/FaceIdLoader'
import * as faceapi from 'face-api.js'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

export default function FaceLogin() {
    const videoRef = useRef(null)
    const detectIntervalRef = useRef(null)
    const loginInProgressRef = useRef(false)

    const router = useRouter()
    const [faceDetected, setFaceDetected] = useState(false)
    const [modelsLoaded, setModelsLoaded] = useState(false)
    const [running, setRunning] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function loadModels() {
            await Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
                faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
                faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
            ])
            setModelsLoaded(true)
        }
        loadModels()

    }, [])


    // useEffect(() => {
        
    //     if (faceDetected) {
    //             stopCamera()

    //         // loginFace()
    //     }

    // }, [faceDetected])

    async function startCamera() {

        if (!modelsLoaded) {
            toast.error('Models are still loading')
            return
        }

        if (videoRef.current && videoRef.current.srcObject) return

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true })
            videoRef.current.srcObject = stream
            startLiveDetection()
            setRunning(true)
        } catch (err) {
            console.error(err)
            toast.error('Camera permission denied')
        }
    }

    function stopCamera() {


        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject
            stream.getTracks().forEach(track => track.stop())
            videoRef.current.srcObject = null

        }

        if (detectIntervalRef.current) {
            clearInterval(detectIntervalRef.current)
            detectIntervalRef.current = null
        }
        setRunning(false)

        setFaceDetected(false)
    }

    function startLiveDetection() {
        detectIntervalRef.current = setInterval(async () => {
            if (!videoRef.current || loginInProgressRef.current) return

            const detection = await faceapi.detectSingleFace(
                videoRef.current,
                new faceapi.TinyFaceDetectorOptions()
            )

            if (detection) {
                loginInProgressRef.current = true

                clearInterval(detectIntervalRef.current)
                detectIntervalRef.current = null

                setFaceDetected(true)
                loginFace()
            }
        }, 300)
    }


    async function loginFace() {

        console.log('login called');

        setLoading(true)

        if (!videoRef.current) return

        const result = await faceapi
            .detectSingleFace(
                videoRef.current,
                new faceapi.TinyFaceDetectorOptions()
            )
            .withFaceLandmarks()
            .withFaceDescriptor()

        if (!result) {
            toast.error('No face detected')
            return
        }

        const res = await fetch('/api/face/verify', {
            method: 'POST',
            body: JSON.stringify({
                descriptor: Array.from(result.descriptor),
            }),
        })
        const data = await res.json()

        loginInProgressRef.current = false

        if (!res.ok) {
            loginInProgressRef.current = false
            toast.error('Face verification failed')
            setLoading(false)
            stopCamera()
            return
        }

        setLoading(false)
        toast.success(`Welcome ${data.email}`)
        router.push('/')
    }

    return (
        <>
            {loading ?
                <FaceIdLoader />
                :

                <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
                    <h1 className="text-xl font-semibold">Face Login</h1>

                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        className="rounded-full"
                        style={{
                            transform: 'scaleX(-1)',
                            border: faceDetected ? '5px solid green' : '5px solid red',
                            height: '200px',
                            width: '200px',
                            objectFit: 'cover',
                        }}
                    />

                    <div className="flex gap-3">
                        <button
                            onClick={running ? stopCamera : startCamera}
                            className={`px-4 py-2 ${running ? 'bg-red-500' : 'bg-green-500'} text-white rounded`}
                        >
                            {running ? 'Stop Camera' : 'Start Camera'}
                        </button>
                        {/* <button
                            onClick={loginFace}
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Login
                        </button> */}
                    </div>
                </div>
            }
        </>

    )
}
