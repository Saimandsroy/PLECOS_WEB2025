import React from 'react'

const tabs = [
  { key: 'structured', label: 'Structured Courses' },
  { key: 'videos', label: 'Videos' },
  { key: 'docs', label: 'Docs' }
]

const CoursesTabs = ({ tab, setTab }) => (
  <div style={{
    display: 'flex',
    gap: 10,
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: 12
  }}>
    {tabs.map(t => (
      <button
        key={t.key}
        onClick={() => setTab(t.key)}
        style={{
          background: tab === t.key ? '#232b36' : '#fff',
          color: tab === t.key ? '#fff' : '#232b36',
          border: '1px solid #e5e7eb',
          borderRadius: 6,
          padding: '6px 18px',
          fontWeight: 600,
          fontSize: 15,
          cursor: 'pointer',
          boxShadow: tab === t.key ? '0 2px 8px rgba(30,41,59,0.06)' : 'none'
        }}
      >
        {t.label}
      </button>
    ))}
  </div>
)

export default CoursesTabs