import { NextResponse } from 'next/server'
import { connect } from '@/dbconfig/dbconfig'
import Face from '../../../../models/facemodel'

function distance(a, b) {
    return Math.sqrt(
        a.reduce((sum, v, i) => sum + (v - b[i]) ** 2, 0)
    )
}

export async function POST(req) {
    const { descriptor } = await req.json()

    if (!descriptor) {
        return NextResponse.json(
            { message: 'Descriptor is required.' },
            { status: 400 }
        )
    }

    await connect();

    const faces = await Face.find()

    for (const face of faces) {
        if (distance(face.descriptor, descriptor) < 0.6) {
            return NextResponse.json({
                success: true,
                email: face?.email,
            })
        } else {
            return NextResponse.json({
                success: true,
                email: 'Another man is detected',
            })
        }
    }

    return NextResponse.json({ success: false })
}
