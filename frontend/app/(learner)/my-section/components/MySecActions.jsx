import React from 'react'
import { ClockIcon, ListBulletIcon, DownloadIcon, BarChartIcon, BadgeIcon, DesktopIcon } from '@radix-ui/react-icons'

const actions = [
  { icon: <ClockIcon width={28} height={28} />, label: 'Watch Later' },
  { icon: <ListBulletIcon width={28} height={28} />, label: 'Playlist' },
  { icon: <DownloadIcon width={28} height={28} />, label: 'Downloads' },
  { icon: <BarChartIcon width={28} height={28} />, label: 'Trending' },
  { icon: <BadgeIcon width={28} height={28} />, label: 'Badges & Certificates' },
  { icon: <DesktopIcon width={28} height={28} />, label: 'My Courses & Tests' }
]

const MySecActions = () => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: 20,
    marginBottom: 8
  }}>
    {actions.map((a, i) => (
      <div key={a.label}
        style={{
          border: '1px solid #e5e7eb',
          borderRadius: 12,
          background: '#fff',
          padding: '2rem 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontWeight: 500,
          fontSize: 18,
          gap: 16,
          minHeight: 110,
          boxShadow: '0 1px 8px rgba(30,41,59,0.03)'
        }}>
        {a.icon}
        <span>{a.label}</span>
      </div>
    ))}
  </div>
)

export default MySecActions