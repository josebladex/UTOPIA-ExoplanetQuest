"use client";

import { Hero } from "./_components/hero";
import { FaGithub, FaLinkedin, FaProjectDiagram } from "react-icons/fa";

import { IconHome } from "@tabler/icons-react";
import { FaInfoCircle } from "react-icons/fa";
import { IoDocumentAttach } from "react-icons/io5";
import { FloatingDock } from "@/components/ui/floating-dock";
import { FaPaypal } from "react-icons/fa6";
import { Bitcoin } from "lucide-react";
const links = [

  {
    title: "Github",
    icon: <FaGithub className="h-full w-full text-red-700" />,
    href: "https://github.com/josebladex/UTOPIA-ExoplanetQuest",
  },
  {
    title: "LinkedIn",
    icon: <FaLinkedin className="h-full w-full text-red-700" />,
    href: "https://www.linkedin.com/in/jose-luis-plata-zabala",
  },
  {
    title: "Resume",
    icon: <IoDocumentAttach className="h-full w-full text-red-700" />,
    href: "https://drive.google.com/file/d/1j6lr3R-awO9oJ6A_qT3o_IxCANyJmc0b/view?usp=sharing",
  },
  {
    title: "Invite me a Coffee!",
    icon: <FaPaypal className="h-full w-full text-red-700" />,
    href: "https://www.paypal.com/donate/?hosted_button_id=Q95SWXH9EVC7E",
  },
];

export default function Home() {
  const dock = links;

  return (
    <div className="max-w-7xl w-full">
      <div className="w-full h-full absolute left-0 top-0">
        <Hero />
      </div>
      <div className="absolute w-full flex " style={{ zIndex: 100 }}>
        <FloatingDock
          items={dock}
          desktopClassName="max-md:flex-col max-md:items-start items-center justify-center max-md:justify-start"
        />
      </div>
    </div>
  );
}
