"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  IconCode,
  IconBrandReact,
  IconBrandNextjs,
  IconBrandNodejs,
  IconBrandMongodb,
  IconBrandTailwind,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconExternalLink,
  IconArrowRight,
  IconMapPin,
  IconMail,
  IconTerminal2,
  IconBraces,
  IconDeviceDesktop,
  IconPalette,
  IconDatabase,
  IconApi,
  IconCoffee,
  IconSparkles,
  IconQuote,
  IconChevronDown,
} from "@tabler/icons-react";

/* ── Animation Variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, delay: i * 0.12, ease: "easeOut" },
  }),
};

/* ── Data ── */
const techStack = [
  { icon: IconBrandReact, name: "React", color: "text-sky-500" },
  { icon: IconBrandNextjs, name: "Next.js", color: "text-black" },
  { icon: IconBrandNodejs, name: "Node.js", color: "text-green-600" },
  { icon: IconBrandMongodb, name: "MongoDB", color: "text-green-500" },
  { icon: IconBrandTailwind, name: "Tailwind CSS", color: "text-cyan-500" },
  { icon: IconBraces, name: "JavaScript", color: "text-yellow-500" },
  { icon: IconDatabase, name: "Databases", color: "text-violet-500" },
  { icon: IconApi, name: "REST APIs", color: "text-orange-500" },
];

const skills = [
  {
    icon: IconDeviceDesktop,
    title: "Frontend Development",
    desc: "Building responsive, accessible, and performant user interfaces with React, Next.js, and modern CSS frameworks.",
  },
  {
    icon: IconTerminal2,
    title: "Backend Development",
    desc: "Designing robust APIs, server logic, and authentication systems with Node.js, Express, and MongoDB.",
  },
  {
    icon: IconPalette,
    title: "UI/UX Design",
    desc: "Crafting clean, intuitive interfaces with attention to typography, spacing, motion, and user flow.",
  },
  {
    icon: IconCode,
    title: "Full-Stack Architecture",
    desc: "End-to-end ownership — from database schema and API design to deployment and performance optimization.",
  },
];

const journeyItems = [
  {
    phase: "The Spark",
    desc: "Started coding out of curiosity, fell in love with the craft of turning ideas into interactive experiences.",
  },
  {
    phase: "Deep Dive",
    desc: "Spent countless hours mastering React, Node.js, and the full JavaScript ecosystem through real projects.",
  },
  {
    phase: "Building Founder",
    desc: "Channeled everything into Founder — a full-stack B2B platform with face verification, real-time chat, and more.",
  },
  {
    phase: "What's Next",
    desc: "Continuously learning, building, and looking for opportunities to create impactful software at scale.",
  },
];

const faqs = [
  {
    q: "Why did you build Founder?",
    a: "I wanted to solve a real problem — businesses struggle to find the right partners. Founder makes discovery, trust, and collaboration effortless.",
  },
  {
    q: "What's your favorite part of development?",
    a: "The moment a complex feature clicks into place and works seamlessly. I love the intersection of clean code and beautiful design.",
  },
  {
    q: "Are you open to work or collaboration?",
    a: "Absolutely! I'm always interested in exciting projects, freelance opportunities, or co-building something meaningful. Feel free to reach out.",
  },
  {
    q: "What tools do you use daily?",
    a: "VS Code, GitHub, Figma for design, Vercel for deployment, and a lot of coffee. My stack revolves around the JavaScript/TypeScript ecosystem.",
  },
];

function Page() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="flex flex-col items-center overflow-hidden mt-10">
     
      

      {/* ── About / Story ── */}
      <section className="w-full max-w-5xl mx-auto px-4 py-14">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
          className="flex flex-col md:flex-row gap-8 items-center bg-black rounded-3xl p-8 md:p-12"
        >
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 bg-white/10 text-neutral-300 text-xs font-medium px-3 py-1.5 rounded-full mb-4">
              <IconCoffee size={14} />
              My Story
            </div>
            <h2 className="text-white text-3xl sm:text-4xl font-bold leading-tight">
              Code, Create,
              <br className="hidden sm:block" /> Repeat.
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-4 leading-relaxed max-w-lg">
              I&apos;m a developer who believes great software comes from
              obsessing over the details. From clean architecture to smooth
              animations, I care about every layer of the stack. Founder is my
              flagship project — a full-stack B2B platform that showcases
              everything I&apos;ve learned about building real, production-grade
              applications.
            </p>
            <p className="text-neutral-500 text-sm mt-3 leading-relaxed max-w-lg">
              When I&apos;m not coding, you&apos;ll find me exploring new
              technologies, reading about system design, or working on the next
              big idea.
            </p>
          </div>

          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="shrink-0 w-full md:w-auto"
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 font-mono text-sm text-neutral-300 max-w-xs mx-auto md:mx-0">
              <p className="text-white/40 text-xs mb-2"> developer.js</p>
              <p>
                <span className="text-purple-400">const</span>{" "}
                <span className="text-blue-400">dev</span> = {"{"}
              </p>
              <p className="ml-4">
                name: <span className="text-green-400">&quot;Maharshi&quot;</span>,
              </p>
              <p className="ml-4">
                role: <span className="text-green-400">&quot;Full-Stack&quot;</span>,
              </p>
              <p className="ml-4">
                loves: <span className="text-green-400">&quot;Building&quot;</span>,
              </p>
              <p className="ml-4">
                coffee: <span className="text-yellow-400">true</span>,
              </p>
              <p>{"}"}</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className="w-full max-w-5xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: "2+", label: "Years Coding" },
            { value: "10+", label: "Projects Built" },
            { value: "Full-Stack", label: "Expertise" },
            { value: "∞", label: "Curiosity" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              custom={i}
              className="flex flex-col items-center justify-center p-5 rounded-2xl border border-neutral-200 bg-white hover:shadow-md transition-shadow"
            >
              <span className="text-2xl sm:text-3xl font-bold">{stat.value}</span>
              <span className="text-xs sm:text-sm text-neutral-500 mt-1 font-medium">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="w-full max-w-5xl mx-auto px-4 py-12">
        <motion.h3
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="text-center text-2xl sm:text-3xl font-bold mb-2"
        >
          Tech Stack
        </motion.h3>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          className="text-center text-neutral-500 text-sm sm:text-base mb-8 max-w-md mx-auto"
        >
          The tools and technologies I work with every day
        </motion.p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.name}
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={i}
              className="flex flex-col items-center gap-2 p-5 rounded-2xl border border-neutral-200 bg-white hover:shadow-md transition-shadow"
            >
              <tech.icon size={32} stroke={1.5} className={tech.color} />
              <span className="text-sm font-semibold">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Skills / What I Do ── */}
      <section className="w-full max-w-5xl mx-auto px-4 py-12">
        <motion.h3
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="text-center text-2xl sm:text-3xl font-bold mb-2"
        >
          What I Do
        </motion.h3>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          className="text-center text-neutral-500 text-sm sm:text-base mb-8 max-w-md mx-auto"
        >
          End-to-end development with a focus on quality
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.title}
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={i}
              className="flex items-start gap-4 p-6 rounded-2xl border border-neutral-200 bg-white hover:shadow-md transition-shadow"
            >
              <div className="w-11 h-11 rounded-xl bg-neutral-100 flex items-center justify-center shrink-0">
                <skill.icon size={22} stroke={1.5} />
              </div>
              <div>
                <h4 className="font-bold text-lg">{skill.title}</h4>
                <p className="text-neutral-500 text-sm mt-1 leading-relaxed">
                  {skill.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Founder Showcase ── */}
      <section className="w-full max-w-5xl mx-auto px-4 py-12">
        <motion.h3
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="text-center text-2xl sm:text-3xl font-bold mb-2"
        >
          Featured Project: Founder
        </motion.h3>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          className="text-center text-neutral-500 text-sm sm:text-base mb-8 max-w-lg mx-auto"
        >
          A full-stack B2B platform with verified profiles, real-time chat,
          market discovery, face verification, and more.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={2}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
        >
          {[
            "Next.js 15",
            "MongoDB",
            "NextAuth",
            "Face-API.js",
            "Tailwind v4",
            "Cloudinary",
            "Real-time Chat",
            "Framer Motion",
            "REST APIs",
            "Infinite Scroll",
          ].map((feat, i) => (
            <motion.div
              key={feat}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-center px-3 py-2.5 rounded-xl border border-neutral-200 bg-white text-sm font-medium hover:shadow-sm transition-shadow text-center"
            >
              {feat}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Portfolio Embed ── */}
      <section className="w-full max-w-5xl mx-auto px-4 py-12">
        <motion.h3
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="text-center text-2xl sm:text-3xl font-bold mb-2"
        >
          My Portfolio
        </motion.h3>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          className="text-center text-neutral-500 text-sm sm:text-base mb-6 max-w-md mx-auto"
        >
          Explore my full portfolio with all projects and work
        </motion.p>

        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={0}
          className="rounded-2xl border border-neutral-200 overflow-hidden bg-white shadow-sm"
        >
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-neutral-100 bg-neutral-50">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <span className="text-xs text-neutral-400 font-mono ml-2">
                maharshiportfolio.vercel.app
              </span>
            </div>
            <a
              href="https://maharshiportfolio.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-black transition-colors"
              aria-label="Open portfolio in new tab"
            >
              <IconExternalLink size={16} />
            </a>
          </div>
          <iframe
            src="https://maharshiportfolio.vercel.app"
            title="Maharshi's Portfolio"
            className="w-full h-125 sm:h-150 lg:h-175 border-0"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
          />
        </motion.div>
      </section>

      {/* ── Quote ── */}
      <section className="w-full max-w-5xl mx-auto px-4 py-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
          className="relative p-8 md:p-12 rounded-3xl border border-neutral-200 bg-white text-center"
        >
          <IconQuote size={40} className="mx-auto text-neutral-200 mb-4" />
          <p className="text-lg sm:text-xl text-neutral-700 leading-relaxed max-w-2xl mx-auto font-medium">
            &ldquo;The best way to predict the future is to build it. Every line
            of code is a step toward something meaningful.&rdquo;
          </p>
          <p className="text-neutral-400 text-sm mt-4">— Maharshi</p>
        </motion.div>
      </section>

      {/* ── FAQ ── */}
      <section className="w-full max-w-3xl mx-auto px-4 py-14">
        <motion.h3
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="text-center text-2xl sm:text-3xl font-bold mb-2"
        >
          FAQ
        </motion.h3>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          className="text-center text-neutral-500 text-sm sm:text-base mb-8 max-w-md mx-auto"
        >
          Common questions about me and Founder
        </motion.p>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={i}
              className="border border-neutral-200 rounded-xl overflow-hidden bg-white"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left cursor-pointer hover:bg-neutral-50 transition-colors"
              >
                <span className="font-semibold text-sm sm:text-base pr-4">
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: openFaq === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0"
                >
                  <IconChevronDown size={18} className="text-neutral-400" />
                </motion.span>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-4 pb-4 text-neutral-500 text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="w-full max-w-5xl mx-auto px-4 py-10 mb-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
          className="flex flex-col items-center text-center bg-black rounded-3xl p-10 md:p-14"
        >
          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-5">
            <IconCode size={28} className="text-white" />
          </div>
          <h2 className="text-white text-3xl sm:text-4xl font-bold leading-tight">
            Let&apos;s build something together
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-3 max-w-md leading-relaxed">
            Whether it&apos;s a collaboration, a project idea, or just a chat
            about code — I&apos;d love to connect.
          </p>
          <div className="flex gap-3 mt-7 flex-wrap justify-center">
            <a
              href="https://maharshiportfolio.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-full hover:bg-neutral-100 transition-colors text-sm"
            >
              Visit Portfolio <IconExternalLink size={16} />
            </a>
            <a
              href="mailto:maharshipatel3851@gmail.com"
              className="inline-flex items-center gap-2 border border-white/20 text-white font-bold px-6 py-3 rounded-full hover:bg-white/10 transition-colors text-sm"
            >
              <IconMail size={16} /> Get in Touch
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default Page;
