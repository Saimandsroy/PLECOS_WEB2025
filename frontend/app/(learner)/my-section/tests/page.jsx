"use client"
import React, { useState } from 'react';
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import './Tests.css'
import Tabs from './components/Tabs';
const MyTestsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const tests = [
    {
      id: 1,
      name: 'Math Test 1',
      category: 'Mathematics',
      status: 'Not Started',
      action: 'Start'
    },
    {
      id: 2,
      name: 'Science Test 2',
      category: 'Science',
      status: 'In Progress',
      action: 'Continue'
    },
    {
      id: 3,
      name: 'History Test 1',
      category: 'History',
      status: 'Completed',
      action: 'View Results'
    },
    {
      id: 4,
      name: 'English Test 1',
      category: 'English',
      status: 'Not Started',
      action: 'Start'
    },
    {
      id: 5,
      name: 'Math Test 2',
      category: 'Mathematics',
      status: 'Completed',
      action: 'View Results'
    }
  ];

  const categories = ['all', 'Mathematics', 'Science', 'History', 'English'];

  const filteredTests = tests.filter(test => {
    const statusFilter = activeTab === 'all' || 
                        (activeTab === 'in-progress' && test.status === 'In Progress') ||
                        (activeTab === 'completed' && test.status === 'Completed');
    
    const categoryFilter = selectedCategory === 'all' || test.category === selectedCategory;
    
    return statusFilter && categoryFilter;
  });

  const getStatusClass = (status) => {
    switch (status) {
      case 'Not Started':
        return 'myt-status-not-started';
      case 'In Progress':
        return 'myt-status-in-progress';
      case 'Completed':
        return 'myt-status-completed';
      default:
        return '';
    }
  };

  const getActionClass = (action) => {
    switch (action) {
      case 'Start':
        return 'myt-action-start';
      case 'Continue':
        return 'myt-action-continue';
      case 'View Results':
        return 'myt-action-view';
      default:
        return '';
    }
  };

  return (
    <div className="myt-container">
      <div className="myt-header">
        <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Link href={"/my-section"}>
          <ArrowLeftIcon />
        </Link>
        <h2 style={{ fontWeight: 600, fontSize: 24 }}>Tests</h2>
      </div>
        
        <Tabs active={activeTab} setActive={setActiveTab} />
      </div>

      <div className="myt-content">
        <div className="myt-filter-section">
          <div className="myt-filter-dropdown">
            <select 
              className="myt-filter-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">Filter by Category</option>
              {categories.filter(cat => cat !== 'all').map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <div className="myt-filter-icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="myt-table-container">
          <table className="myt-table">
            <thead>
              <tr className="myt-table-header">
                <th className="myt-table-cell myt-table-header-cell">Test Name</th>
                <th className="myt-table-cell myt-table-header-cell">Category</th>
                <th className="myt-table-cell myt-table-header-cell">Status</th>
                <th className="myt-table-cell myt-table-header-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTests.map((test) => (
                <tr key={test.id} className="myt-table-row">
                  <td className="myt-table-cell myt-test-name">{test.name}</td>
                  <td className="myt-table-cell myt-category">{test.category}</td>
                  <td className="myt-table-cell">
                    <span className={`myt-status ${getStatusClass(test.status)}`}>
                      {test.status}
                    </span>
                  </td>
                  <td className="myt-table-cell">
                    <button className={`myt-action-btn ${getActionClass(test.action)}`}>
                      {test.action}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTests.length === 0 && (
          <div className="myt-empty-state">
            <p>No tests found matching your current filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTestsPage;