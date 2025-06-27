"use client"

import React, { useState } from 'react';
import { 
  Database, 
  Building, 
  Wrench, 
  Zap, 
  Code, 
  Bot, 
  Plane, 
  Heart, 
  FlaskConical,
  ArrowLeft,
  ArrowRight,
  Search,
  FolderOpen
} from 'lucide-react';
import './AreasOfInterestSelector.css';

const AreasOfInterestSelector = ({onNext, onBack}) => {
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filters = ['All', 'Popular', 'Emerging', 'Traditional'];

  const areasOfInterest = [
    {
      id: 'data-science',
      title: 'Data Science',
      description: 'Analyze and interpret complex data sets',
      icon: Database,
      category: 'emerging'
    },
    {
      id: 'civil-engineering',
      title: 'Civil Engineering',
      description: 'Design and build infrastructure',
      icon: Building,
      category: 'traditional'
    },
    {
      id: 'mechanical-engineering',
      title: 'Mechanical Engineering',
      description: 'Create and optimize machines',
      icon: Wrench,
      category: 'traditional'
    },
    {
      id: 'electrical-engineering',
      title: 'Electrical Engineering',
      description: 'Work with power and electronics',
      icon: Zap,
      category: 'popular'
    },
    {
      id: 'software-engineering',
      title: 'Software Engineering',
      description: 'Build digital solutions',
      icon: Code,
      category: 'popular'
    },
    {
      id: 'robotics',
      title: 'Robotics',
      description: 'Design autonomous systems',
      icon: Bot,
      category: 'emerging'
    },
    {
      id: 'aerospace',
      title: 'Aerospace',
      description: 'Pioneer flight and space tech',
      icon: Plane,
      category: 'traditional'
    },
    {
      id: 'biomedical',
      title: 'Biomedical',
      description: 'Advance medical technology',
      icon: Heart,
      category: 'emerging'
    },
    {
      id: 'chemical-engineering',
      title: 'Chemical Engineering',
      description: 'Transform materials and energy',
      icon: FlaskConical,
      category: 'traditional'
    }
  ];

  const handleAreaToggle = (areaId) => {
    setSelectedAreas(prev => 
      prev.includes(areaId) 
        ? prev.filter(id => id !== areaId)
        : [...prev, areaId]
    );
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleBack = () => {
    alert('Going back to previous step');
  };

  const handleContinue = () => {
    if (selectedAreas.length > 0) {
      alert(`Continuing with ${selectedAreas.length} selected areas: ${selectedAreas.join(', ')}`);
    }
  };

  const filteredAreas = areasOfInterest.filter(area => {
    const matchesFilter = activeFilter === 'All' || area.category === activeFilter.toLowerCase();
    const matchesSearch = area.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         area.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="areas-selector-container">
      <div className="areas-selector-card">
        {/* Header */}
        <div className="areas-selector-header">
          <div className="areas-selector-breadcrumb">
            <FolderOpen size={16} />
            <span>Engineering</span>
            <button className="areas-selector-change-btn">Change</button>
          </div>
          <div className="areas-selector-search">
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
        <h1 className="areas-selector-title">Select Your Areas of Interest</h1>
        <p className="areas-selector-subtitle">Choose one or more subdomains to focus your learning journey</p>

        {/* Filter Tabs */}
        <div className="areas-selector-filters">
          {filters.map(filter => (
            <button
              key={filter}
              className={`areas-selector-filter ${activeFilter === filter ? 'areas-selector-filter-active' : ''}`}
              onClick={() => handleFilterChange(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Areas Grid */}
        <div className="areas-selector-grid">
          {filteredAreas.map((area) => {
            const IconComponent = area.icon;
            const isSelected = selectedAreas.includes(area.id);
            return (
              <div
                key={area.id}
                className={`areas-selector-area ${isSelected ? 'areas-selector-area-selected' : ''}`}
                onClick={() => handleAreaToggle(area.id)}
              >
                <div className="areas-selector-area-icon">
                  <IconComponent size={24} />
                </div>
                <h3 className="areas-selector-area-title">{area.title}</h3>
                <p className="areas-selector-area-description">{area.description}</p>
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="areas-selector-navigation">
          <button className="areas-selector-back-button" onClick={onBack}>
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <div className="areas-selector-selected-count">
            Selected: {selectedAreas.length}/Unlimited
          </div>
          <button
            className={`areas-selector-continue-button ${selectedAreas.length > 0 ? 'areas-selector-continue-button-active' : ''}`}
            onClick={onNext}
            disabled={selectedAreas.length === 0}
          >
            <span>Continue</span>
            <ArrowRight size={20} className="areas-selector-button-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AreasOfInterestSelector;