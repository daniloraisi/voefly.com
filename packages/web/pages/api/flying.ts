import { PrismaClient } from "@prisma/client"
import { DateTime } from "luxon"
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

const Flying = async (_: NextApiRequest, res: NextApiResponse) => {
  const flying = await prisma.acarsData.findMany({
    include: {
      aircraf: {
        select: {
          registration: true,
        },
      },
      pilot: {
        select: {
          code: true,
          pilotid: true,
          firstname: true,
          lastname: true,
        },
      },
      depAirport: {
        select: {
          name: true,
          lat: true,
          lng: true,
        },
      },
      arrAirport: {
        select: {
          name: true,
          lat: true,
          lng: true,
        },
      },
    },
    where: {
      lastupdate: {
        gte: DateTime.now().minus({ minutes: 120, hours: 3 }).toJSDate(),
      },
    },
  })
  res.status(200).json(flying)
}

export default Flying
