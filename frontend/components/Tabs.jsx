"use client"
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import './Tabs.css'
import CreateModel from './create/CreateModel'

const Tabs = ({ sidebarLinks, iFier }) => {
    const pathname = usePathname()
    const [open, setOpen] = useState(false);

    const lastElement = sidebarLinks[sidebarLinks.length - 1];
    return (
        <aside className='le-tabs'>
            <nav className='le-tabs-nav'>
                {((iFier && iFier.identifier === "edu") ? sidebarLinks.slice(0, -1) : sidebarLinks).map(link => (
                    <Link
                        key={link.to}
                        href={link.to}
                        className={`le-tabs-link${pathname === link.to ? ' active' : ''}`}
                    >
                        <span className="le-tabs-icon">{link.icon}</span>
                        {link.label}
                    </Link>
                ))}
                {iFier && iFier.identifier === "edu" && (
                    <>
                        {/* <Link
                            key={lastElement.to}
                            href={lastElement.to}
                            className={`le-tabs-link le-tabs-link-last${pathname === lastElement.to ? ' active' : ''}`}
                        >
                            <span className="le-tabs-icon le-tabs-icon-last">{lastElement.icon}</span>

                        </Link> */}
                        <button
                            className={`le-tabs-link le-tabs-link-last${pathname === lastElement.to ? ' active' : ''}`}

                            onClick={() => setOpen((v) => !v)}
                            aria-label="Open create menu"
                        >
                            <span className="le-tabs-icon le-tabs-icon-last">{lastElement.icon}</span>

                        </button>
                        <CreateModel links={iFier.model} open={open} setOpen={setOpen} />
                    </>
                )}
            </nav>
        </aside>
    )
}

export default Tabs