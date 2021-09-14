import { SummonerFullData } from '../../state/summoners/hooks'
import { useLingui } from '@lingui/react'
import React, { Fragment, useState } from 'react'
import { t } from '@lingui/macro'
import { CLASSES_IMAGES, CLASSES_NAMES } from '../../constants/classes'
import Loader from '../../components/Loader'
import { BigNumber } from 'ethers'
import StatsProfile from '../../components/ProfileCard/Stats'
import { Menu, Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import HeadlessUIModal from '../../components/Modal/HeadlessUIModal'
import ModalHeader from '../../components/Modal/ModalHeader'
import { isAddress } from '../../functions/validate'

enum View {
    stats,
    skills,
    inventory,
    crafting,
}

const mockSummonersData: { [k: string]: SummonerFullData } = {
    '123': {
        id: '123',
        ability_scores: {
            attributes: {
                _cha: 8,
                _con: 8,
                _dex: 8,
                _int: 8,
                _str: 8,
                _wis: 8,
            },
            created: true,
            modifiers: {
                _cha: 8,
                _con: 8,
                _dex: 8,
                _int: 8,
                _str: 8,
                _wis: 8,
            },
            spent_points: BigNumber.from(32),
            total_points: BigNumber.from(48),
        },
        base: {
            _class: BigNumber.from(1),
            _level: BigNumber.from(2),
            _log: BigNumber.from(12345677),
            _name: 'Legolas',
            _xp: BigNumber.from(1000),
        },
        gold: {
            balance: BigNumber.from('10000000000000000000'),
            claimable: BigNumber.from('10000000000000000000'),
            claimed: BigNumber.from('10000000000000000000'),
        },
        materials: {
            balance: BigNumber.from('10000000000000000000'),
            scout: BigNumber.from(0),
        },
        skills: {
            class_skills: [
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                false,
            ],
            skills: [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 1,
            ],
            spent_points: BigNumber.from('100'),
            total_points: BigNumber.from('120'),
        },
    },
    '124': {
        id: '124',
        ability_scores: {
            attributes: {
                _cha: 8,
                _con: 8,
                _dex: 8,
                _int: 8,
                _str: 8,
                _wis: 8,
            },
            created: true,
            modifiers: {
                _cha: 8,
                _con: 8,
                _dex: 8,
                _int: 8,
                _str: 8,
                _wis: 8,
            },
            spent_points: BigNumber.from(32),
            total_points: BigNumber.from(48),
        },
        base: {
            _class: BigNumber.from(1),
            _level: BigNumber.from(2),
            _log: BigNumber.from(12345677),
            _name: '',
            _xp: BigNumber.from(1000),
        },
        gold: {
            balance: BigNumber.from('10000000000000000000'),
            claimable: BigNumber.from('10000000000000000000'),
            claimed: BigNumber.from('10000000000000000000'),
        },
        materials: {
            balance: BigNumber.from('10000000000000000000'),
            scout: BigNumber.from(0),
        },
        skills: {
            class_skills: [
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                false,
            ],
            skills: [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 1,
            ],
            spent_points: BigNumber.from('100'),
            total_points: BigNumber.from('120'),
        },
    },
    '125': {
        id: '125',
        ability_scores: {
            attributes: {
                _cha: 8,
                _con: 8,
                _dex: 8,
                _int: 8,
                _str: 8,
                _wis: 8,
            },
            created: true,
            modifiers: {
                _cha: 8,
                _con: 8,
                _dex: 8,
                _int: 8,
                _str: 8,
                _wis: 8,
            },
            spent_points: BigNumber.from(32),
            total_points: BigNumber.from(48),
        },
        base: {
            _class: BigNumber.from(1),
            _level: BigNumber.from(2),
            _log: BigNumber.from(12345677),
            _name: '123123123 Level 123 SORCERER',
            _xp: BigNumber.from(1000),
        },
        gold: {
            balance: BigNumber.from('10000000000000000000'),
            claimable: BigNumber.from('10000000000000000000'),
            claimed: BigNumber.from('10000000000000000000'),
        },
        materials: {
            balance: BigNumber.from('10000000000000000000'),
            scout: BigNumber.from(0),
        },
        skills: {
            class_skills: [
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                false,
            ],
            skills: [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 1,
            ],
            spent_points: BigNumber.from('100'),
            total_points: BigNumber.from('120'),
        },
    },
}

export default function Profile(): JSX.Element {
    const { i18n } = useLingui()

    const [modals, setModal] = useState<{ delete: boolean; transfer: boolean }>({ delete: false, transfer: false })

    const [selectedSummoner, setSelectedSummoner] = useState<SummonerFullData | undefined>(mockSummonersData['123'])

    const [view, setView] = useState<View>(View.stats)

    function deleteModal() {
        setModal({ delete: !modals.delete, transfer: false })
    }

    function transferModal() {
        setModal({ delete: false, transfer: !modals.transfer })
    }

    const [transferAddress, setTransferAddress] = useState<{ input: boolean; address: string | boolean }>({
        input: false,
        address: false,
    })

    function transferAddressHandler(address: string) {
        console.log(address)
        console.log(address === '' || !address)
        if (address === '' || !address) {
            setTransferAddress({ input: false, address: false })
        } else {
            setTransferAddress({ input: true, address: isAddress(address) })
        }
    }

    return (
        <div className="w-full z-10">
            <HeadlessUIModal isOpen={modals.delete} onDismiss={() => setModal({ delete: false, transfer: false })}>
                <div className="bg-background-end rounded-lg border-2 border-white">
                    <ModalHeader
                        title={i18n._(t`delete summoner`)}
                        onClose={() => setModal({ delete: false, transfer: false })}
                    />
                    <div className="text-center text-white p-4 pb-8 gap-5">
                        <h2>{i18n._(t`Are you sure you want to delete this summoner?`)}</h2>
                        <h2>
                            <b>{i18n._(t`This action is IRREVERSIBLE.`)}</b>
                        </h2>
                        <h2>
                            <b>{i18n._(t`All items and experience will be lost.`)}</b>
                        </h2>
                    </div>
                    <div className="flex flex-row justify-center pb-8">
                        <div className="bg-background-middle hover:bg-background-start text-white border-white border-2 rounded-lg mx-4">
                            <button
                                className="w-full uppercase px-2 py-1"
                                onClick={() => setModal({ delete: false, transfer: false })}
                            >
                                <h2>{i18n._(t`cancel`)}</h2>
                            </button>
                        </div>
                        <div className="bg-red hover:bg-red-hovered text-white border-white border-2 rounded-lg mx-4">
                            <button className="w-full uppercase px-2 py-1">
                                <h2>{i18n._(t`confirm`)}</h2>
                            </button>
                        </div>
                    </div>
                </div>
            </HeadlessUIModal>
            <HeadlessUIModal isOpen={modals.transfer} onDismiss={() => setModal({ delete: false, transfer: false })}>
                <div className="bg-background-end rounded-lg border-2 border-white">
                    <ModalHeader
                        title={i18n._(t`transfer summoner`)}
                        onClose={() => setModal({ delete: false, transfer: false })}
                    />
                    <div className="text-center text-white p-4 pb-4 gap-5">
                        <h2>{i18n._(t`Write the address to transfer the summoner`)}</h2>
                    </div>
                    <div className="text-center text-white p-4 pb-8 gap-5">
                        <input
                            className="p-2 text-background-end"
                            onChange={(v) => transferAddressHandler(v.target.value)}
                        />
                    </div>
                    <div className="flex flex-row justify-center pb-8">
                        <div className=" text-white  mx-4">
                            {transferAddress.address ? (
                                <button className="bg-red hover:bg-red-hovered border-white border-2 rounded-lg uppercase px-2 py-1">
                                    <h2>{i18n._(t`confirm`)}</h2>
                                </button>
                            ) : (
                                <>
                                    {transferAddress.input && (
                                        <div className="opacity-80 bg-red-hovered text-white w-full mb-4 text-center rounded-lg text-xs">
                                            <h2 className="p-2 uppercase">{i18n._(t`invalid address`)}</h2>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </HeadlessUIModal>
            <div className="border-white border-4 p-4 m-10 z-10">
                <Popover as="nav" className="w-full bg-transparent header-border-b">
                    {({ open }) => (
                        <>
                            <div className="py-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center z-20 uppercase">
                                        <h1 className="text-3xl">{i18n._(t`profile`)}</h1>
                                        <div className="hidden md:block sm:ml-2 text-xs">
                                            <div className="flex uppercase">
                                                <button className="hover:border-white border-transparent border-2 rounded-xl py-1 px-2 mx-1 uppercase">
                                                    <span>{i18n._(t`stats`)}</span>
                                                </button>
                                                <button className="hover:border-white border-transparent border-2 rounded-xl py-1 px-2 mx-1 uppercase">
                                                    <span>{i18n._(t`skills`)}</span>
                                                </button>
                                                <button className="hover:border-white border-transparent border-2 rounded-xl py-1 px-2 mx-1 uppercase">
                                                    <span>{i18n._(t`inventory`)}</span>
                                                </button>
                                                <button className="hover:border-white border-transparent border-2 rounded-xl py-1 px-2 mx-1 uppercase">
                                                    <span>{i18n._(t`craft`)}</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex -mr-2 md:hidden">
                                        <Popover.Button className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-high-emphesis focus:outline-none">
                                            <span className="sr-only">{i18n._(t`Open Menu`)}</span>
                                            {open ? (
                                                <svg
                                                    className="block w-6 h-6"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            ) : (
                                                <svg
                                                    className="block w-6 h-6"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M4 6h16M4 12h16M4 18h16"
                                                    />
                                                </svg>
                                            )}
                                        </Popover.Button>
                                    </div>
                                </div>
                            </div>

                            <Popover.Panel className="sm:hidden">
                                <div className="flex flex-col px-4 pt-2 pb-3 space-y-1 text-center text-sm">
                                    <button className="hover:border-white border-transparent border-2 rounded-xl py-1 px-2 mx-1 uppercase">
                                        <span>{i18n._(t`stats`)}</span>
                                    </button>
                                    <button className="hover:border-white border-transparent border-2 rounded-xl py-1 px-2 mx-1 uppercase">
                                        <span>{i18n._(t`skills`)}</span>
                                    </button>
                                    <button className="hover:border-white border-transparent border-2 rounded-xl py-1 px-2 mx-1 uppercase">
                                        <span>{i18n._(t`inventory`)}</span>
                                    </button>
                                    <button className="hover:border-white border-transparent border-2 rounded-xl py-1 px-2 mx-1 uppercase">
                                        <span>{i18n._(t`craft`)}</span>
                                    </button>
                                </div>
                            </Popover.Panel>
                        </>
                    )}
                </Popover>
                {Object.keys(mockSummonersData).length > 0 ? (
                    <Menu as="div" className="relative text-right ml-3 mt-2 md:-mt-6 z-0">
                        {({ open }) => (
                            <>
                                <div>
                                    <Menu.Button className="flex flex-row justify-end item-center w-full p-2 text-xs font-bold border-b-2 text-white border-white">
                                        <div className="h-full mr-1.5">
                                            <span className="uppercase">{i18n._(t`select summoner`)}</span>
                                        </div>
                                        <div>
                                            <ChevronDownIcon width={16} aria-hidden="true" />
                                        </div>
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
                                    <Menu.Items className="absolute right-0 rounded-b-lg border-b-2 border-r-2 border-l-2 pb-0.5 border-white shadow-lg bg-background-end">
                                        <div>
                                            {Object.keys(mockSummonersData).map((k: string) => {
                                                const data = mockSummonersData[k]
                                                return (
                                                    <Menu.Item key={k}>
                                                        {() => (
                                                            <button
                                                                onClick={() => setSelectedSummoner(data)}
                                                                className={
                                                                    'group w-full hover:bg-background-start flex items-center border-white p-2 text-xs font-bold'
                                                                }
                                                            >
                                                                <span className="ml-2 uppercase overflow-x-hidden">
                                                                    {' '}
                                                                    {data.base._name !== ''
                                                                        ? data.base._name
                                                                        : parseInt(k, 16) +
                                                                          ' ' +
                                                                          i18n._(t`level`) +
                                                                          ' ' +
                                                                          data.base._level +
                                                                          ' ' +
                                                                          i18n._(
                                                                              CLASSES_NAMES[data.base._class.toString()]
                                                                          )}
                                                                </span>
                                                            </button>
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
                ) : (
                    <Loader className="animate-spin" />
                )}

                {!selectedSummoner ? (
                    <div className="relative h-96">
                        <div className="absolute top-1/2 right-1/2">
                            <Loader className="animate-spin" size="40px" />
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 justify-between items-center p-2 lg:p-20 gap-5">
                        <div className="text-center mx-auto">
                            <img
                                src={CLASSES_IMAGES[selectedSummoner.base._class.toString()]}
                                alt={''}
                                className="h-48 mx-auto"
                            />
                            <div className="flex flex-row items-center text-center justify-center uppercase text-3xl ">
                                [{' '}
                                <div className="w-60 overflow-x-hidden overflow-ellipsis">
                                    <span className="text-xl mx-2 overflow-hidden whitespace-nowrap">
                                        {selectedSummoner.base._name !== ''
                                            ? selectedSummoner.base._name
                                            : i18n._(t`unknown`)}
                                    </span>
                                </div>{' '}
                                ]
                            </div>
                            <div className="mt-4 w-48 mx-auto border-2 border-white rounded-3xl p-2">
                                <span className="p-2 uppercase">
                                    {i18n._(CLASSES_NAMES[selectedSummoner.base._class.toString()])}
                                </span>{' '}
                            </div>
                        </div>
                        <div className="col-span-2">
                            {view === View.stats && (
                                <StatsProfile
                                    summoner={selectedSummoner}
                                    deleteModal={deleteModal}
                                    transferModal={transferModal}
                                />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
