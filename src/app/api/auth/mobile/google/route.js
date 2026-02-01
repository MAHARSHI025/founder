import User from '@/models/usermodel'
import { OAuth2Client } from 'google-auth-library'
import jwt from 'jsonwebtoken'

const client = new OAuth2Client(process.env.GOOGLE_WEB_CLIENT_ID)

export const googleLogin = async (req, res) => {
  const { idToken } = req.body

  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_WEB_CLIENT_ID,
  })

  const payload = ticket.getPayload()

  const { email, name, picture, sub } = payload

  let user = await User.findOne({ email })

  if (!user) {
    user = await User.create({
      email,
      name,
      avatar: picture,
      googleId: sub,
    })
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )

  res.json({ user, token })
}
