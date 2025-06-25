import React from 'react'

const ExploreSearch = () => (
  <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
    <input
      type="text"
      placeholder="Search courses, shorts, teachers..."
      style={{
        flex: 1,
        padding: '0.75rem 1rem',
        borderRadius: 8,
        border: '1px solid #e5e7eb',
        fontSize: 16,
        background: '#fff'
      }}
    />
    <button
      style={{
        background: '#111827',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        padding: '0.75rem 1.5rem',
        fontWeight: 600,
        fontSize: 16,
        cursor: 'pointer'
      }}
    >
      Search
    </button>
  </div>
)

export default ExploreSearch