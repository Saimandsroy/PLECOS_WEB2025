import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Tabs from "../../components/Tabs";
import "./layout.css";
import { HomeIcon, BookmarkFilledIcon, VideoIcon, StarIcon, ArchiveIcon } from '@radix-ui/react-icons'
const manrope = Manrope({
  subsets: ["latin"],
});

export const metadata = {
  title: "Plecos",
  description: "A learning plateform.",
};

const sidebarLinks = [
  { to: '/', icon: <HomeIcon width={20} height={20} />, label: 'Home' },
  { to: '/courses', icon: <BookmarkFilledIcon width={20} height={20} />, label: 'Courses' },
  { to: '/shorts', icon: <VideoIcon width={20} height={20} />, label: 'Shorts' },
  { to: '/explore', icon: <StarIcon width={20} height={20} />, label: 'Explore' },
  { to: '/my-section', icon: <ArchiveIcon width={20} height={20} />, label: 'You' },
]

export default function RootLayout({ children }) {
  const buttonLink = '/instructor';
  const buttonTitle = "Switch to Instructor";
  const title = "Learner Dashboard";
  return (
    <html lang="en">
      <body
        style={{ height: "100vh", overflow: "hidden" }}
        className={`${manrope.variable} antialiased`}
      >
        <div className="le-m">
          <Header title={title} buttonTitle={buttonTitle} buttonLink={buttonLink} />
          <div className="le-c">
            <Tabs sidebarLinks={sidebarLinks} />
            <main className="le-mc">{children}</main>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
