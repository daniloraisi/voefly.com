import { PrismaClient } from "@prisma/client"
import { DateTime } from "luxon"
import type { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

const Stats = async (_: NextApiRequest, res: NextApiResponse) => {
  const [
    pilotsCount,
    totalFlights,
    totalHours,
    totalMiles,
    totalSchedules,
    flightsToday,
  ] = await prisma.$transaction([
    prisma.pilot.count(),
    prisma.pirep.count({
      where: {
        accepted: {
          equals: 1,
        },
      },
    }),
    prisma.$queryRaw(
      "SELECT SUM(TIME_TO_SEC(flighttime_stamp)) AS total FROM pireps WHERE accepted = 1"
    ),
    prisma.pirep.aggregate({
      _sum: {
        distance: true,
      },
      where: {
        accepted: {
          equals: 1,
        },
      },
    }),
    prisma.schedule.count({
      where: {
        code: {
          equals: "FLB",
        },
      },
    }),
    prisma.pirep.count({
      where: {
        submitdate: {
          gte: DateTime.now().startOf("day").toJSDate(),
          lte: DateTime.now().endOf("day").toJSDate(),
        },
      },
    }),
  ])

  res.status(200).json({
    pilotsCount,
    totalFlights,
    totalHours: Math.round(totalHours[0].total / 3600),
    totalMiles: totalMiles._sum.distance,
    totalSchedules,
    flightsToday,
  })
}

export default Stats
