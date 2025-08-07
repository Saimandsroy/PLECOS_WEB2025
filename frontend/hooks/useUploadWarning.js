"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useUploadContext } from "@/contexts/UploadContext";

const useUploadWarning = () => {
  const { uploads } = useUploadContext();
  const router = useRouter();

  // Check if there are active uploads
  const hasActiveUploads = useCallback(() => {
    return uploads.some((upload) =>
      [
        "initiating",
        "phase1-uploading",
        "phase2-uploading",
        "phase3-uploading",
      ].includes(upload.status)
    );
  }, [uploads]);

  // Handle browser refresh/close
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (hasActiveUploads()) {
        const message =
          "You have active uploads in progress. Leaving this page will cancel all uploads. Are you sure you want to continue?";
        event.preventDefault();
        event.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasActiveUploads]);

  // Custom navigation warning function
  const showNavigationWarning = useCallback(() => {
    if (hasActiveUploads()) {
      return new Promise((resolve) => {
        const confirmNavigation = window.confirm(
          "You have active uploads in progress. Navigating away can cancel all uploads. Do you want to continue?"
        );
        resolve(confirmNavigation);
      });
    }
    return Promise.resolve(true);
  }, [hasActiveUploads]);

  // Enhanced router push with warning
  const safeRouterPush = useCallback(
    async (href) => {
      const canNavigate = await showNavigationWarning();
      if (canNavigate) {
        router.push(href);
      }
    },
    [router, showNavigationWarning]
  );

  // Enhanced router replace with warning
  const safeRouterReplace = useCallback(
    async (href) => {
      const canNavigate = await showNavigationWarning();
      if (canNavigate) {
        router.replace(href);
      }
    },
    [router, showNavigationWarning]
  );

  return {
    hasActiveUploads: hasActiveUploads(),
    showNavigationWarning,
    safeRouterPush,
    safeRouterReplace,
  };
};

export default useUploadWarning;
