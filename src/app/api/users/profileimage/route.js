import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get('file');
  const email = formData.get('email'); // Get email from FormData
  console.log('Email:', email); // Log the email for debugging
  

  if (!file) {
    return new Response(JSON.stringify({ error: 'No file provided' }), { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const mime = file.type;
  const base64 = buffer.toString('base64');
  const dataUrl = `data:${mime};base64,${base64}`;

  try {
    const result = await cloudinary.uploader.upload(dataUrl, {
      folder: 'founder-image', // Optional: change folder name
    });

    // Optionally, save the user's email and image URL in your database here

    return new Response(JSON.stringify({ url: result.secure_url, email }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Cloudinary upload error:', err);
    return new Response(JSON.stringify({ error: 'Upload failed' }), { status: 500 });
  }
}
