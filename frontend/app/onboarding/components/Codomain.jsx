"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Search, FolderOpen } from "lucide-react";
import "./Codomain.css";

import { filters, areasOfInterest } from "../data/codomain";

const Codomain = ({ onNext, onBack }) => {
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const handleAreaToggle = (areaId) => {
    setSelectedAreas((prev) =>
      prev.includes(areaId)
        ? prev.filter((id) => id !== areaId)
        : [...prev, areaId]
    );
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const filteredAreas = areasOfInterest.filter((area) => {
    const matchesFilter =
      activeFilter === "All" || area.category === activeFilter.toLowerCase();
    const matchesSearch =
      area.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      area.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="codomain-container">
      <div className="codomain-card">
        {/* Header */}
        <div className="codomain-header">
          <div className="codomain-breadcrumb">
            <FolderOpen size={16} />
            <span>Engineering</span>
            <button className="codomain-change-btn" onClick={onBack}>
              Change
            </button>
          </div>
          <div className="codomain-search">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search subdomains..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Title and Subtitle */}
        <h1 className="codomain-title">Select Your Areas of Interest</h1>
        <p className="codomain-subtitle">
          Choose one or more subdomains to focus your learning journey
        </p>

        {/* Filter Tabs */}
        <div className="codomain-filters">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`codomain-filter ${
                activeFilter === filter ? "codomain-filter-active" : ""
              }`}
              onClick={() => handleFilterChange(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Areas Grid */}
        <div style={{display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center"}}>
          {filteredAreas.map((area) => {
            const IconComponent = area.icon;
            const isSelected = selectedAreas.includes(area.id);
            return (
              <div
                key={area.id}
                className={`codomain-area ${
                  isSelected ? "codomain-area-selected" : ""
                }`}
                onClick={() => handleAreaToggle(area.id)}
              >
                <div className="codomain-area-icon">
                  <IconComponent size={24} />
                </div>
                <h3 className="codomain-area-title">{area.title}</h3>
                <p className="codomain-area-description">
                  {area.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="codomain-navigation">
          <button className="codomain-back-button" onClick={onBack}>
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <div className="codomain-selected-count">
            Selected: {selectedAreas.length} / {areasOfInterest.length}
          </div>
          <button
            className={`codomain-continue-button ${
              selectedAreas.length > 0
                ? "codomain-continue-button-active"
                : ""
            }`}
            onClick={onNext}
            disabled={selectedAreas.length === 0}
          >
            <span>Continue</span>
            <ArrowRight size={20} className="codomain-button-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Codomain;
