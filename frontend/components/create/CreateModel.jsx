"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import "./CreateModel.css";

const CreateModel = ({ links, open, setOpen }) => {
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (!open) return;

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        const handleResize = () => setOpen(false);

        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("resize", handleResize);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("resize", handleResize);
        };
    }, [open, setOpen]);

    if (!Array.isArray(links)) return null;

    return (
        <>
            {open && (
                <div className="le-tabs-create-dropdown" ref={dropdownRef}>
                    {links.map((link) => (
                        <Link
                            key={link.to}
                            href={link.to}
                            className="le-tabs-create-link"
                            onClick={() => setOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            )}
        </>
    );
};

export default CreateModel;
