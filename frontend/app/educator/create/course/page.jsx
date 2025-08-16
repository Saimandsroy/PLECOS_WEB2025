"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "@/api/axios";
import "./CourseCreation.css";
import Link from "next/link";

const MAX_THUMB_SIZE = 5 * 1024 * 1024;

const CourseCreation = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [thumbnailUploading, setThumbnailUploading] = useState(false);
  const [thumbnailKey, setThumbnailKey] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    defaultValues: {
      thumbnailUrl: null,
      title: "",
      description: "",
      category: "",
      level: "",
      price: "",
      duration: "",
    },
  });

  const uploadThumbnailToR2 = async (file) => {
    setThumbnailUploading(true);

    try {
      console.log("this is file name", file.name);
      const response = await fetch(
        `/api/course-thumbnail?filename=${encodeURIComponent(
          file.name
        )}&contentType=${encodeURIComponent(file.type)}&fileSize=${file.size}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get signed URL");
      }

      const { signedUrl, key } = await response.json();
      console.log("this is signed url", signedUrl);

      const uploadResponse = await fetch(signedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (uploadResponse.ok) {
        console.log("✅ Thumbnail upload successful!");
        setThumbnailKey(key);
      } else {
        throw new Error(`Upload failed with status: ${uploadResponse.status}`);
      }
    } catch (error) {
      console.error("Thumbnail upload error:", error);
      throw error;
    } finally {
      setThumbnailUploading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (
      file &&
      (file.type === "image/svg+xml" ||
        file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/gif")
    ) {
      if (file.size < MAX_THUMB_SIZE) {
        setImagePreview(URL.createObjectURL(file));
        await uploadThumbnailToR2(file);
      } else {
        console.log(`File size exceeds ${MAX_THUMB_SIZE / 1024 / 1024} MB`);
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const nextStep = async () => {
    const fieldsToValidate =
      currentStep === 1
        ? ["title"]
        : ["description", "category", "level", "price"];
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const submitCourseData = async (data) => {
    setIsSubmitting(true);

    try {
      data.thumbnailUrl = thumbnailKey;
      await api.post("/courses", data);
      setSuccessMsg("Course created successfully!");
    } catch (error) {
      console.error("Error submitting course:", error);

      // More detailed error handling
      if (error.response) {
        // Server responded with error status
        console.error("Server error:", error.response.data);
        alert(
          `Failed to create course: ${
            error.response.data.message || "Server error"
          }`
        );
      } else if (error.request) {
        // Request was made but no response received
        console.error("Network error:", error.request);
        alert("Network error. Please check your connection and try again.");
      } else {
        // Something else happened
        console.error("Error:", error.message);
        alert("Failed to create course. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    submitCourseData(data, true);
  };

  return (
    <div className="course-container">
      <div className="course-card">
        <div className="course-header">
          <h2 className="course-heading">Create a new course</h2>
        </div>

        <div className="course-progress">
          <div className="course-progress-bar">
            <div
              className="course-progress-fill"
              style={{ width: `${(currentStep / 2) * 100}%` }}
            />
          </div>
          <div className="course-steps">
            <span className={`course-step ${currentStep >= 1 ? "active" : ""}`}>
              Step 1: Basic Info
            </span>
            <span className={`course-step ${currentStep >= 2 ? "active" : ""}`}>
              Step 2: Details
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="course-form">
          {currentStep === 1 && (
            <div className="course-step-content">
              <div className="course-form-group">
                <label className="course-label">thumbnail</label>
                <div
                  className="course-upload-area"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <input
                    type="file"
                    id="thumbnailUrl"
                    className="course-file-input"
                    accept=".svg,.png,.jpg,.jpeg,.gif"
                    {...register("thumbnailUrl")}
                    onChange={handleImageUpload}
                  />
                  <label htmlFor="thumbnailUrl" className="course-upload-label">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Thumbnail Preview"
                        className="course-upload-preview"
                      />
                    ) : (
                      <>
                        <svg
                          className="course-upload-icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="17 8 12 3 7 8" />
                          <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                        <span className="course-upload-text">
                          Click to upload or drag and drop
                        </span>
                        <span className="course-upload-hint">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </span>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div className="course-form-group">
                <label className="course-label">Course Title</label>
                <input
                  type="text"
                  className={`course-input ${errors.title ? "error" : ""}`}
                  placeholder="e.g. Introduction to Web Design"
                  {...register("title", {
                    required: "Course title is required",
                  })}
                />
                {errors.title && (
                  <span className="course-error">{errors.title.message}</span>
                )}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="course-step-content">
              <div className="course-form-group">
                <label className="course-label">Course Description</label>
                <textarea
                  className={`course-textarea ${
                    errors.description ? "error" : ""
                  }`}
                  placeholder="Describe your course in a few sentences"
                  rows="4"
                  {...register("description", {
                    required: "Description is required",
                  })}
                />
                {errors.description && (
                  <span className="course-error">
                    {errors.description.message}
                  </span>
                )}
              </div>

              <div className="course-form-row">
                <div className="course-form-group">
                  <label className="course-label">Category</label>
                  <select
                    className={`course-select ${
                      errors.category ? "error" : ""
                    }`}
                    {...register("category", {
                      required: "Please select a category",
                    })}
                  >
                    <option value="">Select a category</option>
                    <option value="development">Development</option>
                    <option value="design">Design</option>
                    <option value="business">Business</option>
                    <option value="marketing">Marketing</option>
                    <option value="photography">Photography</option>
                  </select>
                  {errors.category && (
                    <span className="course-error">
                      {errors.category.message}
                    </span>
                  )}
                </div>

                <div className="course-form-group">
                  <label className="course-label">Level</label>
                  <select
                    className={`course-select ${errors.level ? "error" : ""}`}
                    {...register("level", {
                      required: "Please select a level",
                    })}
                  >
                    <option value="">Select a level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="all-levels">All Levels</option>
                  </select>
                  {errors.level && (
                    <span className="course-error">{errors.level.message}</span>
                  )}
                </div>
              </div>

              <div className="course-form-group">
                <label className="course-label">Duration (hours)</label>
                <input
                  type="number"
                  step="0.5"
                  className={`course-input ${errors.duration ? "error" : ""}`}
                  placeholder="e.g. 2.5"
                  {...register("duration", {
                    required: "Duration is required",
                    min: {
                      value: 0.5,
                      message: "Duration must be at least 0.5 hours",
                    },
                    max: {
                      value: 100,
                      message: "Duration cannot exceed 100 hours",
                    },
                  })}
                />
                {errors.duration && (
                  <span className="course-error">
                    {errors.duration.message}
                  </span>
                )}
              </div>

              <div className="course-form-group">
                <label className="course-label">Price</label>
                <div className="course-price-input-wrapper">
                  <span className="course-currency">₹</span>
                  <input
                    placeholder="Enter 0 to make it free."
                    type="number"
                    step="1"
                    className={`course-input course-price-input ${
                      errors.price ? "error" : ""
                    }`}
                    {...register("price", {
                      required: "Price is required",
                      min: { value: 0, message: "Price must be positive" },
                    })}
                  />
                </div>
                {errors.price && (
                  <span className="course-error">{errors.price.message}</span>
                )}
              </div>
            </div>
          )}
          {successMsg && (
            <div style={{ color: "#2EFF2E", textAlign: "center" }}>
              {successMsg}
              <Link
                style={{ color: "#fff", textDecoration: "underline" }}
                href="/educator/courses"
              >
                Go to Courses
              </Link>
            </div>
          )}
          <div className="course-actions">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="course-btn course-btn-secondary"
                disabled={isSubmitting}
              >
                Previous
              </button>
            )}

            {currentStep < 2 ? (
              <button
                type="button"
                onClick={nextStep}
                className="course-btn course-btn-primary"
              >
                Next
              </button>
            ) : (
              <div className="course-submit-actions">
                <button
                  type="submit"
                  className="course-btn course-btn-publish"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Create"}
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseCreation;
