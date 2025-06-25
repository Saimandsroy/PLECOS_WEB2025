import React from 'react'
import QuickLinks from './components/QuickLinks'
import ContinueCourses from './components/ContinueCourses'
import WatchLater from './components/WatchLater'

const HomePage = () => (
    <div style={{ padding: '2rem 0' }}>
        <h2 style={{ fontWeight: 600, fontSize: 24, marginBottom: 16 }}>
            Welcome Back 👋
        </h2>
        <QuickLinks />
        <ContinueCourses />
        <WatchLater />
    </div>
)

export default HomePage