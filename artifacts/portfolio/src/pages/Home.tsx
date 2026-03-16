import { motion } from "framer-motion";
import { Github, ExternalLink, ChevronRight, MapPin, Calendar } from "lucide-react";
import { DottedSurface } from "@/components/DottedSurface";
import { Navigation } from "@/components/Navigation";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { USER_INFO, TECH_STACK, PROJECTS, SKILL_CATEGORIES, EXPERIENCE, BLOG_POSTS } from "@/data/portfolio-data";

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
                <Button 
                  size="lg" 
                  className="rounded-full shadow-lg hover:shadow-xl transition-all"
                  onClick={() => window.open(USER_INFO.github, "_blank")}
                >
                  <Github className="mr-2 h-5 w-5" />
                  GitHub Profile
                </Button>
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
                <Card className="h-full flex flex-col group hover:shadow-xl hover:border-border transition-all duration-500 overflow-hidden bg-gradient-to-b from-card to-card/50">
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">{project.title}</CardTitle>
                    <CardDescription className="line-clamp-3 mt-2">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="font-normal">{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t border-border/50 pt-4 bg-muted/20">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" onClick={() => window.open(project.repoUrl, "_blank")}>
                      <Github className="mr-2 h-4 w-4" /> Code
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" onClick={() => window.open(project.demoUrl, "_blank")}>
                      <ExternalLink className="mr-2 h-4 w-4" /> Demo
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* SKILLS SECTION */}
        <Section id="skills" title="Technical Expertise" className="bg-muted/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {SKILL_CATEGORIES.map((category, i) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-xl font-display font-medium mb-6 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  {category.title}
                </h3>
                <div className="space-y-5">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <skill.icon className="text-muted-foreground" size={16} />
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
        </Section>

        {/* EXPERIENCE SECTION */}
        <Section id="experience" title="Experience">
          <div className="max-w-4xl mx-auto">
            <div className="relative border-l border-border ml-3 md:ml-6 space-y-12">
              {EXPERIENCE.map((job, i) => (
                <motion.div 
                  key={job.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  className="relative pl-8 md:pl-12"
                >
                  {/* Timeline Dot */}
                  <div className="absolute w-6 h-6 bg-background rounded-full border-2 border-primary -left-[13px] top-1 flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2 gap-2">
                    <h3 className="text-2xl font-display font-medium text-foreground">{job.role}</h3>
                    <Badge variant="outline" className="w-fit text-xs px-3 py-1 flex items-center gap-1.5">
                      <Calendar size={12} />
                      {job.period}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground font-medium mb-4">
                    <MapPin size={16} />
                    {job.company}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {job.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* WRITING SECTION */}
        <Section id="writing" title="Recent Writing" className="bg-muted/30">
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
                    <h3 className="text-xl font-display font-medium mb-3 group-hover:text-primary transition-colors">
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
      <footer className="border-t border-border py-12 bg-background">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="text-xl font-display font-semibold block mb-1">Yusra Junaid</span>
            <span className="text-sm text-muted-foreground">© {new Date().getFullYear()} All rights reserved.</span>
          </div>
          
          <div className="flex items-center gap-4">
            <a href={USER_INFO.github} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors">
              <Github size={20} />
            </a>
            <a href={USER_INFO.linkedin} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href={`mailto:${USER_INFO.email}`} className="p-2 rounded-full bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
