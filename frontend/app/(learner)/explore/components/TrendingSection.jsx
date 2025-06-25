import React from 'react'
import TrendingCard from './TrendingCard'

const trendingData = [
  {
    type: 'Teacher',
    title: 'Ava Lee',
    subtitle: 'Maths Educator',
    avatar: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=Ava',
    followers: '45K followers'
  },
  {
    type: 'Course',
    title: 'Python for Beginners',
    subtitle: 'By John Miller',
    icon: '📘',
    learners: '12K learners'
  },
  {
    type: 'Short',
    title: 'Quick History Fact',
    subtitle: '2.1K views',
    icon: '🎬',
    duration: '0:58'
  },
  {
    type: 'Video',
    title: '',
    subtitle: '',
    icon: '▶️',
    duration: '8:14'
  }
]

const TrendingSection = () => (
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
      <span style={{ fontWeight: 600, fontSize: 18 }}>Trending</span>
      <span style={{ color: '#64748b', fontSize: 15, cursor: 'pointer' }}>See all</span>
    </div>
    <div style={{ display: 'flex', gap: 24, overflowX: 'auto', paddingBottom: 8 }}>
      {trendingData.map((item, idx) => (
        <TrendingCard key={idx} {...item} />
      ))}
    </div>
  </div>
)

export default TrendingSection