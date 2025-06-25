import React from 'react'
import './ShortsPage.css'

const ShortsGrid = ({ shorts, onShortClick }) => (
  <div className="instructor-shorts-grid">
    {shorts.map(short => (
      <div
        key={short.id}
        className="instructor-short-card"
        onClick={() => onShortClick(short)}
        tabIndex={0}
      >
        <div className="instructor-short-thumb">
          <span>{short.title}</span>
        </div>
        <div className="instructor-short-meta">
          <span>👁 {short.views}</span>
          <span>💬 {short.comments}</span>
          <span>❤️ {short.likes}</span>
        </div>
      </div>
    ))}
  </div>
)

export default ShortsGrid