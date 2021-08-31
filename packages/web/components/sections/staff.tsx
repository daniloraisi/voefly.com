import { Staff as Type } from "types"
import NextImage from "../elements/image"

type Props = {
  data: Type
}

const Staff = ({ data }: Props) => {
  return (
    <div className="bg-white">
      <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
        <div className="space-y-12">
          <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              {data.title}
            </h2>
          </div>
          <ul
            role="list"
            className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8"
          >
            {data.staff &&
              data.staff.map((staff) => (
                <li key={staff.name}>
                  <div className="space-y-4">
                    <div className="relative aspect-w-3 aspect-h-2 object-cover shadow-lg rounded-lg">
                      {staff.picture && (
                        <NextImage
                          className="h-full w-full rounded-lg"
                          layout="fill"
                          objectFit="cover"
                          media={staff.picture}
                        />
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="text-lg leading-6 font-medium space-y-1">
                        <h3>{staff.name}</h3>
                        <p className="text-indigo-600">{staff.role}</p>
                      </div>
                      <ul role="list" className="flex space-x-5">
                        <li>
                          <p className="text-gray-400 hover:text-gray-500">
                            {staff.VID && `VID: ${staff.VID}`}
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Staff
