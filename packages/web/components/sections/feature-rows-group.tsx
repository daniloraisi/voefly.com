import classNames from "classnames"
import Markdown from "react-markdown"
import { FeatureRowsGroup as Type } from "types"
import CustomLink from "../elements/custom-link"
import NextImage from "../elements/image"

type Props = {
  data: Type
}

const FeatureRowsGroup = ({ data }: Props) => {
  return (
    <div className="relative bg-gray-100 pt-16 pb-32 overflow-hidden">
      <div className="relative">
        {data.features?.map((feature, index) => (
          <div
            key={feature.id}
            className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24"
          >
            <div
              className={classNames(
                "px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0",
                {
                  "lg:col-start-2": index % 2 !== 0,
                }
              )}
            >
              <div>
                <div className="mt-6">
                  <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                    {feature.title}
                  </h2>
                  <Markdown className="mt-4 text-lg text-gray-500">
                    {feature.description!}
                  </Markdown>
                  <div className="mt-6">
                    <CustomLink link={feature.link!}>
                      <div className="text-primary-600 with-arrow hover:underline">
                        {feature.link?.text}
                      </div>
                    </CustomLink>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={classNames("mt-12 sm:mt-16 lg:mt-0", {
                "lg:col-start-1": index % 2 !== 0,
              })}
            >
              <div className="-ml-4 md:ml-0 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                {feature.media && (
                  <NextImage
                    media={feature.media}
                    className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:left-0"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeatureRowsGroup
