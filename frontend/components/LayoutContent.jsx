"use client";
import GlobalUploadStatus from '@/components/global/GlobalUploadStatus';
import useUploadWarning from '@/hooks/useUploadWarning';

function LayoutContent({ children }) {
    useUploadWarning();
    return (
        <>
            {children}
            <GlobalUploadStatus />
        </>
    );
}

export default LayoutContent;
