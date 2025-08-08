"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import logo from "@/public/logos/plecos.avif";
import ThemeToggle from './ThemeToggle';
import './Header.css';
import { Search } from 'lucide-react';
import AdvancedSearchModal from './AdvancedSearchModal';
import { useRouter } from 'next/navigation';
import useUploadWarning from '@/hooks/useUploadWarning';

export default function Header({ roleTarget = "/educator" }) {
  const router = useRouter()
  const { safeRouterPush } = useUploadWarning();
  const [searchOpen, setSearchOpen] = useState(false);
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
        </div>
        <div className="header__right">

          <div
            className="explore-search"
            style={{ cursor: 'pointer' }}
            onClick={() => setSearchOpen(true)}
          >
            <Search size={20} color="#666" />
          </div>
          <ThemeToggle />
          <div
            className="explore-search"
            style={{ cursor: 'pointer' }}
            onClick={() => roleTarget == "/" ? safeRouterPush("/") : router.push(roleTarget)}
          >
            Switch Role
          </div>
        </div>
      </header>
      <AdvancedSearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}