import CategoryGrid from './components/CategoryGrid';
import InstructorGrid from './components/InstructorGrid';
import CourseGrid from './components/CourseGrid';
import ShortsGrid from './components/ShortsGrid';
import './page.css';
import HeaderWrapper from './components/HeaderWrapper';
import SearchBarWrapper from './components/SearchBarWrapper';
import FilterTabWrapper from './components/FilterTabWrapper';

export default function ExplorePage() {
  
  const categories = [
    { name: 'Programming', icon: '💻', count: '245 courses' },
    { name: 'Mathematics', icon: '📐', count: '189 courses' },
    { name: 'Science', icon: '🔬', count: '156 courses' },
    { name: 'Language', icon: '🗣', count: '134 courses' },
    { name: 'Business', icon: '💼', count: '98 courses' },
    { name: 'Design', icon: '🎨', count: '87 courses' }
  ];
  


  return (
    <div className="explore-page">
      <HeaderWrapper/>
      <SearchBarWrapper/>
      <FilterTabWrapper/>
      <CategoryGrid categories={categories} />
      <InstructorGrid />
      <CourseGrid />
      <ShortsGrid />
    </div>
  );
}
