import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Tabs from "../../components/Tabs";
import "./layout.css";
import { HomeIcon, BookmarkFilledIcon, VideoIcon, StarIcon, ArchiveIcon, BellIcon } from '@radix-ui/react-icons'
export const metadata = {
  title: "Plecos",
  description: "A learning plateform.",
};

const sidebarLinks = [
  { to: '/', icon: <HomeIcon width={20} height={20} />, label: 'Home' },
  { to: '/courses', icon: <BookmarkFilledIcon width={20} height={20} />, label: 'Courses' },
  { to: '/shorts', icon: <VideoIcon width={20} height={20} />, label: 'Shorts' },
  // { to: '/explore', icon: <StarIcon width={20} height={20} />, label: 'Explore' },
  { to: '/misc', icon: <BellIcon width={20} height={20} />, label: 'Misc' },
  { to: '/my-section', icon: <ArchiveIcon width={20} height={20} />, label: 'Me' },
]

const homeActivePaths = ["/profile", "/video"]
export default function RootLayout({ children }) {
  const title = "Learner Dashboard";

  return (
    <div className="le-m">
      <Header />
      <div className="le-c">
        <Tabs sidebarLinks={sidebarLinks} homePath="/" homeActivePaths={homeActivePaths} roleTarget="/educator" title="Learner" />
        <main className="le-mc">{children}</main>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
