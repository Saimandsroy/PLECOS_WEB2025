import React from 'react'
import './Header.css'
import Image from 'next/image'
import logo from "@/public/logos/plecos.avif";
import Link from 'next/link';

const Header = ({ title, buttonTitle, buttonLink }) => {
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
                <Link href={buttonLink}><button className="header__switch-btn">{buttonTitle}</button></Link>
                <img
                    src="https://api.dicebear.com/7.x/fun-emoji/svg?seed=User"
                    alt="profile"
                    className="header__avatar"
                />
            </div>
        </header>
    )
}

export default Header