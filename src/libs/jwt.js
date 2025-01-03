import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'

export function createAccessToken(payload) {

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      TOKEN_SECRET, 
      {
        expiresIn: "1d",
        algorithm: "HS256"
      },
      (err, token) => {
        if (err) {
          res.status(500).json({
            message: "Something went wrong"
          })
          reject(err)
        }

        resolve(token)
      }
    )
  })

}