import { Menu, Transition } from '@headlessui/react'

import { ChevronDownIcon } from '@heroicons/react/solid'
import React, { Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import cookieCutter from 'cookie-cutter'
import { classNames } from '../../functions/classNames'

const LANG_TO_COUNTRY = {
    en: 'English',
}

export default function LangSwitcher() {
    const { locale, locales, asPath } = useRouter()

    return (
        <Menu as="div" className="relative inline-block text-right">
            {({ open }) => (
                <>
                    <div>
                        <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-bold bg-transparent border rounded shadow-sm text-primary border-dark-800 hover:bg-dark-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-700 focus:ring-dark-800">
                            <h2>{LANG_TO_COUNTRY[locale]}</h2>
                            <ChevronDownIcon className="w-5 h-5 ml-2 -mr-1" aria-hidden="true" />
                        </Menu.Button>
                    </div>

                    <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 w-[max-content] mt-2 origin-top-right divide-y divide-dark-600 rounded shadow-lg bg-dark-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="p-2">
                                {locales.map((locale) => {
                                    return (
                                        <Menu.Item key={locale}>
                                            {({ active }) => (
                                                <Link href={asPath} locale={locale}>
                                                    <a
                                                        href="#"
                                                        className={classNames(
                                                            active
                                                                ? 'bg-background-start text-high-emphesis'
                                                                : 'text-primary',
                                                            'group flex items-center p-2 text-sm hover:bg-dark-700 focus:bg-dark-700 rounded font-bold'
                                                        )}
                                                        onClick={() => cookieCutter.set('NEXT_LOCALE', locale)}
                                                    >
                                                        <h2 className="ml-2">{LANG_TO_COUNTRY[locale]}</h2>
                                                    </a>
                                                </Link>
                                            )}
                                        </Menu.Item>
                                    )
                                })}
                            </div>
                        </Menu.Items>
                    </Transition>
                </>
            )}
        </Menu>
    )
}
