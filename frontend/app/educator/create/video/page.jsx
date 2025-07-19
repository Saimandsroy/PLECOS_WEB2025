"use client"
import React, { useState } from 'react';
import { ChevronLeft, Play, FileVideo } from 'lucide-react';
import './page.css'

const videoLength = 60;

const UploadForm = () => {
  const [isVideoShort, setIsVideoShort] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    video: null,
    thumbnail: null,
    category: '',
    tags: '',
    title: '',
    description: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field, file) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const nextStep = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Video uploaded successfully!');
  };

  return (
    <div className="upload-page">
     

      <div className="upload-container">
        <h1 className="upload-title">Upload video</h1>
        <p className="upload-subtitle">Share your knowledge with the world</p>
        
        <div className="upload-content-grid">
          {/* Left Section - Video Upload (Always Visible) */}
          <div className="upload-video-section">
            <div 
              className="upload-video-area"
              onClick={() => document.getElementById('video-upload').click()}
            >
              <input 
                id="video-upload" 
                type="file" 
                accept="video/*" 
                className="upload-file-input"
                onChange={(e) => handleFileUpload('video', e.target.files[0])}
              />
              {formData.video ? (
                <video className="upload-video-preview" controls>
                  <source src={URL.createObjectURL(formData.video)} />
                </video>
              ) : (
                <div className="upload-video-placeholder">
                  <div className="upload-play-icon">
                    <Play size={32} fill="currentColor" />
                  </div>
                  <h3>Click to upload your video</h3>
                  <p>MP4, WebM, or AVI up to 2GB</p>
                  <small>Drag and drop your file here</small>
                </div>
              )}
            </div>
            {isVideoShort && (
              <div className="upload-video-short-toggle">
                <label htmlFor="video-short-toggle">Video is too short</label>
                <input type="checkbox" name="video-short-toggle" id="video-short-toggle" checked={isVideoShort} onChange={() => setIsVideoShort(!isVideoShort)} />
              </div>
            )}
            <div className="upload-form-group">
                  <div 
                  style={{marginTop: '1rem'}}
                    className="upload-thumbnail-area"
                    onClick={() => document.getElementById('thumbnail-upload').click()}
                  >
                    <input 
                      id="thumbnail-upload" 
                      type="file" 
                      accept="image/*" 
                      className="upload-file-input"
                      onChange={(e) => handleFileUpload('thumbnail', e.target.files[0])}
                    />
                    {formData.thumbnail ? (
                      <img 
                        src={URL.createObjectURL(formData.thumbnail)} 
                        alt="Thumbnail preview" 
                        className="upload-thumbnail-preview" 
                      />
                    ) : (
                      <div className="upload-thumbnail-placeholder">
                        <FileVideo size={48} className="upload-thumbnail-icon" />
                        <p>Upload thumbnail</p>
                        <small>JPG, PNG up to 5MB</small>
                      </div>
                    )}
                  </div>
                </div>

          </div>

          {/* Right Section - Changes based on step */}
          <div className="upload-right-section">
            {/* Step 1: Thumbnail and Category */}
            <div className={`upload-step-content ${currentStep === 1 ? 'active' : ''}`}>
              <div className="upload-form-section">
              <div className="upload-form-group">
                  <label className="upload-label">Video Title</label>
                  <input 
                    type="text" 
                    className="upload-input" 
                    placeholder="Enter a compelling title for your video"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                  />
                </div>
                
                <div className="upload-form-group">
                  <label className="upload-label">Select category</label>
                  <select 
                    className="upload-select" 
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                  >
                    <option value="">Choose a category</option>
                    <option value="education">Education</option>
                    <option value="technology">Technology</option>
                    <option value="science">Science</option>
                    <option value="business">Business</option>
                    <option value="arts">Arts & Design</option>
                    <option value="health">Health & Fitness</option>
                    <option value="programming">Programming</option>
                    <option value="mathematics">Mathematics</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 2: Video Details */}
            <div className={`upload-step-content ${currentStep === 2 ? 'active' : ''}`}>
              <h2 className="upload-section-title">Video Details</h2>
              <div className="upload-form-section">
                

                <div className="upload-form-group">
                  <label className="upload-label">Description</label>
                  <textarea 
                    className="upload-textarea" 
                    placeholder="Describe your video content, what viewers will learn, and any important details..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                  />
                </div>

                <div className="upload-form-group">
                  <label className="upload-label">Tags</label>
                  <div className="upload-tag-input">
                    {formData.tags.split(',').filter(tag => tag.trim()).map((tag, index) => (
                      <div key={index} className="upload-tag">
                        {tag.trim()}
                        <span 
                          className="upload-tag-remove"
                          onClick={() => {
                            const newTags = formData.tags.split(',').filter((_, i) => i !== index).join(',');
                            handleInputChange('tags', newTags);
                          }}
                        >
                          ×
                        </span>
                      </div>
                    ))}
                    <input 
                    style={{color: 'transparent'}}
                      type="text" 
                      placeholder="Add tags separated by commas"
                      value={formData.tags}
                      onChange={(e) => handleInputChange('tags', e.target.value)}
                    />
                  </div>
                  <small style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                    Add relevant tags to help people discover your video
                  </small>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="upload-actions">
              {currentStep > 1 ? (
                <button className="upload-back-btn" onClick={prevStep}>
                  <ChevronLeft size={20} />
                  Back
                </button>
              ) : (
                <div />
              )}

              {currentStep < 2 ? (
                <button 
                  className="upload-next-btn" 
                  onClick={nextStep}
                  disabled={!formData.video}
                >
                  Next Step
                </button>
              ) : (
                <button 
                  className="upload-submit-btn" 
                  onClick={handleSubmit}
                  disabled={!formData.title.trim()}
                >
                  Publish Video
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadForm;