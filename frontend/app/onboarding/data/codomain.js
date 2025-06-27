import {
  Database,
  Building,
  Wrench,
  Zap,
  Code,
  Bot,
  Plane,
  Heart,
  FlaskConical,
} from "lucide-react";

export const areasOfInterest = [
  {
    id: "data-science",
    title: "Data Science",
    description: "Analyze and interpret complex data sets",
    icon: Database,
    category: "emerging",
  },
  {
    id: "civil-engineering",
    title: "Civil Engineering",
    description: "Design and build infrastructure",
    icon: Building,
    category: "traditional",
  },
  {
    id: "mechanical-engineering",
    title: "Mechanical Engineering",
    description: "Create and optimize machines",
    icon: Wrench,
    category: "traditional",
  },
  {
    id: "electrical-engineering",
    title: "Electrical Engineering",
    description: "Work with power and electronics",
    icon: Zap,
    category: "popular",
  },
  {
    id: "software-engineering",
    title: "Software Engineering",
    description: "Build digital solutions",
    icon: Code,
    category: "popular",
  },
  {
    id: "robotics",
    title: "Robotics",
    description: "Design autonomous systems",
    icon: Bot,
    category: "emerging",
  },
  {
    id: "aerospace",
    title: "Aerospace",
    description: "Pioneer flight and space tech",
    icon: Plane,
    category: "traditional",
  },
  {
    id: "biomedical",
    title: "Biomedical",
    description: "Advance medical technology",
    icon: Heart,
    category: "emerging",
  },
  {
    id: "chemical-engineering",
    title: "Chemical Engineering",
    description: "Transform materials and energy",
    icon: FlaskConical,
    category: "traditional",
  },
];

export const filters = ["All", "Popular", "Emerging", "Traditional"];