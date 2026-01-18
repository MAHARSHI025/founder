'use client'

import * as faceapi from 'face-api.js'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react'
import toast from 'react-hot-toast';

export default function FaceRegister() {
    
    const videoRef = useRef(null)
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated' || !session?.user?.email) {
            ('/');
        }
    }, []);

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


    const registerFace = async () => {
        const result = await faceapi
            .detectSingleFace(
                videoRef.current,
                new faceapi.TinyFaceDetectorOptions()
            )
            .withFaceLandmarks()
            .withFaceDescriptor()

        if (!result) return alert('No face detected')

        console.log(result);
        stopCamera(videoRef)


        const response = await fetch('/api/face', {
            method: 'POST',
            body: JSON.stringify({
                email: session.user.email,
                descriptor: Array.from(result.descriptor),
            }),
        })
        if (!response.status === 200) {
            return alert('Error registering face')
        } else {
            toast.success('Face registered successfully!')
            router.push('/')
        }
    }

    return (
        <div className=' flex justify-center items-center flex-col h-screen'>
            <h1>Face Register</h1>
            <video ref={videoRef} autoPlay muted width={300} height={300} className=' rounded-full' />
            <br />
            <button onClick={registerFace} className="px-4 py-2 bg-blue-500 text-white rounded">Register Face</button>
        </div>
    )
}
