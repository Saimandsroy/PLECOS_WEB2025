import React from 'react'
import LearnerBanner from './components/LearnerBanner'
import QuickLinks from './components/QuickLinks'
import ContinueCourses from './components/ContinueCourses'
import WatchLater from './components/WatchLater'

const HomePage = () => (
    <div style={{ padding: '2rem 0' }}>
        <LearnerBanner />
        <QuickLinks />
        <ContinueCourses />
        <WatchLater />
    </div>
)

export default HomePage