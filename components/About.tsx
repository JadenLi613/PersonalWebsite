"use client"

import React from "react"
import SectionHeading from "./SectionHeading"
import { motion, AnimatePresence } from "framer-motion"
import { useSectionInView } from "@/lib/hooks"
import { useLocale, useTranslations } from "next-intl"
import { FaGamepad, FaCode, FaBook, FaEnvelope, FaGithub, FaCamera } from "react-icons/fa6"
import { PiImage, PiTelevisionSimpleFill } from "react-icons/pi"
import { SiBilibili } from "react-icons/si"
import Link from "next/link"
import { useState } from "react"
import { FaInstagram, FaLinkedin } from "react-icons/fa"

const cardVariants = {
  initial: {
    opacity: 0,
    y: 6,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.03 * index,
      duration: 0.25,
      ease: [0.2, 0.05, 0.15, 1],
    },
  }),
}

const contentVariants = {
  initial: { 
    opacity: 0,
    y: -2,
  },
  animate: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.15,
      ease: [0.2, 0.05, 0.15, 1]
    }
  },
  exit: { 
    opacity: 0,
    y: -2,
    transition: {
      duration: 0.15,
      ease: [0.2, 0.05, 0.15, 1]
    }
  }
}

interface AboutCardProps {
  icon: React.ElementType
  content: string
  title?: string
  index: number
  className?: string
  size?: "small" | "medium" | "large"
  expandOnHover?: boolean
  aspectRatio?: "square" | "wide" | "tall"
  priority?: "high" | "medium" | "low"
  accentColor?: string
  href?: string
}

type AboutCardType = {
  type?: "image"
  icon?: React.ElementType
  image?: string
  title?: string
  content: string
  size?: "small" | "medium" | "large"
  aspectRatio?: "square" | "wide" | "tall"
  priority?: "high" | "medium" | "low"
  accentColor?: string
  expandOnHover?: boolean
  href?: string
} | {
  type: "image"
  image: string
  accentColor?: string
  content?: string  // 图片类型时 content 可选
}

const AboutCard = ({ 
  icon: Icon, 
  content,
  title,
  index, 
  className = "",
  size = "medium",
  expandOnHover = false,
  aspectRatio = "square",
  priority = "medium",
  accentColor = "pink",
  href = ""
}: AboutCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const CardWrapper = href ? (props: any) => (
    <Link href={href} target="_blank" className="cursor-pointer no-underline" {...props} />
  ) : motion.div

  const sizeClasses = {
    small: "col-span-2 sm:col-span-1 row-span-1",
    medium: "col-span-2 sm:col-span-1 row-span-1",
    large: "col-span-2 row-span-1"
  }

  const aspectRatioClasses = {
    square: "aspect-square",
    wide: "col-span-2 aspect-[2/1]",
    tall: "row-span-2"
  }

  const priorityClasses = {
    high: "bg-white/80 dark:bg-gray-800/80 border-l-4 border-l-pink dark:border-l-pink",
    medium: "bg-white/80 dark:bg-gray-800/80",
    low: "bg-white/70 dark:bg-gray-800/70"
  }

  const iconSizeClasses = {
    small: "w-7 h-7 sm:w-8 sm:h-8",
    medium: "w-7 h-7 sm:w-8 sm:h-8",
    large: "w-8 h-8 sm:w-10 sm:h-10"
  }

  return (
    <CardWrapper
      {...(!href ? {
        variants: cardVariants,
        initial: "initial",
        whileInView: "animate",
        viewport: { once: true, margin: "-50px" },
        custom: index,
      } : {})}
      onMouseEnter={() => !href && setIsHovered(true)}
      onMouseLeave={() => !href && setIsHovered(false)}
      className={`
        ${priorityClasses[priority]}
        rounded-2xl p-4 sm:p-5
        shadow-[0_4px_20px_rgb(0,0,0,0.03)]
        border border-white/8 dark:border-gray-700/15
        transition-all duration-300
        backdrop-blur-md
        ${sizeClasses[size]}
        ${aspectRatioClasses[aspectRatio]}
        ${className}
        ${!href ? 'group' : ''}
        overflow-hidden
        relative
        bg-gradient-to-br from-white/90 via-white/85 to-white/80
        dark:from-gray-800/90 dark:via-gray-800/85 dark:to-gray-800/80
      `}
    >
      <div className="relative h-full flex flex-col">
        <div className={`
          flex items-center gap-4
          ${expandOnHover ? 'justify-center w-full' : ''}
          ${expandOnHover ? (isHovered ? 'h-12 mb-3' : 'h-full') : ''}
          transition-all duration-200
        `}>
          <div className={`
            bg-gradient-to-br from-${accentColor}/10 via-${accentColor}/8 to-${accentColor}/5
            dark:from-${accentColor}/20 dark:via-${accentColor}/15 dark:to-${accentColor}/10
            transition-all duration-200
            rounded-xl
            backdrop-blur-md
            ${expandOnHover ? (
              isHovered ? 'p-2.5 scale-95' : 'p-6 scale-100'
            ) : 'p-3.5'}
            group-hover:shadow-[0_4px_15px_rgb(0,0,0,0.03)]
            group-hover:border-${accentColor}/10
            border border-white/10 dark:border-white/5
          `}>
            <Icon className={`
              text-${accentColor} dark:text-${accentColor}
              transition-all duration-200
              ${expandOnHover ? (
                isHovered ? 'w-7 h-7' : 'w-12 h-12'
              ) : iconSizeClasses[size]}
              ${expandOnHover && isHovered ? 'rotate-0' : ''}
              ${expandOnHover && !isHovered ? 'hover:rotate-3' : ''}
              group-hover:filter group-hover:brightness-110
              drop-shadow-sm
            `} />
          </div>
          {title && !expandOnHover && (
            <h3 className="text-base sm:text-lg font-medium bg-gradient-to-br from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
              {title}
            </h3>
          )}
        </div>
        <AnimatePresence mode="wait">
          {(!expandOnHover || isHovered) && (
            <motion.div
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className={`
                text-gray-600/90 dark:text-gray-300/90
                ${size === "large" ? "text-sm sm:text-base" : "text-sm"}
                leading-relaxed
                ${expandOnHover ? 'text-center px-2 sm:px-3' : 'text-left'}
                overflow-hidden
              `}
            >
              {content}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </CardWrapper>
  )
}

const GithubStatsCard = ({ index }: { index: number }) => (
  <motion.div
    variants={cardVariants}
    initial="initial"
    whileInView="animate"
    viewport={{ once: true, margin: "-50px" }}
    custom={index}
    className="
      col-span-2 row-span-2
      bg-gradient-to-br from-white/90 via-white/85 to-white/80
      dark:from-gray-800/90 dark:via-gray-800/85 dark:to-gray-800/80
      rounded-2xl p-4 sm:p-5
      shadow-[0_4px_20px_rgb(0,0,0,0.03)]
      border border-white/8 dark:border-gray-700/15
      transition-all duration-300
      backdrop-blur-md
      overflow-hidden
      group
      relative
    "
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-gray-800/20 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none" />
    <div className="relative h-full flex flex-col">
      <Link 
        href="https://github.com/JadenLi613" 
        target="_blank"
        className="flex items-center gap-3 mb-4"
      >
        <div className="
          bg-gradient-to-br from-pink/10 via-pink/8 to-pink/5
          dark:from-pink/20 dark:via-pink/15 dark:to-pink/10
          p-3 rounded-xl
          transition-all duration-200
          backdrop-blur-md
          border border-white/10 dark:border-white/5
          hover:scale-105 hover:shadow-sm
        ">
          <FaGithub className="w-7 h-7 text-pink dark:text-pink transition-transform duration-200 hover:rotate-[360deg]" />
        </div>
        <span className="text-lg font-medium bg-gradient-to-br from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
          GitHub Contributions
        </span>
      </Link>
      <div className="
        flex-1
        bg-gradient-to-br from-white/95 to-white/90
        dark:from-gray-900/95 dark:to-gray-900/90
        rounded-xl
        transition-all duration-300
        overflow-hidden
        flex items-center justify-center
        relative
        border border-white/10 dark:border-white/5
      ">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),rgba(255,255,255,0))] dark:bg-[radial-gradient(circle_at_50%_120%,rgba(0,0,0,0.1),rgba(0,0,0,0))]" />
        <div className="w-full h-full p-4 sm:p-6">
          <img
            src="https://raw.githubusercontent.com/Mystic-Stars/Mystic-Stars/output/github-contribution-grid-snake-dark.svg"
            alt="GitHub Contribution Snake Animation"
            className="w-full h-full object-contain dark:invert dark:brightness-95 dark:contrast-125 transition-all duration-300"
          />
        </div>
      </div>
    </div>
  </motion.div>
)

const MBTICard = ({ index }: { index: number }) => {
  const activeLocale = useLocale()
  const t = useTranslations('MBTISection')
  
  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-50px" }}
      custom={index}
      className="
        col-span-2 row-span-2
        bg-gradient-to-br from-white/90 via-white/85 to-white/80
        dark:from-gray-800/90 dark:via-gray-800/85 dark:to-gray-800/80
        rounded-2xl p-4 sm:p-5
        shadow-[0_4px_20px_rgb(0,0,0,0.03)]
        border border-white/8 dark:border-gray-700/15
        transition-all duration-300
        backdrop-blur-md
        overflow-hidden
        group
        relative
      "
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-gray-800/20 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none" />
      <div className="relative h-full flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <div className="
            bg-gradient-to-br from-emerald/10 via-emerald/8 to-emerald/5
            dark:from-emerald/20 dark:via-emerald/15 dark:to-emerald/10
            p-3 rounded-xl
            transition-all duration-200
            backdrop-blur-md
            border border-white/10 dark:border-white/5
          ">
            <span className="text-lg font-bold text-emerald">ENFJ-A</span>
          </div>
          <span className="text-lg font-medium bg-gradient-to-br from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
            {activeLocale === "zh" ? t("title") : "The Protagonist"}
          </span>
        </div>
        <div className="
          flex-1
          bg-gradient-to-br from-white/95 to-white/90
          dark:from-gray-900/95 dark:to-gray-900/90
          rounded-xl
          transition-all duration-300
          overflow-hidden
          relative
          border border-white/10 dark:border-white/5
          flex items-stretch
        ">
          <div className="flex-1 flex flex-col justify-center p-4 sm:p-6">
            <div className="text-sm text-gray-600 dark:text-gray-300 text-left mb-2">
              {activeLocale === "zh" ? t("personality_traits") : "Personality Traits:"}
            </div>
            <ul className="text-sm text-gray-500 dark:text-gray-400 text-left list-disc list-inside space-y-1">
              <li>{activeLocale === "zh" ? t("traits.trait1") : "Charismatic Leader"}</li>
              <li>{activeLocale === "zh" ? t("traits.trait2") : "Natural Teacher"}</li>
              <li>{activeLocale === "zh" ? t("traits.trait3") : "Empathetic"}</li>
              <li>{activeLocale === "zh" ? t("traits.trait4") : "Reliable Idealist"}</li>
            </ul>
          </div>
          <div className="absolute right-0 w-[45%] z-20 flex items-end">
            <img
              src="/enfj.svg"
              alt="ENFJ Personality"
              className="w-full object-contain transition-all duration-300"
              style={{
                transform: 'scale(0.98)',
                transformOrigin: 'bottom right'
              }}
            />
          </div>
        </div>
        <Link 
          href={activeLocale === "zh" 
            ? "https://www.16personalities.com/ch/enfj-%E4%BA%BA%E6%A0%BC"
            : "https://www.16personalities.com/enfj-personality"
          }
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-gray-500 dark:text-gray-400 mt-3 hover:text-emerald dark:hover:text-emerald transition-colors duration-200"
        >
          {activeLocale === "zh" 
            ? t("learn_more")
            : "Learn more about the Protagonist personality at 16personalities"
          }
        </Link>
      </div>
    </motion.div>
  )
}

const ImageCard = ({ index, image, accentColor = "pink" }: { index: number, image: string, accentColor?: string }) => (
  <motion.div
    variants={cardVariants}
    initial="initial"
    whileInView="animate"
    viewport={{ once: true, margin: "-50px" }}
    custom={index}
    className={`
      col-span-1 row-span-1
      aspect-square
      bg-gradient-to-br from-white/90 via-white/85 to-white/80
      dark:from-gray-800/90 dark:via-gray-800/85 dark:to-gray-800/80
      rounded-2xl
      shadow-[0_4px_20px_rgb(0,0,0,0.03)]
      border border-white/8 dark:border-gray-700/15
      transition-all duration-300
      backdrop-blur-md
      overflow-hidden
      group
    `}
  >
    <div className="relative w-full h-full">
      <img
        src={image}
        alt="Profile"
        className="w-full h-full object-cover"
      />
    </div>
  </motion.div>
)

export default function About() {
  const { ref } = useSectionInView("About")
  const t = useTranslations("AboutSection")
  const sectionLan = useTranslations("SectionName")
  const activeLocale = useLocale()

  const aboutCards: AboutCardType[] = [
    {
      icon: FaCode,
      title: activeLocale === "zh" ? "关于我" : "About Me",
      content: activeLocale === "zh" 
        ? "你好！我是一名来自奥克兰的学生开发者 👋 热爱编程与网站开发，专注于创造优雅的数字体验。熟悉 C#, Python等语言基本开发，正在努力学习更多全栈知识和AWS云服务。喜欢写自己的博客，在分享中创造价值。"
        : "Hi! I'm a student developer from Auckland 👋 Passionate about coding and web development. Familiar with C#, Python and learning full-stack development and Amazon Website Services. Love sharing through my blog.",
      size: "large" as const,
      aspectRatio: "wide" as const,
      priority: "high" as const,
      accentColor: "pink"
    },
    {
      type: "image",
        image: "/camera.jpg",
      accentColor: "pink"
    },
    {
      icon: FaCamera,
      title: "PhotoGrapher",
      content: activeLocale === "zh"
          ? "带着相机📸，我走过欧洲的神秘街道，感受中东的热土，沉浸东南亚的热带风光，也领略南半球的自然壮丽。 "
          : "With my camera📸, I’ve explored Europe’s mystery, the Middle East’s heat, Southeast Asia’s beauty, and the Southern Hemisphere’s wonders.",
      size: "medium" as const,
      aspectRatio: "square" as const,
      priority: "medium" as const,
      accentColor: "emerald"
    },
    {
      icon: PiImage,
      title: activeLocale === "zh" ? "二次元" : "Anime",
      content: activeLocale === "zh"
          ? "摄影集 🏞️ 在博客中可以找到我拍的风景照，我想通过我的眼睛，把我所看到的美丽风景与您分享。"
          : "Digital album 🏞️ Check out my landscape photo on my blog! I want to share the beautiful scenery I see with you through my eyes.",
      size: "small" as const,
      expandOnHover: true,
      priority: "low" as const,
      accentColor: "violet"
    },
    {
      icon: FaBook,
      title: activeLocale === "zh" ? "博客" : "Blog",
      content: activeLocale === "zh"
        ? "记录技术成长与生活点滴 📝 分享我的编程之路与个人思考。会分享很多有价值的内容，长期更新一些教程。欢迎各位博主来交换友链，也欢迎来访交流！"
        : "Tech blog & life journal 📝 Sharing programming journey, tutorials and thoughts. Welcome to visit and exchange links!",
      size: "medium" as const,
      priority: "medium" as const,
      accentColor: "sky",
      href: "https://www.jadenlisblog.com"
    },
    {
      icon: FaLinkedin,
      title: "Linkedln",
      content: activeLocale === "zh"
        ? "欢迎访问我的 LinkedIn！💻 在这里，您可以了解我的专业背景、项目经验、技能特长，以及我在行业中的成长与发展。"
        : "Welcome to my LinkedIn! 💻 Here, you can learn about my professional background, project experience, skills, and my growth and development in the industry.",
      size: "medium" as const,
      priority: "medium" as const,
      accentColor: "blue",
      href: "https://www.linkedin.com/in/yehan-li-0280b12a0/"
    },
    {
      icon: FaEnvelope,
      title: activeLocale === "zh" ? "联系我" : "Contact",
      content: activeLocale === "zh"
        ? "📮 jadenalwaysgo@gmail.com · 期待与你交流！无论是技术讨论、项目合作还是交个朋友，都欢迎通过邮件联系我。"
        : "📮 jadenalwaysgo@gmail.com · Feel free to reach out for tech discussions, collaborations or just making friends!",
      size: "small" as const,
      expandOnHover: true,
      priority: "low" as const,
      accentColor: "amber"
    }
  ]

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[65rem] text-center leading-8 sm:mb-40 scroll-mt-28 px-4"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      id="about"
    >
      <SectionHeading>{sectionLan("about")}</SectionHeading>
      <div className="grid grid-cols-2 sm:grid-cols-4 auto-rows-[minmax(120px,auto)] gap-3 sm:gap-4">
        {aboutCards.map((card, index) => (
          card.type === "image" ? (
            <ImageCard
              key={index}
              index={index}
              image={card.image || ""}
              accentColor={card.accentColor}
            />
          ) : (
            <AboutCard
              key={index}
              icon={card.icon || FaCode}
              title={card.title}
              content={card.content!}
              index={index}
              size={card.size}
              expandOnHover={card.expandOnHover}
              aspectRatio={card.aspectRatio}
              priority={card.priority}
              accentColor={card.accentColor}
              href={card.href}
            />
          )
        ))}
        <GithubStatsCard index={aboutCards.length} />
        <MBTICard index={aboutCards.length + 1} />
      </div>
    </motion.section>
  )
}
