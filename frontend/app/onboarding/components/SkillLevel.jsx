"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import "./SkillLevel.css";
import { useRouter } from "next/navigation";
import { skillLevels } from "../data/skill-level";

const SkillLevel = () => {
  const router = useRouter();
  const [selectedLevel, setSelectedLevel] = useState("");

  const handleLevelSelect = (levelId) => {
    setSelectedLevel(levelId);
  };

  const handleContinue = () => {
    if (selectedLevel) {
      router.push("/");
      return;
    }
  };

  return (
    <div className="skill-selector-container">
      <div className="skill-selector-card">
        <h1 className="skill-selector-title">Choose Your Skill Level</h1>
        <p className="skill-selector-subtitle">
          Select the level that best matches your current expertise
        </p>

        <div className="skill-selector-options-container">
          {skillLevels.map((level) => {
            const IconComponent = level.icon;
            return (
              <div
                key={level.id}
                className={`skill-selector-option ${
                  selectedLevel === level.id
                    ? "skill-selector-option-selected"
                    : ""
                }`}
                onClick={() => handleLevelSelect(level.id)}
              >
                <div className="skill-selector-option-header">
                  <div className="skill-selector-option-icon">
                    <IconComponent size={24} />
                  </div>
                  <h3 className="skill-selector-option-title">{level.title}</h3>
                </div>
                <p className="skill-selector-option-description">
                  {level.description}
                </p>
              </div>
            );
          })}
        </div>

        <button
          className={`skill-selector-continue-button ${
            selectedLevel ? "skill-selector-continue-button-active" : ""
          }`}
          onClick={handleContinue}
          disabled={!selectedLevel}
        >
          <span>Continue to Next Step</span>
          <ArrowRight size={20} className="skill-selector-button-icon" />
        </button>
      </div>
    </div>
  );
};

export default SkillLevel;
