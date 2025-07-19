"use client";
import React from 'react'
import Link from 'next/link';
import './Profile.css';

const Profile = ({ user }) => {

    return (
        <Link href="/profile" className="header__link" >
            <img
                src={user.avatar}
                alt="profile"
                className="header__avatar"
            />
        </Link>

    )
}

export default Profile