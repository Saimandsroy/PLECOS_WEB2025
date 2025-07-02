"use client"
import React, { useState } from 'react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon
} from '@radix-ui/react-icons'

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
  }
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
        <span style={{ fontWeight: 600, fontSize: 18, color: 'var(--text-primary)' }}>Watch Later</span>
        <span style={{ color: 'var(--text-secondary)', fontSize: 15, cursor: 'pointer' }}>See all</span>
      </div>

      <div style={{
        display: 'flex',
        gap: 24,
        overflow: 'hidden',
        position: 'relative'
      }}>
        {visibleVideos.map((v, i) => (
          <div key={i}
            className="glass-card"
            style={{
              minWidth: 260,
              maxWidth: 280,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              padding: 0
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
            <div style={{
              padding: 18,
              display: 'flex',
              flexDirection: 'column',
              gap: 8
            }}>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{v.title}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
                By {v.author} • {v.duration}
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: 'var(--text-secondary)',
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
          background: 'var(--background-glass)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: 24,
          border: '1px solid var(--border-color)',
          boxShadow: '0 2px 8px var(--shadow-color)',
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
              opacity: page === 0 ? 0.4 : 1,
              color: 'var(--text-primary)',
              transition: 'all 0.3s ease'
            }}
          >
            <ChevronLeftIcon width={22} height={22} />
          </button>

          <span style={{
            fontWeight: 500,
            fontSize: 16,
            color: 'var(--text-primary)'
          }}>{page + 1} / {totalPages}</span>

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
              opacity: page === totalPages - 1 ? 0.4 : 1,
              color: 'var(--text-primary)',
              transition: 'all 0.3s ease'
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
