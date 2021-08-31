import CustomLink from "@/components/elements/custom-link"
import NextImage from "@/components/elements/image"
import { Popover, Transition } from "@headlessui/react"
import { XIcon } from "@heroicons/react/outline"
import React, { Fragment } from "react"
import { Navbar } from "types"
import { getButtonAppearance } from "utils/button"
import ButtonLink from "./button-link"

type Props = {
  navbar: Navbar
}

const MobileNavMenu = ({ navbar }: Props) => {
  return (
    <Transition
      as={Fragment}
      enter="duration-200 ease-out"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="duration-100 ease-in"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <Popover.Panel
        focus
        className="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right lg:hidden"
      >
        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
          <div className="pt-5 pb-6 px-5">
            <div className="flex items-center justify-between">
              <div>
                <NextImage
                  width="120"
                  height="33"
                  className="h-8 w-auto"
                  media={navbar.logo}
                />
              </div>
              <div className="-mr-2">
                <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
          </div>
          <div className="py-6 px-5">
            <div className="grid grid-cols-2 gap-4">
              {navbar.links.map((navLink) => (
                <CustomLink key={navLink.id} link={navLink}>
                  <div className="text-base font-medium text-gray-900 hover:text-gray-700">
                    {navLink.text}
                  </div>
                </CustomLink>
              ))}
            </div>
            <div className="mt-6">
              {navbar.button && (
                <ButtonLink
                  button={navbar.button}
                  appearance={getButtonAppearance(navbar.button?.type, "light")}
                />
              )}
            </div>
          </div>
        </div>
      </Popover.Panel>
    </Transition>
  )
}

export default MobileNavMenu
