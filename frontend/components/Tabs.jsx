"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import "./Tabs.css";

const MOBILE_BREAKPOINT = 768;

export default function Tabs({ sidebarLinks }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > MOBILE_BREAKPOINT) setOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <button
        aria-label="Toggle navigation"
        className="le-toggle"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

    
      {open && <div className="le-overlay" onClick={() => setOpen(false)} />}

      <aside className={clsx("le-tabs", { open })}>
        <nav className="le-tabs-nav">
          {sidebarLinks.map((link) => (
            <Link
              key={link.to}
              href={link.to}
              className={clsx("le-tabs-link", {
                active: pathname === link.to,
              })}
              onClick={() => setOpen(false)}
            >
              <span className="le-tabs-icon">{link.icon}</span>
              <span className="le-tabs-text">{link.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
