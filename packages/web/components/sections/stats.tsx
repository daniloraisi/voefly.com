import CountUp from "react-countup"
import InView from "react-intersection-observer"
import useSWR from "swr"
import { StatCard as CardType, Stats as Type } from "types"

type StatsType = { [key: string]: number } & {
  pilotsCount?: number
  totalFlights?: number
  totalHours?: number
  totalMiles?: number
  totalSchedules?: number
  flightsToday?: number
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

type CardProps = {
  card: CardType
  stats: StatsType
}

const StatCard = ({ card, stats }: CardProps) => {
  return (
    <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
      <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
        {card.title}
      </dt>
      <dd className="order-1 text-5xl font-extrabold text-indigo-600">
        <InView triggerOnce>
          {({ inView, ref }) => (
            <div ref={ref}>
              {inView ? (
                <CountUp
                  decimal=","
                  separator="."
                  duration={2}
                  end={stats[card.displayField!]}
                />
              ) : (
                <>0</>
              )}
            </div>
          )}
        </InView>
      </dd>
    </div>
  )
}

type Props = {
  data: Type
}

const Stats = ({ data }: Props) => {
  const { data: stats } = useSWR<StatsType>(data.apiUrl!, fetcher)
  return (
    <div className="bg-gray-100 pt-12 sm:pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl uppercase">
            {data.title}
          </h2>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">{data.subTitle}</p>
        </div>
      </div>
      <div className="mt-10 pb-12 bg-primary-900 sm:pb-16">
        <div className="relative">
          <div className="absolute inset-0 h-1/2 bg-gray-100" />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-full mx-auto">
              <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                {stats &&
                  data.stats?.map((card) => (
                    <StatCard key={card.id} card={card} stats={stats!} />
                  ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stats
