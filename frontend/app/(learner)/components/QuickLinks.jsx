import React from 'react'
import Link from 'next/link'
import { BookmarkFilledIcon, VideoIcon, StarIcon, ArchiveIcon } from '@radix-ui/react-icons'
import './QuickLinks.css'

const quickLinks = [
    {
        label: 'Courses',
        icon: <BookmarkFilledIcon width={28} height={28} />,
        href: '/courses',
        desc: 'Continue your structured learning',
    },
    {
        label: 'Shorts',
        icon: <VideoIcon width={28} height={28} />,
        href: '/shorts',
        desc: 'Watch quick learning videos',
    },
    {
        label: 'Explore',
        icon: <StarIcon width={28} height={28} />,
        href: '/explore',
        desc: 'Find trending courses, shorts, and teachers',
    },
    {
        label: 'My Section ',
        icon: <ArchiveIcon width={28} height={28} />,
        href: '/my-section',
        desc: 'Access your saved, playlists, and certificates',
    },
]

const QuickLinks = () => (
    <div className="quick-links-grid">
        {quickLinks.map((link) => (
            <Link key={link.label} href={link.href} style={{ textDecoration: 'none' }}>
                <div className="quick-link-card">
                    <span>{link.icon}</span>
                    <span>{link.label}</span>
                    <span className="quick-link-card-desc">{link.desc}</span>
                </div>
            </Link>
        ))}
    </div>
)

export default QuickLinks