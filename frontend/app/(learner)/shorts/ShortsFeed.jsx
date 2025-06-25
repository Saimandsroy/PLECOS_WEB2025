"use client"
import React, { useState, useRef } from 'react'
import ShortCard from './ShortCard'
import { ChevronUpIcon, ChevronDownIcon } from '@radix-ui/react-icons'
import CommentSection from './CommentSection'
import './ShortsFeed.css'

const shortsData = [
  { id: 1, likes: 98, comments: 19, views: 850 },
  { id: 2, likes: 120, comments: 25, views: 1200 },
  { id: 3, likes: 45, comments: 8, views: 400 },
]

const ShortsFeed = () => {
  const [current, setCurrent] = useState(0)
  const [showComments, setShowComments] = useState(false)
  const [animDir, setAnimDir] = useState(null)
  const scrollTimeout = useRef(null)

  // Handle wheel scroll (up/down)
  const handleWheel = (e) => {
    if (scrollTimeout.current || showComments) return
    if (e.deltaY > 0 && current < shortsData.length - 1) {
      animateScroll(1)
    } else if (e.deltaY < 0 && current > 0) {
      animateScroll(-1)
    }
  }

  // Animate scroll
  const animateScroll = (dir) => {
    setAnimDir(dir > 0 ? 'down' : 'up')
    setTimeout(() => {
      setCurrent(c => c + dir)
      setAnimDir(null)
    }, 350)
    scrollTimeout.current = setTimeout(() => {
      scrollTimeout.current = null
    }, 400)
  }

  // Optional: handle arrow keys
  React.useEffect(() => {
    const onKeyDown = (e) => {
      if (showComments) return
      if (e.key === 'ArrowDown' && current < shortsData.length - 1) {
        animateScroll(1)
      }
      if (e.key === 'ArrowUp' && current > 0) {
        animateScroll(-1)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [current, showComments])

  // Handle comment icon click
  const handleCommentClick = () => setShowComments(true)
  const handleCloseComments = () => setShowComments(false)

  return (
    <div
      className="shorts-feed-root"
      onWheel={handleWheel}
      tabIndex={0}
    >
      <div className="shorts-feed-center">
        <div className={`shorts-card-anim ${animDir ? `anim-${animDir}` : ''} ${showComments ? 'shorts-card-shrink' : ''}`}>
          <ShortCard
            short={shortsData[current]}
            onCommentClick={handleCommentClick}
          />
        </div>
        {/* Comment Section Overlay/Slide-in */}
        {showComments && (
          <CommentSection
            shortId={shortsData[current].id}
            onClose={handleCloseComments}
          />
        )}
      </div>
      {/* Arrows fixed on right */}
      <div className="shorts-arrows-fixed">
        <button
          className="shorts-arrow"
          disabled={current === 0 || showComments}
          onClick={() => animateScroll(-1)}
        >
          <ChevronUpIcon width={28} height={28} />
        </button>
        <button
          className="shorts-arrow"
          disabled={current === shortsData.length - 1 || showComments}
          onClick={() => animateScroll(1)}
        >
          <ChevronDownIcon width={28} height={28} />
        </button>
      </div>
    </div>
  )
}

export default ShortsFeed