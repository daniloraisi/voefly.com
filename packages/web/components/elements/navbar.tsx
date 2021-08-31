import { Popover } from "@headlessui/react"
import { MenuIcon } from "@heroicons/react/outline"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { Navbar as Type } from "types"
import { getButtonAppearance } from "utils/button"
import LocaleSwitch from "../locale-switch"
import ButtonLink from "./button-link"
import CustomLink from "./custom-link"
import NextImage from "./image"
import MobileNavMenu from "./mobile-nav-menu"

type Props = {
  navbar: Type
  initialLocale?: string
  pageContext: any
}

const Navbar = ({ navbar, pageContext }: Props) => {
  const router = useRouter()

  return (
    <header>
      <Popover className="relative bg-white">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:justify-start lg:space-x-10 md:px-8">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/">
              <a className="h-8 w-32">
                <span className="sr-only">{navbar.logo.alternativeText}</span>
                <NextImage media={navbar.logo} />
              </a>
            </Link>
          </div>
          <div className="-mr-2 -my-2 lg:hidden flex">
            {/* Locale Switch Mobile */}
            {pageContext.localizedPaths && (
              <div className="mr-5 mt-2">
                <LocaleSwitch pageContext={pageContext} />
              </div>
            )}
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <nav className="hidden lg:flex space-x-6">
            {navbar.links.map((navLink) => (
              <CustomLink
                key={navLink.id}
                link={navLink}
                locale={router.locale}
              >
                <div className="text-base font-medium text-gray-500 hover:text-gray-900">
                  {navLink.text}
                </div>
              </CustomLink>
            ))}
          </nav>
          <div className="hidden lg:flex items-center justify-end lg:flex-1 lg:w-0">
            {/* Locale Switch Desktop */}
            {pageContext.localizedPaths && (
              <div className="md:block z-auto mr-5">
                <LocaleSwitch pageContext={pageContext} />
              </div>
            )}
            {/* CTA button on desktop */}
            {navbar.button && (
              <div className="hidden md:block">
                <ButtonLink
                  button={navbar.button}
                  appearance={getButtonAppearance(navbar.button.type, "light")}
                  compact
                />
              </div>
            )}
          </div>
        </div>

        <MobileNavMenu navbar={navbar} />
      </Popover>
    </header>
  )
}

export default Navbar
