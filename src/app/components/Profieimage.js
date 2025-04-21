'use client';

import { useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';

export default function Profileimage() {
    const { data: session } = useSession();
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadedUrl, setUploadedUrl] = useState(null);

    const handleFileSelect = (selectedFile) => {
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
    };

    const handleFileChange = (e) => {
        const selected = e.target.files?.[0];
        if (selected) handleFileSelect(selected);
    };

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files?.[0];
        if (droppedFile) handleFileSelect(droppedFile);
    }, []);

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('email', session?.user?.email || 'noemail');

        const res = await fetch('/api/users/profileimage', {
            method: 'POST',
            body: formData,
        });

        const data = await res.json();
        setUploadedUrl(data.url);
        setUploading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4">
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="w-full max-w-md p-6 border-2 border-dashed border-black-500 rounded-lg hover:border-green-700 transition-colors bg-gray-50 cursor-pointer"
                onClick={() => document.getElementById('hiddenInput').click()}
            >
                <p className="text-gray-700 mb-2">
                    Drag and drop your image here or click to select
                </p>
                <input
                    id="hiddenInput"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
                {preview && (
                    <img
                        src={preview}
                        alt="Preview"
                        className="mt-4 mx-auto w-52 h-auto rounded-lg shadow"
                    />
                )}
            </div>

            <button
                onClick={handleUpload}
                disabled={uploading}
                className={`mt-6 px-6 py-2 rounded-lg shadow ${
                    uploading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                } transition`}
            >
                {uploading ? 'Uploading...' : 'Upload'}
            </button>

            {/* Uploaded Image Preview */}
            {uploadedUrl && (
                <div className="mt-6">
                    <p className="text-sm font-semibold mb-1">Uploaded Image:</p>
                    <img src={uploadedUrl} alt="Uploaded" className="mx-auto w-52 rounded-md" />
                    <a
                        href={uploadedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline block mt-1"
                    >
                        {uploadedUrl}
                    </a>
                </div>
            )}
        </div>
    );
}
