'use client'

import * as faceapi from 'face-api.js'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import toast from 'react-hot-toast'

export default function FaceLogin() {
    const videoRef = useRef(null)
    const router = useRouter();


    useEffect(() => {
        async function loadModels() {
            await Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
                faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
                faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
            ])

            const stream = await navigator.mediaDevices.getUserMedia({ video: true })
            videoRef.current.srcObject = stream
        }

        loadModels()
    }, [])

    function stopCamera(videoRef) {
        const stream = videoRef.current?.srcObject
        if (stream) {
            stream.getTracks().forEach(track => track.stop())
            videoRef.current.srcObject = null
        }
    }

    const loginFace = async () => {
        const result = await faceapi
            .detectSingleFace(
                videoRef.current,
                new faceapi.TinyFaceDetectorOptions()
            )
            .withFaceLandmarks()
            .withFaceDescriptor()

        if (!result) return alert('No face detected')

        const res = await fetch('/api/face/verify', {
            method: 'POST',
            body: JSON.stringify({
                descriptor: Array.from(result?.descriptor),
            }),
        })


        if (!res.status === 200) {
            return alert('Error registering face')
        } else {
            toast.success('Face registered successfully!')
            router.push('/')
        }


        const data = await res.json()
        alert(data.success ? `Welcome ${data.email}` : 'Face not matched')
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
            <h1>Face Login</h1>
            <video ref={videoRef} autoPlay muted width={300} />
            <br />
            <button onClick={() => stopCamera(videoRef)} className="px-4 py-2 bg-red-500 text-white rounded">Stop</button>
            <button onClick={loginFace} className="px-4 py-2 bg-blue-500 text-white rounded">Login</button>
        </div>
    )
}
