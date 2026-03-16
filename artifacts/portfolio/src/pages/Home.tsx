import { motion } from "framer-motion";
import { Github, ExternalLink, ChevronRight, Briefcase, Code2, Star, Brain } from "lucide-react";
import { DottedSurface } from "@/components/DottedSurface";
import { Navigation } from "@/components/Navigation";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GlowCard } from "@/components/ui/spotlight-card";
import { ParticleButton } from "@/components/ui/particle-button";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { LimelightNav } from "@/components/ui/limelight-nav";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { PortfolioFooter } from "@/components/ui/footer-section";
import OrbitingSkills from "@/components/ui/orbiting-skills";
import { USER_INFO, TECH_STACK, PROJECTS, SKILL_CATEGORIES, EXPERIENCE, BLOG_POSTS } from "@/data/portfolio-data";

const TESTIMONIALS = [
  {
    quote: "Yusra delivered an exceptional ML pipeline dashboard that cut our model monitoring time by 60%. Her full-stack expertise and AI knowledge made her an invaluable team member.",
    name: "David Chen",
    designation: "CTO at TechFlow Solutions",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  },
  {
    quote: "Working with Yusra on our AI integration project was outstanding. She has a rare ability to bridge the gap between research and production-ready systems.",
    name: "Sarah Mitchell",
    designation: "Head of Engineering at InnovateSphere",
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
  },
  {
    quote: "Yusra's NLP work reduced our manual data processing by 40%. Her code is clean, well-documented, and her communication throughout the project was excellent.",
    name: "James O'Brien",
    designation: "Product Lead at DataPro",
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
  },
];

const TIMELINE_DATA = [
  {
    id: 1,
    title: "Code Alpha",
    date: "2023–Now",
    content: "Developed and deployed ML models for NLP, computer vision, and MLOps. Led model serving in production environments with 99.9% uptime.",
    category: "Experience",
    icon: Brain,
    relatedIds: [2, 3],
    status: "in-progress" as const,
    energy: 95,
  },
  {
    id: 2,
    title: "Developers Hub",
    date: "2022–2023",
    content: "Built AI-driven features and automation systems. Reduced manual processing time by 40% through intelligent integrations.",
    category: "Experience",
    icon: Briefcase,
    relatedIds: [1],
    status: "completed" as const,
    energy: 85,
  },
  {
    id: 3,
    title: "AI Sentiment Tool",
    date: "2023",
    content: "NLP tool for real-time sentiment analysis. Processes thousands of text streams per minute with 93% accuracy.",
    category: "Project",
    icon: Code2,
    relatedIds: [1, 5],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 4,
    title: "DevCollab Hub",
    date: "2023",
    content: "Real-time collaborative dev platform with live pair programming, shared terminals, and instant messaging.",
    category: "Project",
    icon: Code2,
    relatedIds: [5],
    status: "completed" as const,
    energy: 80,
  },
  {
    id: 5,
    title: "ML Pipeline Dashboard",
    date: "2023",
    content: "Visual manager for ML training pipelines. Real-time monitoring of epochs, loss functions, and resource utilization.",
    category: "Project",
    icon: Star,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 75,
  },
];

const NAV_ITEMS = [
  {
    id: 'projects',
    icon: <Code2 />,
    label: 'Projects',
    onClick: () => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }),
  },
  {
    id: 'skills',
    icon: <Star />,
    label: 'Skills',
    onClick: () => document.querySelector('#skills')?.scrollIntoView({ behavior: 'smooth' }),
  },
  {
    id: 'experience',
    icon: <Briefcase />,
    label: 'Experience',
    onClick: () => document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' }),
  },
  {
    id: 'writing',
    icon: <Brain />,
    label: 'Writing',
    onClick: () => document.querySelector('#writing')?.scrollIntoView({ behavior: 'smooth' }),
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
          <DottedSurface />

          <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-12 relative z-10 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-medium text-foreground tracking-tight leading-tight mb-6">
                Hi, I'm {USER_INFO.name}.<br />
                <span className="text-muted-foreground">{USER_INFO.title}</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
                {USER_INFO.bio}
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-16">
                <ParticleButton
                  size="lg"
                  className="rounded-full shadow-lg hover:shadow-xl transition-all"
                  onClick={() => window.open(USER_INFO.github, "_blank")}
                >
                  <Github className="mr-2 h-5 w-5" />
                  GitHub Profile
                </ParticleButton>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full bg-background/50 backdrop-blur-sm"
                  onClick={() => {
                    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  View Work
                </Button>
              </div>

              <div className="flex items-center gap-6 text-muted-foreground">
                <p className="text-sm font-medium uppercase tracking-wider">Tech Stack</p>
                <div className="h-px w-12 bg-border"></div>
                <div className="flex gap-4">
                  {TECH_STACK.map((tech, i) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + (i * 0.1), duration: 0.4 }}
                      title={tech.name}
                      className="text-foreground/60 hover:text-foreground transition-colors"
                    >
                      <tech.icon size={24} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-muted-foreground to-transparent"></div>
          </motion.div>
        </section>

        {/* PROJECTS SECTION */}
        <Section id="projects" title="Selected Works">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <GlowCard
                  customSize
                  glowColor={(['blue', 'purple', 'green', 'orange', 'blue', 'purple'] as const)[i % 6]}
                  className="h-full flex flex-col p-0 overflow-hidden"
                >
                  <div className="flex flex-col h-full p-6">
                    <div className="flex-1">
                      <h3 className="text-lg font-display font-semibold text-foreground mb-2">{project.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs font-normal">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between border-t border-border/30 pt-4 mt-2">
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" onClick={() => window.open(project.repoUrl, "_blank")}>
                        <Github className="mr-2 h-4 w-4" /> Code
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" onClick={() => window.open(project.demoUrl, "_blank")}>
                        <ExternalLink className="mr-2 h-4 w-4" /> Demo
                      </Button>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* SKILLS SECTION */}
        <Section id="skills" title="Technical Expertise" className="bg-muted/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Orbiting Skills Visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <OrbitingSkills />
            </motion.div>

            {/* Skill proficiency bars */}
            <div className="space-y-10">
              {SKILL_CATEGORIES.slice(0, 2).map((category, i) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                >
                  <h3 className="text-lg font-display font-medium mb-5 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    {category.title}
                  </h3>
                  <div className="space-y-4">
                    {category.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between items-center mb-1.5">
                          <div className="flex items-center gap-2">
                            <skill.icon className="text-muted-foreground" size={14} />
                            <span className="font-medium text-sm">{skill.name}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{skill.proficiency}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-foreground rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.proficiency}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
              {SKILL_CATEGORIES.slice(2).map((category, i) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: (i + 2) * 0.15 }}
                >
                  <h3 className="text-lg font-display font-medium mb-5 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    {category.title}
                  </h3>
                  <div className="space-y-4">
                    {category.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between items-center mb-1.5">
                          <div className="flex items-center gap-2">
                            <skill.icon className="text-muted-foreground" size={14} />
                            <span className="font-medium text-sm">{skill.name}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{skill.proficiency}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-foreground rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.proficiency}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* EXPERIENCE SECTION — Radial Orbital Timeline */}
        <Section id="experience" title="Experience">
          <div className="text-center mb-6 text-sm text-muted-foreground">
            Click on any node to explore details. Click the canvas to reset.
          </div>
          <RadialOrbitalTimeline timelineData={TIMELINE_DATA} />

          {/* Classic timeline fallback for mobile */}
          <div className="mt-12 max-w-3xl mx-auto md:hidden">
            <div className="relative border-l border-border ml-3 space-y-10">
              {EXPERIENCE.map((job, i) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  className="relative pl-8"
                >
                  <div className="absolute w-5 h-5 bg-background rounded-full border-2 border-foreground -left-[11px] top-1 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-foreground rounded-full" />
                  </div>
                  <div className="mb-1">
                    <h3 className="text-lg font-display font-medium text-foreground">{job.role}</h3>
                    <span className="text-sm text-muted-foreground">{job.company} · {job.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{job.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* TESTIMONIALS SECTION */}
        <Section id="testimonials" title="What People Say" className="bg-muted/20">
          <AnimatedTestimonials testimonials={TESTIMONIALS} autoplay={true} />
        </Section>

        {/* WRITING SECTION */}
        <Section id="writing" title="Recent Writing">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <a href="#" className="block h-full group">
                  <div className="h-full p-6 rounded-2xl bg-card border border-border/50 hover:border-border hover:shadow-lg transition-all duration-300 flex flex-col">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4 font-medium uppercase tracking-wider">
                      <span>{post.date}</span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-lg font-display font-medium mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-sm font-semibold text-primary mt-auto">
                      Read Article
                      <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </Section>
      </main>

      {/* FOOTER */}
      <PortfolioFooter
        name={USER_INFO.name}
        github={USER_INFO.github}
        linkedin={USER_INFO.linkedin}
        email={USER_INFO.email}
      />

      {/* LIMELIGHT NAV — Mobile bottom dock */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden">
        <LimelightNav
          items={NAV_ITEMS}
          className="shadow-2xl"
        />
      </div>
    </div>
  );
}
