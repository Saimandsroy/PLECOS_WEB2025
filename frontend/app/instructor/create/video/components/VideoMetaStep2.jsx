import React, { useState } from "react";
import "./VideoMetaStep2.css";
import { PlusIcon } from "@radix-ui/react-icons";

const hashtagSuggestions = [
    "React", "JavaScript", "WebDev", "Coding", "Tutorial", "Frontend", "NextJS"
];

const VideoMetaStep2 = ({
    description,
    setDescription,
    tags,
    setTags,
    onBack,
    onSubmit
}) => {
    const [tagInput, setTagInput] = useState("");
    const addTag = (tag) => {
        if (tag && !tags.includes(tag)) setTags([...tags, tag]);
        setTagInput("");
    };
    const removeTag = (tag) => setTags(tags.filter(t => t !== tag));
    const filteredSuggestions = hashtagSuggestions.filter(
        (s) => s.toLowerCase().includes(tagInput.toLowerCase()) && !tags.includes(s)
    );

    return (
        <form className="video-meta-step2" onSubmit={e => { e.preventDefault(); onSubmit(); }}>
            <div>
                <label>Description</label>
                <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    rows={4}
                    placeholder="Describe your video"
                />
            </div>
            <div>
                <label>Tags</label>
                <div className="video-meta-tags-input">
                    <input
                        type="text"
                        value={tagInput}
                        onChange={e => setTagInput(e.target.value)}
                        onKeyDown={e => {
                            if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
                                e.preventDefault();
                                addTag(tagInput.trim().replace(/^#/, ""));
                            }
                        }}
                        placeholder="Type and press Enter…"
                    />
                    <button
                        type="button"
                        className="video-meta-addtag"
                        onClick={() => addTag(tagInput.trim().replace(/^#/, ""))}
                        disabled={!tagInput.trim()}
                    >
                        <PlusIcon width={38} height={24} />
                    </button>
                </div>
                <div className="video-meta-tags-list">
                    {tags.map(tag => (
                        <span className="video-meta-tag" key={tag}>
                            #{tag}
                            <button type="button" onClick={() => removeTag(tag)}>&times;</button>
                        </span>
                    ))}
                </div>
                {filteredSuggestions.length > 0 && (
                    <div className="video-meta-suggestions">
                        {filteredSuggestions.map(s => (
                            <span
                                key={s}
                                className="video-meta-suggestion"
                                onClick={() => addTag(s)}
                            >
                                #{s}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            <div className="video-meta-step2-actions">
                <button type="button" className="video-meta-back" onClick={onBack}>
                    Back
                </button>
                <button type="submit" className="video-meta-upload">
                    Upload Video
                </button>
            </div>
        </form>
    );
};

export default VideoMetaStep2;