// import {  HiOutlineCog } from "react-icons/hi";
import { MdAdfScanner, MdSpaceDashboard } from "react-icons/md";
import { FaRegFileWord } from "react-icons/fa6";
import { FaRegFilePdf } from "react-icons/fa";
import { FaRegFileExcel } from "react-icons/fa6";
import { AiOutlineFilePpt } from "react-icons/ai";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/",
    icon: <MdSpaceDashboard />,
  },
  {
    key: "scan",
    label: "Scan",
    path: "/scan-dokumen",
    icon: <MdAdfScanner />,
  },
  {
    key: "pdf",
    label: "PDF",
    path: "/pdf-page",
    icon: <FaRegFilePdf />,
  },
  {
    key: "word",
    label: "Ms Word",
    path: "/word-page",
    icon: <FaRegFileWord />,
  },
  {
    key: "excel",
    label: "Ms Excel",
    path: "/excel-page",
    icon: <FaRegFileExcel />,
  },
  {
    key: "ppt",
    label: "Power Point",
    path: "/ppt-page",
    icon: <AiOutlineFilePpt />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  // {
  //   key: "settings",
  //   label: "Settings",
  //   path: "/settings",
  //   icon: <HiOutlineCog />,
  // },
];
