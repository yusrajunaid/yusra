import { motion } from "framer-motion";
import { Github, ExternalLink, ChevronRight, Briefcase, Code2, Star, Brain, MapPin, ArrowUpRight, Mail } from "lucide-react";
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
    title: "AI Sentiment",
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
    title: "ML Dashboard",
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
  { id: 'projects', icon: <Code2 />, label: 'Projects', onClick: () => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'skills', icon: <Star />, label: 'Skills', onClick: () => document.querySelector('#skills')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'experience', icon: <Briefcase />, label: 'Experience', onClick: () => document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' }) },
  { id: 'writing', icon: <Brain />, label: 'Writing', onClick: () => document.querySelector('#writing')?.scrollIntoView({ behavior: 'smooth' }) },
];

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* ─── HERO ─────────────────────────────────────────────── */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          <DottedSurface />

          {/* Gradient radial behind text */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-[120px]" />
          </div>

          <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-12 relative z-10 w-full pt-24 pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              {/* LEFT — Text */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                {/* Status badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full border border-border bg-card/60 backdrop-blur-sm text-xs font-medium text-muted-foreground"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Available for new opportunities
                </motion.div>

                <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-display font-semibold text-foreground tracking-tight leading-[1.1] mb-4">
                  {USER_INFO.name}
                </h1>

                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-8 bg-border" />
                  <span className="text-base font-medium text-muted-foreground">{USER_INFO.title}</span>
                </div>

                <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-md">
                  {USER_INFO.bio} Currently focused on AI/ML engineering and building developer tools.
                </p>

                <div className="flex flex-wrap items-center gap-3 mb-10">
                  <ParticleButton
                    size="default"
                    className="rounded-lg gap-2"
                    onClick={() => window.open(USER_INFO.github, "_blank")}
                  >
                    <Github size={16} />
                    GitHub
                  </ParticleButton>
                  <Button
                    size="default"
                    variant="outline"
                    className="rounded-lg gap-2 bg-background/50 backdrop-blur-sm"
                    onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    View Projects
                    <ArrowUpRight size={15} />
                  </Button>
                  <Button
                    size="default"
                    variant="ghost"
                    className="rounded-lg gap-2"
                    onClick={() => window.open(`mailto:${USER_INFO.email}`, "_blank")}
                  >
                    <Mail size={15} />
                    Contact
                  </Button>
                </div>

                {/* Mini stats row */}
                <div className="flex items-center gap-6 text-sm">
                  {[
                    { value: "2+", label: "Years Exp." },
                    { value: "6+", label: "Projects" },
                    { value: "2", label: "Companies" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="font-semibold text-foreground">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* RIGHT — Info card + tech stack */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
                className="flex flex-col gap-4"
              >
                {/* Profile card */}
                <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-md p-6 shadow-lg">
                  <div className="flex items-start gap-4">
                    {/* Avatar circle */}
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-foreground/20 to-foreground/5 border border-border flex items-center justify-center text-2xl font-display font-bold text-foreground flex-shrink-0">
                      YJ
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-foreground">{USER_INFO.name}</div>
                      <div className="text-sm text-muted-foreground">{USER_INFO.title}</div>
                      <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                        <MapPin size={11} />
                        Remote · Open to relocation
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-border">
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Specialization</div>
                    <div className="flex flex-wrap gap-2">
                      {["Full-Stack Dev", "AI/ML", "NLP", "DevOps", "React"].map((tag) => (
                        <span key={tag} className="px-2.5 py-1 text-xs rounded-md bg-muted text-muted-foreground border border-border/60">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Tech Stack</div>
                    <div className="flex gap-3">
                      {TECH_STACK.map((tech, i) => (
                        <motion.div
                          key={tech.name}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + i * 0.07 }}
                          title={tech.name}
                          className="text-muted-foreground hover:text-foreground transition-colors cursor-default"
                        >
                          <tech.icon size={20} />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick stats card */}
                <div className="grid grid-cols-2 gap-3">
                  {EXPERIENCE.map((job) => (
                    <div key={job.id} className="rounded-xl border border-border bg-card/40 backdrop-blur-sm p-4">
                      <div className="text-xs font-medium text-muted-foreground mb-1">{job.company}</div>
                      <div className="text-sm font-semibold text-foreground leading-snug">{job.role.split(" ").slice(0, 3).join(" ")}</div>
                      <div className="text-xs text-muted-foreground mt-1">{job.period}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── PROJECTS ─────────────────────────────────────────── */}
        <Section id="projects" title="Selected Works">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <GlowCard
                  customSize
                  glowColor={(['blue', 'purple', 'green', 'orange', 'blue', 'purple'] as const)[i % 6]}
                  className="h-full flex flex-col p-0 overflow-hidden"
                >
                  <div className="flex flex-col h-full p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-9 h-9 rounded-lg bg-muted/50 border border-border flex items-center justify-center">
                        <Code2 size={16} className="text-muted-foreground" />
                      </div>
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => window.open(project.repoUrl, "_blank")}
                          className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                          title="View code"
                        >
                          <Github size={14} />
                        </button>
                        <button
                          onClick={() => window.open(project.demoUrl, "_blank")}
                          className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                          title="Live demo"
                        >
                          <ExternalLink size={14} />
                        </button>
                      </div>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{project.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 text-xs rounded-md bg-muted text-muted-foreground border border-border/60">{tag}</span>
                      ))}
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ─── SKILLS ───────────────────────────────────────────── */}
        <Section id="skills" title="Technical Expertise" className="bg-muted/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <OrbitingSkills />
            </motion.div>

            <div className="space-y-8">
              {SKILL_CATEGORIES.map((category, i) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-foreground/50" />
                    {category.title}
                  </h3>
                  <div className="space-y-3">
                    {category.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between items-center mb-1.5">
                          <div className="flex items-center gap-2">
                            <skill.icon className="text-muted-foreground" size={13} />
                            <span className="text-sm font-medium text-foreground">{skill.name}</span>
                          </div>
                          <span className="text-xs text-muted-foreground tabular-nums">{skill.proficiency}%</span>
                        </div>
                        <div className="h-1 w-full bg-border rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-foreground/80 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.proficiency}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
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

        {/* ─── EXPERIENCE ───────────────────────────────────────── */}
        <Section id="experience" title="Experience">
          <p className="text-sm text-muted-foreground text-center mb-8">
            Click any node to explore — click the background to reset.
          </p>
          <RadialOrbitalTimeline timelineData={TIMELINE_DATA} />

          {/* Classic timeline — visible on all sizes for context */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {EXPERIENCE.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-2xl border border-border bg-card p-6 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-foreground/[0.03] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="text-xs font-mono text-muted-foreground mb-1">{job.period}</div>
                <h3 className="font-semibold text-foreground leading-snug mb-1">{job.role}</h3>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
                  <Briefcase size={13} />
                  {job.company}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{job.description}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ─── TESTIMONIALS ─────────────────────────────────────── */}
        <Section id="testimonials" title="What People Say" className="bg-muted/20">
          <AnimatedTestimonials testimonials={TESTIMONIALS} autoplay={true} />
        </Section>

        {/* ─── WRITING ──────────────────────────────────────────── */}
        <Section id="writing" title="Recent Writing">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {BLOG_POSTS.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <a href="#" className="block h-full group">
                  <div className="h-full p-5 rounded-2xl bg-card border border-border hover:border-foreground/20 hover:shadow-md transition-all duration-300 flex flex-col">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                      <span>{post.date}</span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-xs font-semibold text-primary">
                      Read Article
                      <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </Section>
      </main>

      {/* ─── FOOTER ───────────────────────────────────────────── */}
      <PortfolioFooter
        name={USER_INFO.name}
        github={USER_INFO.github}
        linkedin={USER_INFO.linkedin}
        email={USER_INFO.email}
      />

      {/* ─── MOBILE BOTTOM NAV ────────────────────────────────── */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden">
        <LimelightNav items={NAV_ITEMS} className="shadow-2xl" />
      </div>
    </div>
  );
}
