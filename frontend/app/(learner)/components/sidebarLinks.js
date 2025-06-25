import {
  HomeIcon,
  BookmarkFilledIcon,
  VideoIcon,
  StarIcon,
  ArchiveIcon,
} from "@radix-ui/react-icons";

const sidebarLinks = [
  {
    to: "/learner/Home",
    icon: <HomeIcon width={20} height={20} />,
    label: "Home",
  },
  {
    to: "/learner/courses",
    icon: <BookmarkFilledIcon width={20} height={20} />,
    label: "Courses",
  },
  {
    to: "/learner/shorts",
    icon: <VideoIcon width={20} height={20} />,
    label: "Shorts",
  },
  {
    to: "/learner/explore",
    icon: <StarIcon width={20} height={20} />,
    label: "Explore",
  },
  {
    to: "/learner/my-sec",
    icon: <ArchiveIcon width={20} height={20} />,
    label: "My Sec",
  },
];
