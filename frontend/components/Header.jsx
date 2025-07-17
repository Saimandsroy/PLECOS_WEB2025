"use client";
import React from 'react';
import Image from 'next/image';
import logo from "@/public/logos/plecos.avif";
import ThemeToggle from './ThemeToggle';
import './Header.css';
import SearchBarWrapper from '@/app/(learner)/explore/components/SearchBarWrapper';

export default function Header() {

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
          {/* <span className="header__title">{title}</span> */}
        </div>


        <div className="header__right">
          <SearchBarWrapper />
          <ThemeToggle />

        </div>
      </header>
    </>
  );
}