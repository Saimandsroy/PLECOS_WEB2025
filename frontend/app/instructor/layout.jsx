import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Tabs from "../../components/Tabs";
import "./layout.css";
import { HomeIcon, BookmarkFilledIcon, VideoIcon, StarIcon, LineHeightIcon, GridIcon } from '@radix-ui/react-icons'

export const metadata = {
  title: "Plecos",
  description: "A learning plateform.",
};

const sidebarLinks = [
  { to: '/instructor', icon: <HomeIcon width={20} height={20} />, label: 'Home' },
  { to: '/instructor/courses', icon: <BookmarkFilledIcon width={20} height={20} />, label: 'Courses' },
  { to: '/instructor/shorts', icon: <VideoIcon width={20} height={20} />, label: 'Shorts' },
  { to: '/instructor/live', icon: <LineHeightIcon width={20} height={20} />, label: 'Go Live' },
  { to: '/instructor/analytics', icon: <GridIcon width={20} height={20} />, label: 'Analytics' },
  { to: '/instructor/tools', icon: <StarIcon width={20} height={20} />, label: 'Tools' },
]

export default function InstructorLayout({ children }) {
  const buttonLink = '/';
  return (
    <div className="le-m">
      <Header title="Instructor Dashboard" buttonTitle="Switch to Learner" buttonLink={buttonLink} />
      <div className="le-c">
        <Tabs sidebarLinks={sidebarLinks}/>
        <main className="le-mc">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
