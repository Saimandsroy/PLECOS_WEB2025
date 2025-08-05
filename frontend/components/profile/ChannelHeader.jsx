import React from "react";
import "./ChannelHeader.css";
// --- Helper Components & SVGs ---

// Verified Badge SVG
const VerifiedBadge = () => (
  <svg
    className="channel-header__verified-badge"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Verified"
  >
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.03 15.43l-4.24-4.24 1.41-1.41 2.83 2.83 5.66-5.66 1.41 1.41-7.07 7.07z"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);

// External Link & Stat Icons
const Icon = ({ type }) => {
  const icons = {
    linkedin: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
    portfolio: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-12c-1.104 0-2 .896-2 2v16c0 1.104.896 2 2 2h12c1.104 0 2-.896 2-2v-16c0-1.104-.896-2-2-2zm-11 17v-11h3v11h-3zm5 0v-5h3v5h-3zm0-7v-4h3v4h-3z" />
      </svg>
    ),
    github: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    learners: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.5 10c.3 0 .5-.2.5-.5v-2c0-.3-.2-.5-.5-.5h-1c-.3 0-.5.2-.5.5v2c0 .3.2.5.5.5h1zm-5 0c.3 0 .5-.2.5-.5v-2c0-.3-.2-.5-.5-.5h-1c-.3 0-.5.2-.5.5v2c0 .3.2.5.5.5h1zm-5 0c.3 0 .5-.2.5-.5v-2c0-.3-.2-.5-.5-.5h-1c-.3 0-.5.2-.5.5v2c0 .3.2.5.5.5h1zm10.5 2h-13c-.8 0-1.5.7-1.5 1.5v.5h16v-.5c0-.8-.7-1.5-1.5-1.5zm-3.4-6.4c0-2-1.6-3.6-3.6-3.6s-3.6 1.6-3.6 3.6c0 .4.1.8.2 1.2.5.8 1.4 1.8 2.6 3.1.1.1.2.2.3.2s.2-.1.3-.2c1.2-1.2 2.1-2.3 2.6-3.1.1-.4.2-.8.2-1.2z" />
      </svg>
    ),
    views: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
      </svg>
    ),
    impact: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ),
    achievement: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-7 11l-4-4 1.41-1.41L12 13.17l4.59-4.58L18 10l-6 6z" />
      </svg>
    ),
  };
  return <span className="icon">{icons[type]}</span>;
};

// --- Main ChannelHeader Component ---

const ChannelHeader = ({
  name,
  username,
  isVerified,
  profileImage,
  bannerImage,
  subject,
  level,
  qualification,
  bio,
  externalLinks,
  impactRate,
  totalViews,
  totalLearners,
  achievements,
}) => {
  const formatStatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}m`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num;
  };

  return (
    <header
      className="channel-header"
      style={{ "--banner-image": `url(${bannerImage})` }}
    >
      <div className="channel-header__content">
        <div className="channel-header__top-section">
          <img
            src={profileImage}
            alt={`${name}'s profile`}
            className="channel-header__profile-image"
          />
          <div className="channel-header__info">
            <div className="channel-header__identity">
              <h1 className="channel-header__name">{name}</h1>
              {isVerified && <VerifiedBadge />}
            </div>
            <p className="channel-header__username">@{username}</p>
            <p className="channel-header__role">
              <span>{subject}</span> &ndash; Instructor Level {level}
            </p>
            {qualification && (
              <p className="channel-header__qualification">{qualification}</p>
            )}
          </div>
        </div>

        <div className="channel-header__bottom-section">
          <p className="channel-header__bio">{bio}</p>

          {externalLinks && (
            <div className="channel-header__external-links">
              {Object.entries(externalLinks).map(
                ([key, value]) =>
                  value && (
                    <a
                      href={value}
                      key={key}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="channel-header__external-link"
                    >
                      <Icon type={key} />
                      <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                    </a>
                  )
              )}
            </div>
          )}

          <div className="channel-header__stats">
            <span className="channel-header__stat-item">
              <Icon type="learners" />
              <strong>{formatStatNumber(totalLearners)}</strong> learners
            </span>
            <span className="channel-header__stat-item">
              <Icon type="views" />
              <strong>{formatStatNumber(totalViews)}</strong> views
            </span>
            <span className="channel-header__stat-item">
              <Icon type="impact" />
              <strong>{impactRate}%</strong> Impact
            </span>
          </div>

          {achievements && achievements.length > 0 && (
            <div className="channel-header__achievements">
              {/* <h2 className="channel-header__achievements-title">
                Achievements
              </h2> */}
              <div className="channel-header__achievements-list">
                {achievements.map((ach, index) => (
                  <div key={index} className="channel-header__achievement-pill">
                    <Icon type="achievement" />
                    <span>{ach.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

// // --- Prop Type Definitions ---

// ChannelHeader.propTypes = {
//   name: PropTypes.string.isRequired,
//   username: PropTypes.string.isRequired,
//   isVerified: PropTypes.bool,
//   profileImage: PropTypes.string.isRequired,
//   bannerImage: PropTypes.string.isRequired,
//   subject: PropTypes.string.isRequired,
//   level: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//   qualification: PropTypes.string,
//   bio: PropTypes.string,
//   externalLinks: PropTypes.shape({
//     linkedin: PropTypes.string,
//     portfolio: PropTypes.string,
//     github: PropTypes.string,
//   }),
//   impactRate: PropTypes.number,
//   totalViews: PropTypes.number,
//   totalLearners: PropTypes.number,
//   achievements: PropTypes.arrayOf(
//     PropTypes.shape({
//       name: PropTypes.string.isRequired,
//     })
//   ),
// };

// ChannelHeader.defaultProps = {
//   isVerified: false,
//   qualification: "",
//   bio: "",
//   externalLinks: {},
//   impactRate: 0,
//   totalViews: 0,
//   totalLearners: 0,
//   achievements: [],
// };
export default ChannelHeader;
