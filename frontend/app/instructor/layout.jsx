import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Tabs from "../../components/Tabs";
import "./layout.css";
import {
  HomeIcon,
  BookmarkFilledIcon,
  StarIcon,
  GridIcon,
  PlusIcon
} from '@radix-ui/react-icons';
import { FaTowerCell } from "react-icons/fa6";

export const metadata = {
  title: "Plecos",
  description: "A learning platform.",
};

const sidebarLinks = [
  { to: '/instructor', icon: <HomeIcon width={20} height={20} />, label: 'Home' },
  { to: '/instructor/courses', icon: <BookmarkFilledIcon width={20} height={20} />, label: 'Courses' },
  { to: '/instructor/live', icon: <FaTowerCell width={20} height={20} />, label: 'Live' },
  { to: '/instructor/analytics', icon: <GridIcon width={20} height={20} />, label: 'Analytics' },
  { to: '/instructor/tools', icon: <StarIcon width={20} height={20} />, label: 'Tools' },
  { to: '/instructor/create', icon: <PlusIcon width={48} height={48} />, label: 'Create' },
];

const iFier = {
  identifier: "edu",
  model: [
    { to: '/instructor/create/video', label: 'Video' },
    { to: '/instructor/create/short', label: 'Short' },
    { to: '/instructor/create/course', label: 'Course' },
  ]
}; // This can be used to conditionally render links
export default function InstructorLayout({ children }) {
  return (
    <div className="le-m">
      <Header title="Instructor Dashboard" roleTarget="/" />
      <div className="le-c">
        <Tabs sidebarLinks={sidebarLinks} iFier={iFier} />
        <main className="le-mc">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
