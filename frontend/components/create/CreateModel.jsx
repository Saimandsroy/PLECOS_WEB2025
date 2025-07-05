"use client";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./CreateModel.css";
import Link from "next/link";

const CreateModel = ({ links, open, setOpen }) => {
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (!open) return;
        const handleClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [open, setOpen]);

    if (!open || !Array.isArray(links)) return null;

    // Render in portal
    return createPortal(
        <div
            ref={dropdownRef}
            className="le-tabs-create-dropdown"
        >
            {links.map((link) => (
                <Link
                    key={link.to}
                    href={link.to}
                    className="le-tabs-create-link"
                    onClick={() => setOpen(false)}
                >
                    {link.icon && <span style={{ marginRight: 8 }}>{link.icon}</span>}
                    {link.label}
                </Link>
            ))}
        </div>,
        document.body
    );
};

export default CreateModel;
