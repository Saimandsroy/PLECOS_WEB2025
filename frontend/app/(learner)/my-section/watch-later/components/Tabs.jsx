import React from 'react';

const tabs = [
  { key: 'videos', label: 'Videos' },
  { key: 'shorts', label: 'Shorts' }
];

const Tabs = ({ tab, setTab }) => {
  const baseButtonStyle = {
    borderRadius: 8,
    padding: '6px 18px',
    fontWeight: 600,
    fontSize: 15,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: '1px solid var(--border-color)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
  };

  return (
    <div style={{
      display: 'flex',
      gap: 10,
      paddingBottom: 12,
      flexWrap: 'wrap'
    }}>
      {tabs.map(t => {
        const isActive = tab === t.key;
        return (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              ...baseButtonStyle,
              background: isActive ? 'var(--text-accent)' : 'var(--background-glass)',
              color: isActive ? '#fff' : 'var(--text-primary)',
              boxShadow: isActive ? '0 4px 16px var(--shadow-color)' : 'none',
            }}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
