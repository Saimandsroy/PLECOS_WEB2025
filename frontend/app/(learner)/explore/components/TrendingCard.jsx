import React from 'react'

const cardBg = {
  Teacher: '#232b36',
  Course: '#374151',
  Short: '#475569',
  Video: '#111827'
}

const TrendingCard = ({
  type, title, subtitle, avatar, icon, followers, learners, duration
}) => (
  <div style={{
    minWidth: 260,
    maxWidth: 280,
    borderRadius: 16,
    background: '#fff',
    boxShadow: '0 2px 12px rgba(30,41,59,0.06)',
    border: '1px solid #e5e7eb',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  }}>
    <div style={{
      background: cardBg[type] || '#232b36',
      color: '#fff',
      height: 90,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 600,
      fontSize: 20
    }}>
      {type === 'Teacher' && 'Teacher'}
      {type === 'Course' && 'Course'}
      {type === 'Short' && 'Short'}
      {type === 'Video' && <span style={{ fontSize: 28 }}>{icon}</span>}
    </div>
    <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {type === 'Teacher' && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src={avatar} alt={title} style={{ width: 38, height: 38, borderRadius: '50%' }} />
            <div>
              <div style={{ fontWeight: 600 }}>{title}</div>
              <div style={{ color: '#64748b', fontSize: 14 }}>{subtitle}</div>
            </div>
          </div>
          <div style={{
            background: '#f1f5f9',
            color: '#374151',
            borderRadius: 8,
            padding: '4px 12px',
            fontSize: 14,
            width: 'fit-content',
            marginTop: 8
          }}>{followers}</div>
        </>
      )}
      {type === 'Course' && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              background: '#e5e7eb',
              borderRadius: 8,
              padding: 8,
              fontSize: 20
            }}>📘</span>
            <div>
              <div style={{ fontWeight: 600 }}>{title}</div>
              <div style={{ color: '#64748b', fontSize: 14 }}>{subtitle}</div>
            </div>
          </div>
          <div style={{
            background: '#f1f5f9',
            color: '#374151',
            borderRadius: 8,
            padding: '4px 12px',
            fontSize: 14,
            width: 'fit-content',
            marginTop: 8
          }}>{learners}</div>
        </>
      )}
      {type === 'Short' && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              background: '#475569',
              borderRadius: 8,
              padding: 8,
              color: '#fff',
              fontSize: 20
            }}>🎬</span>
            <div>
              <div style={{ fontWeight: 600 }}>{title}</div>
              <div style={{ color: '#64748b', fontSize: 14 }}>{subtitle}</div>
            </div>
          </div>
          <div style={{
            display: 'flex',
            gap: 8,
            marginTop: 8
          }}>
            <span style={{
              background: '#f1f5f9',
              color: '#374151',
              borderRadius: 8,
              padding: '4px 12px',
              fontSize: 14
            }}>{duration}</span>
          </div>
        </>
      )}
      {type === 'Video' && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 60
        }}>
          <span style={{
            background: '#e5e7eb',
            borderRadius: 8,
            padding: 8,
            fontSize: 20
          }}>▶️</span>
          <span style={{
            marginLeft: 12,
            background: '#f1f5f9',
            color: '#374151',
            borderRadius: 8,
            padding: '4px 12px',
            fontSize: 14
          }}>{duration}</span>
        </div>
      )}
    </div>
  </div>
)

export default TrendingCard