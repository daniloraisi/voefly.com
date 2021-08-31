import cookie from "cookie"
import { NextApiRequest } from "next"

export function parseCookie(req: NextApiRequest) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie)
}
