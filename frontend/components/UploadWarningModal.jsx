"use client";

import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import './UploadWarningModal.css';

const UploadWarningModal = ({ isOpen, onCancel, onContinue, uploadCount }) => {
    if (!isOpen) return null;

    return (
        <div className="warning-modal-overlay" onClick={onCancel}>
            <div className="warning-modal" onClick={(e) => e.stopPropagation()}>
                <div className="warning-modal-header">
                    <div className="warning-icon">
                        <AlertTriangle size={24} />
                    </div>
                    <h3 className="warning-title">Active Uploads in Progress</h3>
                    <button className="warning-modal-close" onClick={onCancel}>
                        <X size={20} />
                    </button>
                </div>

                <div className="warning-modal-body">
                    <p className="warning-message">
                        You currently have <strong>{uploadCount}</strong> active upload{uploadCount > 1 ? 's' : ''} in progress.
                        Navigating away from this page will <strong>cancel all uploads</strong> and you'll lose your progress.
                    </p>

                    <div className="warning-actions">
                        <button
                            className="warning-btn warning-btn-cancel"
                            onClick={onCancel}
                        >
                            Stay on Page
                        </button>
                        <button
                            className="warning-btn warning-btn-continue"
                            onClick={onContinue}
                        >
                            Cancel Uploads & Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadWarningModal;
