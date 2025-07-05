"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "./TopLoader.css"
NProgress.configure({ showSpinner: false });

const TopLoader = () => {
    const pathname = usePathname();

    useEffect(() => {
        NProgress.start();
        NProgress.set(0.4);
        NProgress.inc();
        NProgress.done();
        // Optionally, you can add a small delay for better UX
    }, [pathname]);

    return null;
};

export default TopLoader;