"use client"
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import './Tabs.css'

const Tabs = ({ sidebarLinks }) => {
    const pathname = usePathname()
    console.log('Current Pathname:', pathname)

    return (
        <aside className='le-tabs'>
            <nav className='le-tabs-nav'>
                {sidebarLinks.map(link => (
                    <Link
                        key={link.to}
                        href={link.to}
                        className={`le-tabs-link${pathname === link.to ? ' active' : ''}`}
                    >
                        <span className="le-tabs-icon">{link.icon}</span>
                        {link.label}
                    </Link>
                ))}
            </nav>
        </aside>
    )
}

export default Tabs