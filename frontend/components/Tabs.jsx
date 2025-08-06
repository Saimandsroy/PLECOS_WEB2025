"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import CreateModel from "@/components/create/CreateModel";
import Profile from "./Profile";
import "./Tabs.css";

const MOBILE_BREAKPOINT = 768;

const user = {
  name: "Alex Doe",
  email: "alex.doe@email.com",
  avatar: "https://api.dicebear.com/7.x/fun-emoji/svg?seed=User"
};

const Tabs = ({ sidebarLinks, iFier, homePath = "/", homeActivePaths = [], roleTarget, title = "Learner" }) => {
  console.log(homeActivePaths)
  const pathname = usePathname();
  const router = useRouter();
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
          <div className="le-tabs-lnks-wrapper">
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
          </div>
          {iFier && iFier.identifier === "edu" && (
            <div style={{ position: "relative" }}>
              <button
                className={clsx("le-tabs-link", "le-tabs-link-last", {
                  active: pathname === lastElement.to,
                })}
                onClick={() => router.push("/educator/create")}
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
          <div className="le-tabs-header">
            <Profile user={user} roleTarget={roleTarget} />
            <div className="le-tabs-hdr-name"><p>{title}</p></div>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Tabs;
