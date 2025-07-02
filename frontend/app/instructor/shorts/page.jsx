"use client"
import React, { useState } from 'react'
import { UploadIcon } from '@radix-ui/react-icons'
import ShortsGrid from './ShortsGrid'
import ShortModal from './ShortModal'
import './ShortsPage.css'

const shortsData = [
    { id: 1, title: 'CSS Grid Quick Tip', views: 1200, comments: 8, likes: 45 },
    { id: 2, title: 'React useEffect Demo', views: 900, comments: 5, likes: 30 },
    { id: 3, title: 'Async JS Explained', views: 1500, comments: 12, likes: 60 },
    { id: 5, title: 'Flexbox in 60s', views: 800, comments: 3, likes: 20 },
    { id: 6, title: 'Flexbox in 60s', views: 800, comments: 3, likes: 20 },
    { id: 7, title: 'Flexbox in 60s', views: 800, comments: 3, likes: 20 },
    { id: 8, title: 'Flexbox in 60s', views: 800, comments: 3, likes: 20 },
    { id: 9, title: 'Flexbox in 60s', views: 800, comments: 3, likes: 20 },

    // ...more shorts
]

const ShortsPage = () => {
    const [selectedShort, setSelectedShort] = useState(null)
    const [showComments, setShowComments] = useState(false)

    return (
        <div className="instructor-shorts-root">
            {/* Sticky Header */}
            <div className="instructor-shorts-header">
                <h2>Your Shorts</h2>
                <button className="create-short-btn glass-card">
                    <UploadIcon style={{ marginRight: 8 }} />
                    Create New Short
                </button>
            </div>
            {/* Shorts Grid */}
            <div className="instructor-shorts-grid-container">
                <ShortsGrid
                    shorts={shortsData}
                    onShortClick={short => {
                        setSelectedShort(short)
                        setShowComments(false)
                    }}
                />
            </div>
            {/* Modal for Short */}
            {selectedShort && (
                <ShortModal
                    short={selectedShort}
                    onClose={() => setSelectedShort(null)}
                    showComments={showComments}
                    onShowComments={() => setShowComments(true)}
                    onHideComments={() => setShowComments(false)}
                />
            )}
        </div>
    )
}

export default ShortsPage