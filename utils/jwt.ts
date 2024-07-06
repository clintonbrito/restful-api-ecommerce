import jwt from 'jsonwebtoken'

export default class JWT {
  private static secret: jwt.Secret = process.env.APP_KEY || 'topsecret'

  private static jwtConfig: jwt.SignOptions = {
    expiresIn: '1h',
    algorithm: 'HS256',
  }

  static sign(payload: jwt.JwtPayload): string {
    return jwt.sign(payload, this.secret, this.jwtConfig)
  }

  static verify(token: string): jwt.JwtPayload | string {
    return jwt.verify(token, this.secret) as jwt.JwtPayload | string
  }
}
