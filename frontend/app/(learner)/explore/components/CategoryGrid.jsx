'use client';
import { BookOpen } from 'lucide-react';
import './CategoryGrid.css';

export default function CategoryGrid({ categories }) {
  return (
    <section className="explore-category">
      <h2 className="explore-category__title">
        <BookOpen size={28} />
        Popular Categories
      </h2>
      <div className="explore-category__grid">
        {categories.map((category, index) => (
          <div key={index} className="explore-category__card">
            <div className="explore-category__icon">{category.icon}</div>
            <h3 className="explore-category__name">{category.name}</h3>
            <p className="explore-category__count">{category.count}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
