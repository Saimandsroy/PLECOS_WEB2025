import React from 'react'

const bgColors = [
  '#232b36', '#374151', '#475569', '#232b36'
]

const CourseCard = ({ title, desc, progress, lessons, completed }, idx) => (
  <div style={{
    borderRadius: 12,
    background: '#fff',
    boxShadow: '0 2px 12px rgba(30,41,59,0.06)',
    border: '1px solid #e5e7eb',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 220
  }}>
    <div style={{
      background: bgColors[idx % bgColors.length],
      color: '#fff',
      height: 70,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 600,
      fontSize: 18
    }}>
      {title}
    </div>
    <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontWeight: 600 }}>{title}</div>
      <div style={{ color: '#64748b', fontSize: 15 }}>{desc}</div>
      <div style={{ marginTop: 8, fontSize: 14 }}>
        Progress: {progress}%
        <span style={{ float: 'right' }}>{completed}/{lessons} lessons</span>
      </div>
      <div style={{
        width: '100%',
        height: 7,
        background: '#e5e7eb',
        borderRadius: 6,
        marginTop: 4,
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          background: '#232b36',
          borderRadius: 6,
        }} />
      </div>
    </div>
  </div>
)

export default CourseCard