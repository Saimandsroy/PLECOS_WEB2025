"use client"
import React, { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon, ClockIcon } from '@radix-ui/react-icons'

const videos = [
    {
        title: 'The Solar System Explained',
        author: 'Dr. Smith',
        duration: '12 min',
        saved: true,
        placeholderBg: '#232b36'
    },
    {
        title: 'Fractions',
        author: 'Ava Lee',
        duration: '7 min',
        saved: true,
        placeholderBg: '#475569'
    },
    {
        title: 'Quick Science Facts',
        author: 'Samira Patel',
        duration: '5 min',
        saved: true,
        placeholderBg: '#374151'
    },
    // ...add more as needed
]

const pageSize = 3

const WatchLaterCarousel = () => {
    const [page, setPage] = useState(0)
    const totalPages = Math.ceil(videos.length / pageSize)

    const handlePrev = () => setPage(p => Math.max(0, p - 1))
    const handleNext = () => setPage(p => Math.min(totalPages - 1, p + 1))

    const visibleVideos = videos.slice(page * pageSize, page * pageSize + pageSize)

    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 12
            }}>
                <span style={{ fontWeight: 600, fontSize: 18 }}>Watch Later</span>
                <span style={{ color: '#64748b', fontSize: 15, cursor: 'pointer' }}>See all</span>
            </div>
            <div style={{
                display: 'flex',
                gap: 24,
                overflow: 'hidden',
                position: 'relative'
            }}>
                {visibleVideos.map((v, i) => (
                    <div key={i} style={{
                        minWidth: 260,
                        maxWidth: 280,
                        borderRadius: 16,
                        background: '#fff',
                        boxShadow: '0 2px 12px rgba(30,41,59,0.06)',
                        border: '1px solid #e5e7eb',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <div style={{
                            background: v.placeholderBg,
                            color: '#fff',
                            height: 90,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 600,
                            fontSize: 20
                        }}>
                            Video Placeholder
                        </div>
                        <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <div style={{ fontWeight: 600 }}>{v.title}</div>
                            <div style={{ color: '#64748b', fontSize: 14 }}>
                                By {v.author} • {v.duration}
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 6,
                                color: '#888',
                                fontSize: 14
                            }}>
                                <ClockIcon width={16} height={16} />
                                Saved for later
                            </div>
                        </div>
                    </div>
                ))}
                {/* Carousel Controls */}
                <div style={{
                    position: 'absolute',
                    left: '50%',
                    bottom: -28,
                    transform: 'translateX(-50%)',
                    background: '#fff',
                    borderRadius: 24,
                    boxShadow: '0 2px 8px rgba(30,41,59,0.10)',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '2px 18px',
                    gap: 10,
                    zIndex: 2
                }}>
                    <button
                        onClick={handlePrev}
                        disabled={page === 0}
                        style={{
                            background: 'none',
                            border: 'none',
                            borderRadius: '50%',
                            width: 32,
                            height: 32,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: page === 0 ? 'not-allowed' : 'pointer',
                            opacity: page === 0 ? 0.5 : 1
                        }}
                    >
                        <ChevronLeftIcon width={22} height={22} />
                    </button>
                    <span style={{ fontWeight: 500, fontSize: 16 }}>{page + 1} / {totalPages}</span>
                    <button
                        onClick={handleNext}
                        disabled={page === totalPages - 1}
                        style={{
                            background: 'none',
                            border: 'none',
                            borderRadius: '50%',
                            width: 32,
                            height: 32,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: page === totalPages - 1 ? 'not-allowed' : 'pointer',
                            opacity: page === totalPages - 1 ? 0.5 : 1
                        }}
                    >
                        <ChevronRightIcon width={22} height={22} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WatchLaterCarousel