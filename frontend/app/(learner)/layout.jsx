"use client";

import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Tabs from "../../components/Tabs";
import "./layout.css";
import LayoutContent from "@/components/LayoutContent";
import {
  HomeIcon,
  BookmarkFilledIcon,
  VideoIcon,
  ArchiveIcon,
} from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";

const sidebarLinks = [
  { to: "/", icon: <HomeIcon width={20} height={20} />, label: "Home" },
  {
    to: "/courses",
    icon: <BookmarkFilledIcon width={20} height={20} />,
    label: "Courses",
  },
  {
    to: "/shorts",
    icon: <VideoIcon width={20} height={20} />,
    label: "Shorts",
  },
  {
    to: "/my-section",
    icon: <ArchiveIcon width={20} height={20} />,
    label: "Me",
  },
];

const homeActivePaths = ["/profile", "/video", "/search"];

/* ---------- Breadcrumb Component ---------- */
function DynamicBreadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        {/* Home link */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {segments.map((segment, idx) => {
          const href = "/" + segments.slice(0, idx + 1).join("/");
          const isLast = idx === segments.length - 1;
          const label = decodeURIComponent(segment)
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase()); // Capitalize

          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

/* ---------- Main Layout ---------- */
export default function RootLayout({ children }) {
  return (
    <LayoutContent>
      <div className="le-m">
        <Header roleTarget="/educator" />
        <div className="le-c">
          <Tabs
            sidebarLinks={sidebarLinks}
            homePath="/"
            homeActivePaths={homeActivePaths}
            roleTarget="/educator"
            title="Learner"
          />
          <main className="le-mc p-4">
            <DynamicBreadcrumbs />
            {children}
          </main>
        </div>
        {/* <Footer /> */}
      </div>
    </LayoutContent>
  );
}
