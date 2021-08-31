import { NextApiRequest, NextApiResponse } from "next"
import { redirect } from "next/dist/server/api-utils"
import { getPageData } from "utils/api"
import { parseCookie } from "utils/parse-cookies"

const preview = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.secret !== (process.env.PREVIEW_SECRET || "secret-token")) {
    return res.status(401).json({ message: "Invalid token" })
  }

  const cookies = parseCookie(req)
  const slugArray = (<string>req.query.slug).split("/")
  const pageData = await getPageData(
    { slug: slugArray },
    cookies.NEXT_LOCALE,
    true
  )

  if (!pageData) {
    return res.status(401).json({ message: "Invalid slug" })
  } else {
    res.setPreviewData({})

    redirect(res, 307, `/${pageData.locale}/${pageData.slug}`)
  }
}

export default preview
