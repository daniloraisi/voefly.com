import { Popover, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/outline"
import Cookies from "js-cookie"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { Fragment, useEffect, useRef, useState } from "react"
import { PageContext } from "types"
import { useOnClickOutside } from "utils/hooks"
import { getLocalizedPage, localizePath } from "utils/localize"
import WorldIcon from "./icons/world"

type Props = {
  initialLocale?: string
  pageContext: PageContext
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ")
}

const LocaleSwitch = ({ pageContext }: Props) => {
  const isMounted = useRef(false)
  const select = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [locale, setLocale] = useState<string>()
  const [showing, setShowing] = useState(false)

  const handleLocaleChange = async (selectedLocale?: string) => {
    // Persist the user's language preference
    // https://nextjs.org/docs/advanced-features/i18n-routing#leveraging-the-next_locale-cookie
    Cookies.set("NEXT_LOCALE", selectedLocale!)
    setLocale(selectedLocale)
  }

  const handleLocaleChangeRef = useRef(handleLocaleChange)
  useOnClickOutside(select, () => setShowing(false))

  useEffect(() => {
    const localeCookie = Cookies.get("NEXT_LOCALE")
    if (!localeCookie) {
      handleLocaleChangeRef.current(router.locale)
    }

    const checkLocaleMismatch = async () => {
      if (
        !isMounted.current &&
        localeCookie &&
        localeCookie !== pageContext.locale
      ) {
        // Redirect to locale page if locale mismatch
        const localePage = await getLocalizedPage(localeCookie, pageContext)

        router.push(
          `${localizePath({ ...pageContext, ...localePage })}`,
          `${localizePath({ ...pageContext, ...localePage })}`,
          { locale: localePage.locale }
        )
      }
      setShowing(false)
    }

    setLocale(localeCookie || router.locale)
    checkLocaleMismatch()

    return () => {
      isMounted.current = true
    }
  }, [locale, router, pageContext])

  return (
    <Popover.Group as="nav" className="space-x-10">
      <Popover className="relative">
        {({ open }: any) => (
          <>
            <Popover.Button
              className={classNames(
                open ? "text-gray-900" : "text-gray-500",
                "group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              )}
            >
              <WorldIcon />
              <span className="uppercase">{locale}</span>
              <ChevronDownIcon
                className={classNames(
                  open ? "text-gray-600" : "text-gray-400",
                  "ml-2 h-5 w-5 group-hover:text-gray-500"
                )}
                aria-hidden="true"
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform w-max max-w-sm lg:max-w-sm lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                  <div className="relative flex flex-col gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
                    {pageContext.localizedPaths &&
                      pageContext.localizedPaths.map(({ href, locale }) => {
                        return (
                          <Link
                            key={locale}
                            href={href}
                            locale={locale}
                            passHref
                          >
                            <div
                              className="-m-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                              onClick={() => handleLocaleChange(locale)}
                            >
                              <div className="ml-4">
                                <p className="uppercase text-base font-medium text-gray-900">
                                  {locale}
                                </p>
                              </div>
                            </div>
                          </Link>
                        )
                      })}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </Popover.Group>
  )
}

export default LocaleSwitch
