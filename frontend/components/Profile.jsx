"use client";
import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import './Profile.css';

const Profile = ({ user, roleTarget }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const dropdownRef = useRef(null);
    const avatarRef = useRef(null);
    const router = useRouter();
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

    // Close modal when clicking outside
    useEffect(() => {
        if (!modalOpen) return;
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                avatarRef.current &&
                !avatarRef.current.contains(event.target)
            ) {
                setModalOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [modalOpen]);

    // Position modal near avatar
    const handleAvatarClick = () => {
        if (avatarRef.current) {
            if (!modalOpen) {
                const rect = avatarRef.current.getBoundingClientRect();
                setModalPosition({
                    top: rect.bottom + window.scrollY + 8, // 8px offset
                    left: rect.left + window.scrollX,
                });
            }
            setModalOpen((prev) => !prev);
        }
    };

    return (
        <>
            <img
                ref={avatarRef}
                src={user.avatar}
                alt="profile"
                className="header__avatar"
                onClick={handleAvatarClick}
            />
            {modalOpen &&
                createPortal(
                    <div
                        className="header__dropdown"
                        ref={dropdownRef}
                        style={{
                            top: modalPosition.top,
                            left: modalPosition.left,
                        }}
                    >
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
                    </div>,
                    document.body // Render modal in the body, outside sidebar
                )
            }
        </>
    )
}

export default Profile