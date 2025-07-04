import React, { useState } from "react";
import { PlusCircledIcon, Pencil2Icon } from "@radix-ui/react-icons";
import "./ThumbnailUpload.css";

const ThumbnailUpload = ({ thumbnailURL, onThumbnailChange, thumbnailInputRef }) => {
    const [showPencil, setShowPencil] = useState(false);

    return (
        <div>
            <label className="thumb-label">Thumbnail</label>
            <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={thumbnailInputRef}
                onChange={onThumbnailChange}
            />
            <div
                className={`le-thumb-upload${thumbnailURL ? " show-thumb" : ""}`}
                onClick={() => thumbnailInputRef.current.click()}
                onMouseEnter={() => setShowPencil(true)}
                onMouseLeave={() => setShowPencil(false)}
            >
                {!thumbnailURL ? (
                    <div className="thumb-placeholder">
                        <PlusCircledIcon width={36} height={36} color="#888" />
                        <span>Thumbnail</span>
                    </div>
                ) : (
                    <>
                        <img src={thumbnailURL} alt="Thumbnail" />
                        <span
                            className="le-thumb-pencil"
                            style={{ display: showPencil ? "flex" : "none" }}
                        >
                            <Pencil2Icon width={22} height={22} color="#fff" />
                        </span>
                    </>
                )}
            </div>
        </div>
    );
};

export default ThumbnailUpload;