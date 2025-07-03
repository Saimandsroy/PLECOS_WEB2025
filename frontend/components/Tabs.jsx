"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import "./Tabs.css";

const Tabs = ({ sidebarLinks }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        aria-label="Toggle navigation"
        onClick={() => setOpen((o) => !o)}
        className="le-toggle"
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
              onClick={() => setOpen(false)}
              className={clsx("le-tabs-link", {
                active: pathname === link.to,
              })}
            >
              <span className="le-tabs-icon">{link.icon}</span>
              <span className="le-tabs-text">{link.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Tabs;
