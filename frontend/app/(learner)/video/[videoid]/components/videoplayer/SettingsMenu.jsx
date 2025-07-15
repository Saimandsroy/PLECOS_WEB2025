import React from 'react';
import { ChevronRight,ChevronLeft } from 'lucide-react';
import './SettingsMenu.css';

const SettingsMenu = ({
  visible,
  screen,
  setScreen,
  playbackSpeed,
  changePlaybackSpeed,
  quality,
  setQuality,
  availableQualities = [],
  showCaptions,
  setShowCaptions,
  currentLevelLabel,
}) => {
  if (!visible) return null;

  const renderMain = () => (
    <>
      <div className="settings-item" onClick={() => setScreen('speed')}>
        <div className="settings-label">Playback Speed</div>
        <div className="settings-value">
          {playbackSpeed}x <ChevronRight size={16} />
        </div>
      </div>

      <div className="settings-item" onClick={() => setScreen('quality')}>
        <div className="settings-label">Quality</div>
        <div className="settings-value">
          {quality === -1
            ? `Auto (${currentLevelLabel})`
            : availableQualities.find((q) => q.index === quality)?.label}{' '}
          <ChevronRight size={16} />
        </div>
      </div>

      <div className="settings-checkbox">
        <input
          type="checkbox"
          checked={showCaptions}
          onChange={() => setShowCaptions(!showCaptions)}
        />
        Captions
      </div>
    </>
  );

  const renderSpeed = () => (
    <>
      <div className="settings-back" onClick={() => setScreen('main')}>
        <ChevronLeft size={16}/> Back
      </div>
      {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((speed) => (
        <div
          key={speed}
          className="settings-subitem"
          onClick={() => {
            changePlaybackSpeed(speed);
            setScreen('main');
          }}
        >
          <span>{speed}x</span>
          {speed === playbackSpeed && <span className="checkmark">✓</span>}
        </div>
      ))}
    </>
  );

  const renderQuality = () => (
    <>
      <div className="settings-back" onClick={() => setScreen('main')}>
        <ChevronLeft size={16}/>Back
      </div>
      {availableQualities.map((q) => (
        <div
          key={q.index}
          className="settings-subitem"
          onClick={() => {
            setQuality(q.index);
            setScreen('main');
          }}
        >
          <span>
  {q.index === -1 
    ? `Auto (${availableQualities.find(q => q.label === currentLevelLabel)?.label || currentLevelLabel})` 
    : q.label}
</span>
          {q.index === quality && <span className="checkmark">✓</span>}
        </div>
      ))}
    </>
  );

  return (
    <div className="player__settingsMenu player__settingsMenu__visible">
      {screen === 'main' && renderMain()}
      {screen === 'speed' && renderSpeed()}
      {screen === 'quality' && renderQuality()}
    </div>
  );
};

export default SettingsMenu;