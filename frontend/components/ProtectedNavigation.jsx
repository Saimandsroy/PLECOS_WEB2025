"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useUploadContext } from '@/contexts/UploadContext';
import UploadWarningModal from './UploadWarningModal';

const ProtectedNavigation = ({ children, href, className, onClick, ...props }) => {
    const { uploads, cancelAllUploads } = useUploadContext();
    const [showWarning, setShowWarning] = useState(false);
    const [pendingNavigation, setPendingNavigation] = useState(null);

    const activeUploads = uploads.filter(upload =>
        ['initiating', 'phase1-uploading', 'phase2-uploading', 'phase3-uploading'].includes(upload.status)
    );

    const hasActiveUploads = activeUploads.length > 0;

    const handleClick = (e) => {
        if (hasActiveUploads) {
            e.preventDefault();
            setPendingNavigation(href);
            setShowWarning(true);
        } else if (onClick) {
            onClick(e);
        }
    };

    const handleCancel = () => {
        setShowWarning(false);
        setPendingNavigation(null);
    };

    const handleContinue = () => {
        cancelAllUploads();
        setShowWarning(false);

        if (pendingNavigation) {
            window.location.href = pendingNavigation;
        }

        setPendingNavigation(null);
    };

    return (
        <>
            <Link
                href={href}
                className={className}
                onClick={handleClick}
                {...props}
            >
                {children}
            </Link>

            <UploadWarningModal
                isOpen={showWarning}
                onCancel={handleCancel}
                onContinue={handleContinue}
                uploadCount={activeUploads.length}
            />
        </>
    );
};

export default ProtectedNavigation;
