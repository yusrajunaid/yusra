import { 
  SiReact, 
  SiTypescript, 
  SiPython, 
  SiNodedotjs, 
  SiPostgresql, 
  SiTensorflow,
  SiNextdotjs,
  SiTailwindcss,
  SiExpress,
  SiFastapi,
  SiPytorch,
  SiScikitlearn,
  SiRedis,
  SiDocker,
  SiGit
} from "react-icons/si";

export const USER_INFO = {
  name: "Yusra Junaid",
  title: "Full-Stack Developer",
  bio: "Building robust applications with modern technologies. Passionate about AI/ML and open-source.",
  github: "https://github.com/yusrajunaid",
  linkedin: "https://linkedin.com",
  email: "hello@example.com"
};

export const TECH_STACK = [
  { name: "React", icon: SiReact },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Python", icon: SiPython },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "TensorFlow", icon: SiTensorflow },
];

export const PROJECTS = [
  {
    id: 1,
    title: "AI Sentiment Analyzer",
    description: "NLP tool for real-time sentiment analysis of text streams. Utilizes pre-trained models to classify input into positive, negative, or neutral sentiment with confidence scoring.",
    tags: ["Python", "TensorFlow", "FastAPI", "React"],
    demoUrl: "#",
    repoUrl: "https://github.com/yusrajunaid/ai-sentiment"
  },
  {
    id: 2,
    title: "DevCollab Hub",
    description: "Real-time collaborative development platform featuring live pair programming, shared terminals, and instant messaging built on WebSockets.",
    tags: ["Node.js", "Socket.io", "React", "PostgreSQL"],
    demoUrl: "#",
    repoUrl: "https://github.com/yusrajunaid/devcollab"
  },
  {
    id: 3,
    title: "ML Pipeline Dashboard",
    description: "Visual manager for machine learning training pipelines. Allows researchers to monitor epochs, loss functions, and resource utilization in real-time.",
    tags: ["Python", "Scikit-learn", "React", "Redis"],
    demoUrl: "#",
    repoUrl: "https://github.com/yusrajunaid/ml-dashboard"
  },
  {
    id: 4,
    title: "Open Source Tracker",
    description: "Analytics tool for tracking and visualizing GitHub contributions across multiple organizations and repositories over time.",
    tags: ["TypeScript", "Next.js", "GraphQL"],
    demoUrl: "#",
    repoUrl: "https://github.com/yusrajunaid/os-tracker"
  },
  {
    id: 5,
    title: "Smart Task Planner",
    description: "AI-powered productivity application that automatically prioritizes and schedules tasks based on urgency, estimated effort, and user habits.",
    tags: ["React", "Node.js", "OpenAI API"],
    demoUrl: "#",
    repoUrl: "https://github.com/yusrajunaid/smart-planner"
  },
  {
    id: 6,
    title: "Code Review Bot",
    description: "Automated PR review system utilizing LLMs to detect anti-patterns, suggest optimizations, and ensure styling conformity before human review.",
    tags: ["Python", "FastAPI", "LangChain", "GitHub API"],
    demoUrl: "#",
    repoUrl: "https://github.com/yusrajunaid/review-bot"
  }
];

export const SKILL_CATEGORIES = [
  {
    title: "Frontend",
    skills: [
      { name: "React", icon: SiReact, proficiency: 90 },
      { name: "TypeScript", icon: SiTypescript, proficiency: 85 },
      { name: "Next.js", icon: SiNextdotjs, proficiency: 80 },
      { name: "Tailwind CSS", icon: SiTailwindcss, proficiency: 95 }
    ]
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, proficiency: 85 },
      { name: "Python", icon: SiPython, proficiency: 90 },
      { name: "Express", icon: SiExpress, proficiency: 80 },
      { name: "FastAPI", icon: SiFastapi, proficiency: 85 }
    ]
  },
  {
    title: "AI/ML",
    skills: [
      { name: "TensorFlow", icon: SiTensorflow, proficiency: 75 },
      { name: "PyTorch", icon: SiPytorch, proficiency: 70 },
      { name: "Scikit-learn", icon: SiScikitlearn, proficiency: 85 },
      { name: "LangChain", icon: SiReact, proficiency: 80 } // Fallback icon
    ]
  },
  {
    title: "Database & Tools",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, proficiency: 85 },
      { name: "Redis", icon: SiRedis, proficiency: 75 },
      { name: "Docker", icon: SiDocker, proficiency: 80 },
      { name: "Git", icon: SiGit, proficiency: 95 }
    ]
  }
];

export const EXPERIENCE = [
  {
    id: 1,
    company: "Code Alpha",
    role: "AI and Machine Learning Engineer",
    period: "2023 – Present",
    description: "Developed and deployed machine learning models for real-world applications. Worked on NLP pipelines, computer vision systems, and MLOps to ensure reliable model serving in production environments."
  },
  {
    id: 2,
    company: "Developers Hub",
    role: "Artificial Intelligence Developer",
    period: "2022 – 2023",
    description: "Built AI-driven features and intelligent automation systems. Collaborated on research projects and implemented robust production AI integrations that reduced manual processing time by 40%."
  }
];

export const BLOG_POSTS = [
  {
    id: 1,
    title: "Deploying ML Models with FastAPI and Docker",
    date: "Oct 12, 2023",
    readTime: "6 min read",
    excerpt: "A comprehensive guide on taking your locally trained machine learning models and wrapping them in a performant API for production deployment."
  },
  {
    id: 2,
    title: "The Transition from React to Next.js App Router",
    date: "Aug 24, 2023",
    readTime: "8 min read",
    excerpt: "Lessons learned while migrating a large-scale dashboard to Next.js 13+. Exploring Server Components, data fetching patterns, and performance gains."
  },
  {
    id: 3,
    title: "Understanding Self-Attention in Transformers",
    date: "Jun 05, 2023",
    readTime: "10 min read",
    excerpt: "Breaking down the core mechanism behind modern LLMs. A visual and mathematical intuition behind queries, keys, and values."
  }
];
