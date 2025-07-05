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
  { to: '/educator', icon: <HomeIcon width={20} height={20} />, label: 'Home' },
  { to: '/educator/courses', icon: <BookmarkFilledIcon width={20} height={20} />, label: 'Courses' },
  { to: '/educator/live', icon: <FaTowerCell width={20} height={20} />, label: 'Live' },
  { to: '/educator/analytics', icon: <GridIcon width={20} height={20} />, label: 'Analytics' },
  { to: '/educator/tools', icon: <StarIcon width={20} height={20} />, label: 'Tools' },
  { to: '/educator/create', icon: <PlusIcon width={48} height={48} />, label: 'Create' },
];

const iFier = {
  identifier: "edu",
  model: [
    { to: '/educator/create/video', label: 'Video' },
    { to: '/educator/create/short', label: 'Short' },
    { to: '/educator/create/course', label: 'Course' },
  ]
}; // This can be used to conditionally render links
export default function educatorLayout({ children }) {
  return (
    <div className="le-m">
      <Header title="Educator Dashboard" roleTarget="/" />
      <div className="le-c">
        <Tabs sidebarLinks={sidebarLinks} iFier={iFier} />
        <main className="le-mc">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
