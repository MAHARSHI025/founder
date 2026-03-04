"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  IconArrowRight,
  IconUsers,
  IconShieldCheck,
  IconRocket,
  IconWorld,
  IconMessageCircle,
  IconChartBar,
  IconHeart,
  IconBulb,
  IconTarget,
  IconHeartHandshake,
  IconChevronDown,
  IconBrandGithub,
  IconBrandX,
  IconBrandLinkedin,
  IconStarFilled,
  IconQuote,
  IconMail,
  IconMapPin,
  IconCheck,
  IconEye,
  IconTrophy,
  IconBrandInstagram,
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

const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

/* ── Data ── */
const values = [
  {
    icon: IconHeart,
    title: "Community First",
    desc: "We build for the people who use Founder — every decision starts with how it helps real businesses connect and thrive.",
  },
  {
    icon: IconShieldCheck,
    title: "Trust & Security",
    desc: "Verified profiles, encrypted communication, and transparent processes so you can collaborate with confidence.",
  },
  {
    icon: IconBulb,
    title: "Innovation",
    desc: "We constantly push boundaries — from AI-powered matching to face verification — to keep you ahead of the curve.",
  },
  {
    icon: IconWorld,
    title: "Global Reach",
    desc: "Founder connects businesses across borders, breaking geographical barriers to unlock partnerships worldwide.",
  },
  {
    icon: IconHeartHandshake,
    title: "Meaningful Connections",
    desc: "We believe in quality over quantity. Every connection on Founder is designed to create genuine business value.",
  },
  {
    icon: IconRocket,
    title: "Speed & Simplicity",
    desc: "A clean, fast experience with zero bloat. Sign up, discover, connect — all in minutes, not hours.",
  },
];

const milestones = [
  { year: "2024", title: "Idea Born", desc: "The concept for a modern B2B connection platform was sketched on a whiteboard." },
  { year: "2024", title: "First Prototype", desc: "Built the initial MVP with core market discovery and contact features." },
  { year: "2025", title: "Face Verification", desc: "Introduced AI-powered face ID verification for trusted business profiles." },
  { year: "2025", title: "1K+ Users", desc: "Crossed 1,000 registered businesses on the platform." },
  { year: "2025", title: "Real-time Chat", desc: "Launched secure real-time messaging between business contacts." },
  { year: "2026", title: "Growing Strong", desc: "Continuously improving with badges, posts, and smarter matching." },
];

const team = [
  {
    name: "Founder Team",
    role: "Engineering",
    desc: "Full-stack developers passionate about building tools that empower businesses to grow together.",
  },
  {
    name: "Design Team",
    role: "Product Design",
    desc: "Crafting intuitive, beautiful experiences that make complex B2B workflows feel effortless.",
  },
  {
    name: "Community Team",
    role: "Growth & Support",
    desc: "Dedicated to listening, supporting, and amplifying the voices of our users worldwide.",
  },
];

const stats = [
  { value: "1K+", label: "Businesses" },
  { value: "50+", label: "Cities" },
  { value: "10K+", label: "Connections" },
  { value: "99%", label: "Uptime" },
];

const faqs = [
  {
    q: "What is Founder?",
    a: "Founder is a B2B platform that helps businesses discover, connect, and collaborate with each other through verified profiles, real-time messaging, and a curated marketplace.",
  },
  {
    q: "Is Founder free to use?",
    a: "Yes! Founder is free to sign up and use. We believe in making business connections accessible to everyone.",
  },
  {
    q: "How does face verification work?",
    a: "We use AI-powered face recognition to verify that business profiles belong to real people. This builds trust across the platform.",
  },
  {
    q: "Can I use Founder internationally?",
    a: "Absolutely. Founder is designed for global use — connect with businesses in any city or country.",
  },
  {
    q: "How do I get a verified badge?",
    a: "Complete your profile, verify your identity through our face verification system, and you'll receive a verified badge on your profile.",
  },
];

function Page() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="flex flex-col items-center overflow-hidden mt-10">

      {/* ── Our Values ── */}
      <section className="w-full max-w-5xl mx-auto px-4 py-12">
        <motion.h3
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="text-center text-2xl sm:text-3xl font-bold mb-2"
        >
          Our Values
        </motion.h3>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          className="text-center text-neutral-500 text-sm sm:text-base mb-8 max-w-md mx-auto"
        >
          The principles that guide everything we build
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={i}
              className="flex flex-col p-6 rounded-2xl border border-neutral-200 bg-white hover:shadow-md transition-shadow"
            >
              <div className="w-11 h-11 rounded-xl bg-neutral-100 flex items-center justify-center mb-3">
                <value.icon size={22} stroke={1.5} />
              </div>
              <h4 className="font-bold text-lg">{value.title}</h4>
              <p className="text-neutral-500 text-sm mt-1 leading-relaxed">
                {value.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Journey / Timeline ── */}
      <section className="w-full max-w-5xl mx-auto px-4 py-14">
        <motion.h3
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="text-center text-2xl sm:text-3xl font-bold mb-2"
        >
          Our Journey
        </motion.h3>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          className="text-center text-neutral-500 text-sm sm:text-base mb-10 max-w-md mx-auto"
        >
          From an idea to a growing platform
        </motion.p>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-0.5 bg-neutral-200" />

          <div className="flex flex-col gap-8">
            {milestones.map((ms, i) => (
              <motion.div
                key={i}
                variants={i % 2 === 0 ? slideInLeft : fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={i * 0.5}
                className={`relative flex items-start gap-4 sm:gap-0 ${
                  i % 2 === 0
                    ? "sm:flex-row sm:pr-[calc(50%+2rem)]"
                    : "sm:flex-row-reverse sm:pl-[calc(50%+2rem)]"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-5 sm:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-black border-2 border-white z-10 mt-1.5" />

                {/* Card */}
                <div
                  className={`ml-12 sm:ml-0 p-5 rounded-2xl border border-neutral-200 bg-white hover:shadow-md transition-shadow w-full ${
                    i % 2 === 0 ? "sm:mr-8" : "sm:ml-8"
                  }`}
                >
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-wide">
                    {ms.year}
                  </span>
                  <h4 className="font-bold text-lg mt-1">{ms.title}</h4>
                  <p className="text-neutral-500 text-sm mt-1 leading-relaxed">
                    {ms.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Team ── */}
      <section className="w-full max-w-5xl mx-auto px-4 py-12">
        <motion.h3
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="text-center text-2xl sm:text-3xl font-bold mb-2"
        >
          The Team
        </motion.h3>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          className="text-center text-neutral-500 text-sm sm:text-base mb-8 max-w-md mx-auto"
        >
          A small team with a big vision
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={i}
              className="flex flex-col items-center text-center p-6 rounded-2xl border border-neutral-200 bg-white hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-3">
                <IconUsers size={28} stroke={1.5} className="text-neutral-500" />
              </div>
              <h4 className="font-bold text-lg">{member.name}</h4>
              <span className="text-xs font-medium text-neutral-400 uppercase tracking-wide mt-0.5">
                {member.role}
              </span>
              <p className="text-neutral-500 text-sm mt-2 leading-relaxed">
                {member.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Testimonial Highlight ── */}
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
            &ldquo;Founder completely changed how we find partners. Within a
            week, we connected with three businesses that became long-term
            collaborators. The verified profiles gave us confidence from day
            one.&rdquo;
          </p>
          <div className="mt-6">
            <h5 className="font-bold">Sarah M.</h5>
            <p className="text-neutral-400 text-sm">CEO, TechBridge Solutions</p>
          </div>
          <div className="flex justify-center gap-0.5 mt-2">
            {Array.from({ length: 5 }).map((_, s) => (
              <IconStarFilled key={s} size={16} className="text-yellow-400" />
            ))}
          </div>
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
          Frequently Asked Questions
        </motion.h3>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          className="text-center text-neutral-500 text-sm sm:text-base mb-8 max-w-md mx-auto"
        >
          Everything you need to know
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


      {/* ── Footer ── */}
      <footer className="w-full max-w-5xl mx-auto px-4 py-10 mt-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-neutral-200 pt-8">
          <div className="text-center sm:text-left">
            <h4 className="font-bold text-lg">FOUNDER</h4>
            <p className="text-neutral-400 text-xs mt-0.5">
              &copy; {new Date().getFullYear()} Founder. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/about"
              className="text-neutral-400 hover:text-black transition-colors text-sm"
            >
              About
            </Link>
            <Link
              href="/market"
              className="text-neutral-400 hover:text-black transition-colors text-sm"
            >
              Market
            </Link>
            <Link
              href="/contact"
              className="text-neutral-400 hover:text-black transition-colors text-sm"
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <a href="https://github.com/MAHARSHI025" className="text-neutral-400 hover:text-black transition-colors">
              <IconBrandGithub size={18} />
            </a>
            <a href="https://www.instagram.com/_maharshi_025" className="text-neutral-400 hover:text-black transition-colors">
              <IconBrandInstagram size={18} />
            </a>
            <a href="https://www.linkedin.com/in/maharshi-patel-9a9a29261" className="text-neutral-400 hover:text-black transition-colors">
              <IconBrandLinkedin size={18} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Page;
