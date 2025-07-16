'use client';
import { Video, Play } from 'lucide-react';
import './ShortsGrid.css';

const trendingShorts = [
  {
    id: 1,
    title: 'Quick History Fact',
    views: '2.1K',
    duration: '0:58',
    thumbnail: '🏛',
    category: 'History'
  },
  {
    id: 2,
    title: '5-Minute Python Tip',
    views: '4.8K',
    duration: '1:32',
    thumbnail: '💡',
    category: 'Programming'
  },
  {
    id: 3,
    title: 'Math Trick Explained',
    views: '3.2K',
    duration: '1:15',
    thumbnail: '🔢',
    category: 'Mathematics'
  },
  {
    id: 4,
    title: 'Science in 60 Seconds',
    views: '5.6K',
    duration: '1:00',
    thumbnail: '🧪',
    category: 'Science'
  }
];

export default function ShortsGrid() {
  return (
    <section className="explore-shorts">
      <h2 className="explore-shorts__title">
        <Video size={28} />
        Trending Shorts
      </h2>

      <div className="explore-shorts__grid">
        {trendingShorts.map((short) => (
          <div
            key={short.id}
            className="explore-shorts__card"
          >
            <div className="explore-shorts__banner">
              <div className="explore-shorts__thumbnail">{short.thumbnail}</div>

              <div className="explore-shorts__duration">{short.duration}</div>

              <div className="explore-shorts__overlay">
                <Play size={20} color="white" fill="white" />
              </div>
            </div>

            <div className="explore-shorts__info">
              <div className="explore-shorts__meta">
                <span className="explore-shorts__category">{short.category}</span>
                <span className="explore-shorts__views">👁 {short.views}</span>
              </div>
              <h3 className="explore-shorts__title-text">{short.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
