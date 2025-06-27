"use client"

import { useState } from 'react';
import { 
  Wrench, Paintbrush, ArrowRight, Globe2
} from 'lucide-react';
import './Domain.css';

const Domain = ({onNext}) => {
  const [selectedDomain, setSelectedDomain] = useState("")

  const domains = [
    {
      id: 'engineering',
      title: 'Engineering',
      description: 'Building technology and infrastructure.',
      icon: Wrench
    }, 
    {
      id: 'arts',
      title: 'Arts',
      description: 'Creative fields like painting, dance',
      icon: Paintbrush
    }, 
    {
      id: 'languages',
      title: 'Languages',
      description: 'Learn languages like Spanish, Italian',
      icon: Globe2
    }, 
  ];

  const handleContinue = () => {
    alert("continue")
  };

  const handleSelect = (domainId) => {
    if(selectedDomain === domainId) {
      setSelectedDomain("")
      return
    }
    setSelectedDomain(domainId)
  }
  return (
    <div className="domain-container">
      <div className="domain-card">

        <h1 className="domain-title">Select Your Domain of Interest</h1>
        <p className="domain-subtitle">You can choose only one domain you want to study.</p>

        <div className="domain-grid">
          {domains.map((domain) => {
            const IconComponent = domain.icon;
            const isSelected = selectedDomain.includes(domain.id);
            return (
              <div
                key={domain.id}
                className={`domain-area ${isSelected ? 'domain-area-selected' : ''}`}
                onClick={() => handleSelect(domain.id)}
              >
                <div className="domain-area-icon">
                  <IconComponent size={24} />
                </div>
                <h3 className="domain-area-title">{domain.title}</h3>
                <p className="domain-area-description">{domain.description}</p>
              </div>
            );
          })}
        </div>
        
        <div className="domain-navigation">
          <button
            className={`domain-continue-button ${selectedDomain.length > 0 ? 'domain-continue-button-active' : ''}`}
            onClick={onNext}
            disabled={selectedDomain.length === 0}
          >
            <span>Continue</span>
            <ArrowRight size={20} className="domain-button-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Domain;