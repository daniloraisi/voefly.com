import classNames from "classnames"
import { Footer as Type } from "types"
import CustomLink from "./custom-link"
import NextImage from "./image"

type Props = {
  footer: Type
}

const Footer = ({ footer }: Props) => {
  return (
    <footer className="bg-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="relative space-y-8 xl:col-span-1">
            <NextImage
              className="h-10"
              width={120}
              height={60}
              media={footer.logo!}
              alt="Company name"
            />
            {/* <p className="text-gray-500 text-base">
              Making the world a better place through constructing elegant
              hierarchies.
            </p> */}
            {/* <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div> */}
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {footer.columns.map((column, index) => (
                <div key={column.id}>
                  <div
                    className={classNames({
                      "mt-12 md:mt-0": index % 2 !== 0,
                    })}
                  >
                    <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                      {column.title}
                    </h3>
                    <ul role="list" className="mt-4 space-y-4">
                      {column.links.map((link) => (
                        <li
                          key={link.id}
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          <CustomLink link={link}>{link.text}</CustomLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            {footer.smallText}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
