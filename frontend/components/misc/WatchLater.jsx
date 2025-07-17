import React from 'react'
import './WatchLater.css'

const watchLater = [
    {
        title: 'The Solar System Explained',
        author: 'Dr. Smith',
        duration: '12 min',
    },
    {
        title: 'Fractions',
        author: 'Ava Lee',
        duration: '7 min',
    },
]

const WatchLater = () => (
    <div>
        <div className="watch-later-title">
            Watch Later
        </div>
        <div className="watch-later-list">
            {watchLater.map((v, i) => (
                <div className="watch-later-card" key={i}>
                    <div className="watch-later-card-header">
                        Video Placeholder
                    </div>
                    <div className="watch-later-card-body">
                        <div className="watch-later-card-title">{v.title}</div>
                        <div className="watch-later-card-meta">
                            By {v.author} • {v.duration}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
)

export default WatchLater