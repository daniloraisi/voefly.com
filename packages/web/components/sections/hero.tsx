import ButtonLink from "@/components/elements/button-link"
import React from "react"
import { Hero as Type } from "types"
import { getButtonAppearance } from "utils/button"
import NextImage from "../elements/image"

type Props = {
  data: Type
}

const Hero = ({ data }: Props) => {
  return (
    <main>
      <div>
        {/* Hero card */}
        <div className="relative">
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
          <div className="max-w-full mx-auto sm:px-6 lg:px-8">
            <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
              <div className="absolute inset-0">
                {data.picture && (
                  <NextImage
                    className="h-full w-full"
                    media={data.picture}
                    objectFit="cover"
                    layout="fill"
                  />
                )}
                <div className="absolute inset-0 bg-primary-700 mix-blend-multiply" />
              </div>
              <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                  <span className="block text-white">{data.label}</span>
                  <span className="block text-secondary-200">{data.title}</span>
                </h1>
                <p className="mt-6 max-w-lg mx-auto text-center text-xl text-white sm:max-w-3xl">
                  {data.description}
                </p>
                <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                  <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                    {data.buttons?.map((button: any) => (
                      <div key={button.id} className="sm:px-8">
                        <ButtonLink
                          button={button}
                          appearance={getButtonAppearance(button.type, "dark")}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logo cloud */}
        <div className="bg-gray-100">
          <div className="container flex flex-col justify-center mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm font-semibold uppercase text-gray-500 tracking-wide">
              {data.smallTextWithLink}
            </p>
            <div className="mt-6 grid grid-cols-6 gap-8">
              <div className="col-span-1"></div>
              {data.logos?.map((logo) => (
                <div
                  key={logo.id}
                  className="col-span-2 md:col-span-2 flex justify-center"
                >
                  {logo.logo && (
                    <NextImage height={55} width={155} media={logo.logo} />
                  )}
                </div>
              ))}
              <div className="col-span-2"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Hero
