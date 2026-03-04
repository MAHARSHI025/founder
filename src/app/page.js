'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Elevation from "@/components/element/Elevation";
import { NumberTicker } from "@/components/NumberTicker";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import {
  IconUsers,
  IconLink,
  IconShieldCheck,
  IconHandClick,
  IconBriefcase,
  IconMessageCircle,
  IconChartBar,
  IconArrowRight,
  IconSearch,
  IconUserPlus,
  IconRocket,
  IconLock,
  IconWorld,
  IconDeviceAnalytics,
  IconChevronDown,
  IconQuote,
  IconStarFilled,
  IconBrandGithub,
  IconBrandX,
  IconBrandLinkedin,
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
    transition: { duration: 0.5, delay: i * 0.15, ease: "easeOut" },
  }),
};

/* ── Data ── */
const stats = [
  { value: 30, label: "Clients", icon: IconUsers },
  { value: 25, label: "Connections", icon: IconLink },
  { value: 15, label: "Verified", icon: IconShieldCheck },
];

const features = [
  { icon: IconHandClick, title: "Make Contacts", desc: "Discover and connect with businesses worldwide" },
  { icon: IconBriefcase, title: "Get Collab", desc: "Partner on projects and grow together" },
  { icon: IconMessageCircle, title: "Chat Partner", desc: "Real-time messaging with your network" },
  { icon: IconChartBar, title: "Business Profile", desc: "Showcase your brand and track growth" },
];

const steps = [
  { icon: IconSearch, title: "Discover", desc: "Browse verified businesses and find partners that match your goals." },
  { icon: IconUserPlus, title: "Connect", desc: "Send contact requests and start building meaningful relationships." },
  { icon: IconMessageCircle, title: "Collaborate", desc: "Chat in real-time, share ideas and plan your next big move." },
  { icon: IconRocket, title: "Grow", desc: "Scale your network and unlock new business opportunities together." },
];

const highlights = [
  { icon: IconLock, title: "Face ID Security", desc: "Biometric verification keeps your account safe and trusted." },
  { icon: IconWorld, title: "Global Reach", desc: "Connect with businesses from any industry, anywhere in the world." },
  { icon: IconDeviceAnalytics, title: "Smart Insights", desc: "Track your profile views, connections, and engagement at a glance." },
];

const testimonials = [
  { name: "Arjun M.", role: "CEO, NovaTech", text: "Founder helped us find 3 key partners in our first month. The platform is incredibly intuitive.", rating: 5 },
  { name: "Sara K.", role: "Founder, Bloom Studio", text: "The real-time chat and verified profiles make it easy to trust who you're working with.", rating: 5 },
  { name: "David L.", role: "CTO, Aspire Labs", text: "We grew our B2B network by 200% in just two months. Highly recommend Founder.", rating: 4 },
];

const faqs = [
  { q: "Is Founder free to use?", a: "Yes! You can create an account, build your profile, and start connecting for free. Premium features may be introduced later." },
  { q: "How does Face ID verification work?", a: "We use on-device facial recognition to verify your identity. Your biometric data never leaves your browser — it's fully private." },
  { q: "Can I message anyone on the platform?", a: "You can message anyone in your contacts. Send a contact request first, and once accepted, chat is instantly available." },
  { q: "What kind of businesses use Founder?", a: "Startups, agencies, freelancers, and enterprises across all industries use Founder to discover partners and grow together." },
];

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="flex flex-col items-center w-full overflow-hidden">
      {/* ── Hero Section ── */}
      <section className="flex flex-col items-center text-center pt-20 sm:pt-28 pb-10 px-4 w-full max-w-4xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="inline-block mb-3 px-3 py-1 rounded-full border border-neutral-300 text-xs font-medium tracking-wide text-neutral-500 uppercase"
        >
          B2B Platform
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] title Sansation"
          style={{ fontFamily: "Sansation !important" }}
        >
          <span className="bg-linear-to-r from-black via-neutral-700 to-black bg-clip-text text-transparent">
            FOUNDER
          </span>
        </motion.h1>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="flex items-center gap-1.5 text-lg sm:text-2xl font-medium mt-2 flex-wrap justify-center"
        >
          Welcome to the
          <PointerHighlight
            rectangleClassName="border-black rounded-md p-1"
            pointerClassName="text-blue-900"
            containerClassName="inline-block"
          >
            <span className="px-2">business</span>
          </PointerHighlight>
          hub
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="text-sm sm:text-base text-neutral-500 mt-2 max-w-md"
        >
          A smart platform that provides seamless B-to-B connections,
          collaboration, and growth.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
          className="flex gap-3 mt-5"
        >
          <Elevation>
            <Link href="/market" className="font-bold flex items-center gap-1">
              Get Started <IconArrowRight size={16} />
            </Link>
          </Elevation>
          <Elevation>
            <Link href="/" className="font-bold">
              Read Docs
            </Link>
          </Elevation>
        </motion.div>
      </section>

      {/* ── Stats Section ── */}
      <section className="w-full max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              custom={i}
            >
              <Elevation className="flex items-center justify-center gap-3 w-full py-4">
                <stat.icon size={28} stroke={1.5} />
                <NumberTicker value={stat.value} duration={1200} style={{ fontSize: "2rem" }} />
                <span className="font-semibold text-xl sm:text-2xl">{stat.label}</span>
              </Elevation>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="w-full max-w-5xl mx-auto px-4 py-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
          className="flex flex-col md:flex-row gap-6 bg-black rounded-2xl p-8 md:p-10 items-center"
        >
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-white text-3xl sm:text-5xl font-bold leading-tight">
              Find, Collab
              <br className="hidden sm:block" /> &amp; Grow
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-3 leading-relaxed max-w-md">
              Connect businesses, streamline communication, and accelerate growth
              through secure and seamless collaboration.
            </p>
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="shrink-0"
          >
            <Link
              href="/market"
              className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-full hover:bg-neutral-100 transition-colors"
            >
              Explore Market <IconArrowRight size={18} />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Features Grid ── */}
      <section className="w-full max-w-5xl mx-auto px-4 py-8">
        <motion.h3
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="text-center text-2xl sm:text-3xl font-bold mb-6"
        >
          Everything you need
        </motion.h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={i}
            >
              <Elevation className="flex items-start gap-4 w-full justify-start! text-left py-5 px-5">
                <div className="p-2 bg-neutral-100 rounded-lg shrink-0">
                  <feat.icon size={24} stroke={1.5} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">{feat.title}</h4>
                  <p className="text-neutral-500 text-sm mt-0.5">{feat.desc}</p>
                </div>
              </Elevation>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="w-full max-w-5xl mx-auto px-4 py-12">
        <motion.h3
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="text-center text-2xl sm:text-3xl font-bold mb-2"
        >
          How it works
        </motion.h3>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          className="text-center text-neutral-500 text-sm sm:text-base mb-8 max-w-lg mx-auto"
        >
          Get started in four simple steps
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={i}
              className="relative"
            >
              <div className="flex flex-col items-center text-center p-5 rounded-xl border border-neutral-200 bg-white hover:shadow-md transition-shadow h-full">
                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-lg font-bold mb-3">
                  {i + 1}
                </div>
                <step.icon size={28} stroke={1.5} className="mb-2 text-neutral-700" />
                <h4 className="font-bold text-lg">{step.title}</h4>
                <p className="text-neutral-500 text-sm mt-1 leading-relaxed">{step.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 text-neutral-300">
                  <IconArrowRight size={20} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Highlight Cards (alternating layout) ── */}
      <section className="w-full max-w-5xl mx-auto px-4 py-10">
        <motion.h3
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="text-center text-2xl sm:text-3xl font-bold mb-2"
        >
          Why choose Founder
        </motion.h3>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          className="text-center text-neutral-500 text-sm sm:text-base mb-8 max-w-md mx-auto"
        >
          Built for trust, speed, and scale
        </motion.p>

        <div className="flex flex-col gap-5">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={i}
              className={`flex flex-col sm:flex-row items-center gap-5 p-6 rounded-2xl border border-neutral-200 bg-white ${i % 2 !== 0 ? "sm:flex-row-reverse" : ""
                }`}
            >
              <div className="w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center shrink-0">
                <item.icon size={32} stroke={1.5} />
              </div>
              <div className={`text-center ${i % 2 !== 0 ? "sm:text-right" : "sm:text-left"}`}>
                <h4 className="font-bold text-xl">{item.title}</h4>
                <p className="text-neutral-500 text-sm sm:text-base mt-1 max-w-md">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="w-full max-w-5xl mx-auto px-4 py-10">
        <motion.h3
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="text-center text-2xl sm:text-3xl font-bold mb-2"
        >
          What people say
        </motion.h3>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          className="text-center text-neutral-500 text-sm sm:text-base mb-8 max-w-md mx-auto"
        >
          Trusted by businesses across the globe
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={i}
              className="flex flex-col justify-between p-6 rounded-2xl border border-neutral-200 bg-white hover:shadow-md transition-shadow"
            >
              <div>
                <IconQuote size={24} className="text-neutral-300 mb-2" />
                <p className="text-neutral-600 text-sm leading-relaxed">{t.text}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-sm">{t.name}</h5>
                  <p className="text-neutral-400 text-xs">{t.role}</p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <IconStarFilled key={s} size={14} className="text-yellow-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="w-full max-w-3xl mx-auto px-4 py-10">
        <motion.h3
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="text-center text-2xl sm:text-3xl font-bold mb-2"
        >
          Frequently asked questions
        </motion.h3>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          className="text-center text-neutral-500 text-sm sm:text-base mb-6 max-w-md mx-auto"
        >
          Got questions? We have answers.
        </motion.p>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              custom={i}
              className="border border-neutral-200 rounded-xl overflow-hidden bg-white"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left font-semibold text-sm sm:text-base hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                {faq.q}
                <motion.span
                  animate={{ rotate: openFaq === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <IconChevronDown size={18} />
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

      {/* ── Final CTA ── */}
      <section className="w-full max-w-5xl mx-auto px-4 py-10">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
          className="relative rounded-2xl bg-linear-to-br from-neutral-900 to-black p-10 sm:p-14 text-center overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />
          <h2 className="relative text-white text-3xl sm:text-5xl font-bold leading-tight">
            Ready to grow your business?
          </h2>
          <p className="relative text-neutral-400 text-sm sm:text-base mt-3 max-w-lg mx-auto">
            Join Founder today and start building connections that matter. It only takes a minute.
          </p>
          <div className="relative flex flex-col sm:flex-row gap-3 justify-center mt-6">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 bg-white text-black font-bold px-8 py-3 rounded-full hover:bg-neutral-100 transition-colors"
            >
              Create Account <IconArrowRight size={18} />
            </Link>
            <Link
              href="/market"
              className="inline-flex items-center justify-center gap-2 border border-neutral-500 text-neutral-300 font-bold px-8 py-3 rounded-full hover:border-white hover:text-white transition-colors"
            >
              Browse Market
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="w-full max-w-5xl mx-auto px-4 py-8 border-t border-neutral-200 mt-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="font-bold text-lg">Founder</h4>
            <p className="text-neutral-400 text-xs mt-0.5">by thoughter</p>
          </div>
          <div className="flex gap-6 text-sm text-neutral-500">
            <Link href="/market" className="hover:text-black transition-colors">Market</Link>
            <Link href="/contact" className="hover:text-black transition-colors">Contacts</Link>
            <Link href="/chat" className="hover:text-black transition-colors">Chat</Link>
            <Link href="/profile" className="hover:text-black transition-colors">Profile</Link>
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
        <p className="text-center text-neutral-300 text-xs mt-6">&copy; 2026 Founder. All rights reserved.</p>
      </footer>
    </div>
  );
}
