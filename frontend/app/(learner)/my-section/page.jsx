import React from 'react'
import MySecActions from './components/MySecActions'
import WatchLaterCarousel from './components/WatchLaterCarousel'

const MySecPage = () => (
    <div style={{ padding: '2rem 0' }}>
        <h2 style={{ fontWeight: 600, fontSize: 24, marginBottom: 16 }}>My Sec</h2>
        <MySecActions />
        <div style={{ marginTop: 32 }}>
            <WatchLaterCarousel />
        </div>
    </div>
)

export default MySecPage