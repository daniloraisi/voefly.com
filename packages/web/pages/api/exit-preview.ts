import { NextApiRequest, NextApiResponse } from "next"
import { redirect } from "next/dist/server/api-utils"

export default async function exit(_req: NextApiRequest, res: NextApiResponse) {
  res.clearPreviewData()

  redirect(res, 307, "/")
}
