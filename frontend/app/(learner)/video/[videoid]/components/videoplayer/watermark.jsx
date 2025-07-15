import React, { useEffect, useState } from 'react';
import './watermark.css';
const cornerClasses = [
  'watermark-top-left',
  'watermark-top-right',
  'watermark-bottom-left',
  'watermark-bottom-right'
];

function Watermark() {
  const [corner, setCorner] = useState(cornerClasses[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCorner(prev => {
        let next;
        do {
          next = cornerClasses[Math.floor(Math.random() * cornerClasses.length)];
        } while (next === prev); // Ensure it moves to a different corner
        return next;
      });
    }, 30000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <img
      src="/logos/plecos.avif"
      alt="Watermark"
      className={`player__watermark ${corner}`}
    />
  );
}

export default Watermark;