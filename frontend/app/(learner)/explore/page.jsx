import React from 'react'
import ExploreSearch from './components/ExploreSearch'
import TrendingSection from './components/TrendingSection'

const ExplorePage = () => (
  <div style={{ padding: '2rem 0' }}>
    <h2 style={{ fontWeight: 600, fontSize: 24, marginBottom: 16 }}>Explore</h2>
    <ExploreSearch />
    <TrendingSection />
  </div>
)

export default ExplorePage