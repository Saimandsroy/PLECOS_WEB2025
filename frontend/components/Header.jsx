"use client";

import React, { useState } from 'react';
import './Header.css';
import Image from 'next/image';
import logo from "@/public/logos/plecos.avif";
import { useRouter } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

export default function Header({ title, roleTarget }) {
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

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

        <div className="header__right">
          <ThemeToggle />
          <img
            src={user.avatar}
            alt="profile"
            className="header__avatar"
            onClick={() => setModalOpen(!modalOpen)}
          />
          {modalOpen && (
            <div className="header__dropdown" onClick={(e) => e.stopPropagation()}>
              <img
                src={user.avatar}
                alt="profile"
                className="header__dropdown-avatar"
              />
              <h2 className="header__dropdown-name">{user.name}</h2>
              <div className="header__dropdown-email">{user.email}</div>
              <button
                className="header__dropdown-button outline"
                onClick={() => {
                  router.push('/profile');
                  setModalOpen(false);
                }}
              >
                Profile
              </button>
              <button
                className="header__dropdown-button filled"
                onClick={() => {
                  router.push(roleTarget);
                  setModalOpen(false);
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