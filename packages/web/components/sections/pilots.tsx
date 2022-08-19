import classNames from "classnames"
import Image from "next/image"
import useSWR from "swr"

type Pilot = {
  pilotid: number
  code: string
  firstname: string
  lastname: string
  totalflights: number
  totalhours: number
  hub: string
  retired: number
  rank?: {
    rankimage: string
  }
  fieldValues: {
    value: string
    customfields: {
      title: string
    }
  }[]
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const statusIcon = (status: number): JSX.Element | string => {
  switch (status) {
    case 0:
      return (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          Ativo
        </>
      )
    case 1:
      return (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          Inativo
        </>
      )
    default:
      return (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          Licença
        </>
      )
  }
}

const Pilots = () => {
  const { data: pilots } = useSWR<Pilot[]>("/api/pilots", fetcher)

  return (
    <div className="container flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Piloto
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Voos
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    VID/CID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pilots &&
                  pilots.map((pilot) => (
                    <tr key={pilot.pilotid}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="relative flex-shrink-0 h-14 w-28">
                            {pilot.rank?.rankimage && (
                              <Image
                                loader={({ src }) => src}
                                className="h-10 w-28 rounded-md"
                                src={pilot.rank.rankimage}
                                layout="fill"
                                objectFit="cover"
                                alt=""
                              />
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {pilot.firstname}
                            </div>
                            <div className="text-sm text-gray-500">
                              {pilot.code}
                              {String(pilot.pilotid).padStart(4, "0")}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {pilot.totalflights} voo(s)
                        </div>
                        <div className="text-sm text-gray-500">
                          c/ {pilot.totalhours} horas
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {pilot.fieldValues.map(
                          (field) =>
                            field.value && (
                              <div key={field.value}>
                                <b>{field.customfields.title}:</b> {field.value}
                              </div>
                            )
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span
                          className={classNames(
                            "px-5 py-2 inline-flex text-xs leading-5 font-semibold rounded-full w-24",
                            {
                              "bg-green-100 text-green-800":
                                pilot.retired === 0,
                              "bg-red-100 text-red-800": pilot.retired === 1,
                              "bg-blue-100 text-blue-800": pilot.retired === 3,
                            }
                          )}
                        >
                          {statusIcon(pilot.retired)}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pilots
