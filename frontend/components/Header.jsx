"use client";
import React, { useState } from 'react';
import './Header.css';
import Image from 'next/image';
import logo from "@/public/logos/plecos.avif";
import { useRouter } from 'next/navigation';
import { Moon } from 'lucide-react';


export default function Header({ title, roleTarget }) {
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  // Dummy user info
  const user = {
    name: "Alex Doe",
    email: "alex.doe@email.com",
    avatar: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=User"
  };

  return (
    <>
      <header className="header">
        <div className="header__left">
          <div className="header__logo">
            <Image
              src={logo}
              alt="logo"
              width={45}
              height={45}
              className="header__logo-image"
            />
          </div>
          <span className="header__title">{title}</span>
        </div>

        <div className="header__right" style={{ position: 'relative' }}>
          <button
            className="header__mode-btn"
            onClick={() => alert('Change mode clicked!')}
          >
            <Moon size={20} />
          </button>
          <img
            src={user.avatar}
            alt="profile"
            className="header__avatar"
            style={{ cursor: 'pointer' }}
            onClick={() => setModalOpen(!modalOpen)}
          />
          {modalOpen && (
            <div
              className="header__dropdown"
              style={{
                position: 'absolute',
                top: 56,
                right: 0,
                background: '#fff',
                boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
                borderRadius: 12,
                padding: '1.5rem 2rem',
                minWidth: 220,
                zIndex: 100
              }}
              onClick={e => e.stopPropagation()}
            >
              <img
                src={user.avatar}
                alt="profile"
                style={{ width: 48, height: 48, borderRadius: '50%', margin: '0 auto', display: 'block' }}
              />
              <h2 style={{ margin: '12px 0 4px', fontSize: 18, textAlign: 'center' }}>{user.name}</h2>
              <div style={{ color: '#666', marginBottom: 16, fontSize: 14, textAlign: 'center' }}>{user.email}</div>
              <button
                onClick={() => {
                  router.push('/profile');
                  setModalOpen(false);
                }}
                style={{
                  width: '100%',
                  padding: '8px 0',
                  borderRadius: 6,
                  background: '#f5faff',
                  color: '#4f8cff',
                  border: 'none',
                  fontWeight: 600,
                  marginBottom: 8,
                  cursor: 'pointer'
                }}
              >
                Profile
              </button>
              <button
                onClick={() => {
                  router.push(roleTarget);
                  setModalOpen(false);
                }}
                style={{
                  width: '100%',
                  padding: '8px 0',
                  borderRadius: 6,
                  background: '#4f8cff',
                  color: '#fff',
                  border: 'none',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Switch Role
              </button>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
