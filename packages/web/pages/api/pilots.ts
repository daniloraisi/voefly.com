import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

const Pilots = async (_: NextApiRequest, res: NextApiResponse) => {
  const pilots = await prisma.pilot.findMany({
    select: {
      pilotid: true,
      code: true,
      firstname: true,
      lastname: true,
      totalflights: true,
      totalhours: true,
      hub: true,
      retired: true,
      rank: {
        select: {
          rankimage: true,
        },
      },
      fieldValues: {
        select: {
          value: true,
          customfields: {
            select: {
              title: true,
            },
          },
        },
      },
    },
  })

  return res.status(200).json(pilots)
}

export default Pilots
