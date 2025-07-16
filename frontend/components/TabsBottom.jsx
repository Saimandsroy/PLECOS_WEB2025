"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './Header.css';

export default function TabsBottom({ roleTarget }) {
    const [modalOpen, setModalOpen] = useState(false);
    const dropdownRef = useRef(null);
    const router = useRouter();

    // Close modal when clicking outside
    useEffect(() => {
        if (!modalOpen) return;
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setModalOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [modalOpen]);

    const user = {
        name: "Alex Doe",
        email: "alex.doe@email.com",
        avatar: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=User"
    };

    return (
        <>
            <div>
                <div className="header__right">
                    <img
                        src={user.avatar}
                        alt="profile"
                        className="header__avatar"
                        onClick={() => setModalOpen(!modalOpen)}
                    />
                    {modalOpen && (
                        <div
                            className="header__dropdown"
                            ref={dropdownRef}
                            onClick={(e) => e.stopPropagation()}
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
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}