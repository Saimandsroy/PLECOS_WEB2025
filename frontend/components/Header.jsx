
import React from 'react';
import './Header.css';
import Image from 'next/image';
import logo from "@/public/logos/plecos.avif";

export default function Header({ title, rightElement }) {
  return (
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
        {/* Client-side interactive component */}
        {rightElement}
        <img
          src="https://api.dicebear.com/7.x/fun-emoji/svg?seed=User"
          alt="profile"
          className="header__avatar"
        />
      </div>
    </header>
  );
}
