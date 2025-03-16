import React from "react";
import { FaReact } from "react-icons/fa";
import NZTW from "@/public/NZTW.png";
import Blog from "@/public/blog.png";
import LDP from "@/public/LDP.png";
import { CgWorkAlt } from "react-icons/cg";
import { LuGraduationCap } from "react-icons/lu";
import { FaRss } from "react-icons/fa6";
import corpcommentImg from "@/public/corpcomment.png";
import rmtdevImg from "@/public/rmtdev.png";
import wordanalyticsImg from "@/public/wordanalytics.png";

export const links = [
    {
        name: "Home",
        hash: "#home",
        name_zh: "首页",
    },
    {
        name: "About",
        hash: "#about",
        name_zh: "关于",
    },
    {
        name: "Projects",
        hash: "#projects",
        name_zh: "项目",
    },
    {
        name: "Skills",
        hash: "#skills",
        name_zh: "技能",
    },
    {
        name: "Subscribe",
        hash: "#subscribe",
        name_zh: "订阅",
    },
    // {
    //     name: "Experience",
    //     hash: "#experience",
    // },
    // {
    //     name: "Contact",
    //     hash: "#contact",
    // },
] as const;

export const headerLanguageMap = {
    Home: '首页',
    About: '关于我',
    Projects: '我的项目',
    Skills: '我的技能',
    Subscribe: '订阅',
}

export type ProjectTags = typeof projectsData[number]["tags"];

export const projectsData = [
    {
        title: "Jaden's Blog",
        title_zh: "Jaden's Blog",
        description:
            `Welcome to my personal blog, where I will be sharing my code and articles. Feel free to explore and enjoy your visit! 
            `,
        desc_zh: "这是我的个人博客，我将在这里发布我的代码和文章，欢迎访问。",
        tags: ["Web", "Halo", "Blog"],
        imageUrl: Blog,
        projectUrl: 'https://github.com/chengzhongxue/halo-theme-hao',
        demoUrl: 'https://www.jadenlisblog.com',
    },
    {
        title: "NZ Travel Website",
        title_zh: '新西兰旅游网站',
        description:
            "a website that uses React to display scenic spots about New Zealand.",
        desc_zh: "用React制作的新西兰旅游景点网站",
        tags: ["React", "MySQL", "Javascript"],
        imageUrl: NZTW,
        projectUrl: 'https://github.com/JadenLi613/NZ-Travel-Website',
        demoUrl: '',
    },
    {
        title: "Loan Default Prediction",
        title_zh: '贷款违约预测',
        description:
            "Loan Default Prediction with AI Machine Learning.",
        desc_zh: "人工智能机器学习的贷款违约预测",
        tags: ["Python", "Machine Learning", "AI"],
        imageUrl: LDP,
        projectUrl: 'https://github.com/JadenLi613/Loan-Default-Prediction/tree/main',
        demoUrl: '',
    },
]

export const skillsData = [
    "HTML",
    "CSS",
    "Python",
    "Web",
    "Git",
    "Github",
    "AWS",
    "Scratch",
    "JavaScript",
] 
