import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Tabs from "../../components/Tabs";
import "./layout.css"; 
import { HomeIcon, BookmarkFilledIcon, VideoIcon, StarIcon, ArchiveIcon } from '@radix-ui/react-icons'
import RoleSwitcher from "@/components/RoleSwitcher";
import RoleSwitcherWrapper from "@/components/RoleSwitcherWrapper";
export const metadata = {
  title: "Plecos-Course",
  description: "Course page for learning platform.",
};

const sidebarLinks = [
  { to: '/', icon: <HomeIcon width={20} height={20} />, label: 'Home' },
  // { to: '/courses', icon: <BookmarkFilledIcon width={20} height={20} />, label: 'Courses' },
  { to: '/shorts', icon: <VideoIcon width={20} height={20} />, label: 'Shorts' },
  { to: '/explore', icon: <StarIcon width={20} height={20} />, label: 'Explore' },
  { to: '/my-section', icon: <ArchiveIcon width={20} height={20} />, label: 'You' },
]

export default function RootLayout({ children }) {
  const title = "Courses";

  return (
    <div className="le-m">
      <Header title={title} roleTarget="/courses" />
      <div className="le-c">
        <Tabs sidebarLinks={sidebarLinks} />
        <main className="le-mc">{children}</main>
      </div>
      <Footer />
    </div>
  );
}