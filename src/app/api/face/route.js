import { NextResponse } from 'next/server'
import { connect } from "@/dbconfig/dbconfig";
import Face from '@/models/facemodel'

export async function POST(req) {
  const { email, descriptor } = await req.json()

  if (!email || !descriptor) {
    return NextResponse.json(
      { message: 'Email and descriptor are required.' },
      { status: 400 }
    )
  }

  await connect();

  await Face.create({ email, descriptor })

  return NextResponse.json({ success: true })
}


