"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import "./Tabs.css";
import CreateModel from "@/components/create/CreateModel";
const MOBILE_BREAKPOINT = 768;

const Tabs = ({ sidebarLinks, iFier, homePath = "/", homeActivePaths = [] }) => {
  console.log(homeActivePaths)
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // Separate state for the model dropdown
  const [modelOpen, setModelOpen] = useState(false);
  console.log(modelOpen)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) {
        setOpen(false);
        setModelOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const lastElement = sidebarLinks[sidebarLinks.length - 1];

  return (
    <>
      <button
        aria-label="Toggle navigation"
        onClick={() => setOpen((prev) => !prev)}
        className="le-toggle"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {open && <div className="le-overlay-navigate" onClick={() => setOpen(false)} />}

      {/* Sidebar */}
      <aside className={clsx("le-tabs", { open })}>
        <nav className="le-tabs-nav">
          {((iFier && iFier.identifier === "edu")
            ? sidebarLinks.slice(0, -1)
            : sidebarLinks
          ).map((link) => (
            <Link
              key={link.to}
              href={link.to}
              onClick={() => setOpen(false)}
              className={clsx("le-tabs-link", {
                active:
                  link.to === homePath
                    ? pathname === homePath ||
                    homeActivePaths.some((p) => pathname.startsWith(p))
                    : pathname.startsWith(link.to)
              })}
            >
              <span className="le-tabs-icon">{link.icon}</span>
              <span className="le-tabs-text">{link.label}</span>
            </Link>
          ))}
          {iFier && iFier.identifier === "edu" && (
            <div style={{ position: "relative" }}>
              <button
                className={clsx("le-tabs-link", "le-tabs-link-last", {
                  active: pathname === lastElement.to,
                })}
                onClick={() => setModelOpen((v) => !v)}
                aria-label="Open create menu"
                type="button"
              >
                <span className="le-tabs-icon le-tabs-icon-last">
                  {lastElement.icon}
                </span>
              </button>
              <CreateModel
                links={iFier.model}
                open={modelOpen}
                setOpen={setModelOpen}
              />
            </div>
          )}
        </nav>
      </aside>
    </>
  );
};

export default Tabs;
