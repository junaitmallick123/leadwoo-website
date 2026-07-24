"use client";
/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element */

import { useState } from "react";
import {
  FaArrowRight, FaBars, FaBolt, FaCheck, FaEnvelope, FaGlobe, FaLinkedinIn,
  FaLocationDot, FaPhone, FaRobot, FaWhatsapp, FaXTwitter, FaYoutube,
} from "react-icons/fa6";

export const supportedRoutes = [
  "about", "articles", "customer_support_agent", "digital_marketing",
  "email-landingpage", "linkedin-landingpage", "plans", "privacy",
  "signallanding", "termsandservice", "voice_agent", "voicelandingpage",
  "website_builder", "whatsapp-landingpage", "whatsapp_agent",
];

type Product = {
  eyebrow: string; title: string; accent: string; description: string;
  icon: React.ReactNode; features: string[]; stat: string; statLabel: string;
};

const products: Record<string, Product> = {
  "linkedin-landingpage": {
    eyebrow: "LinkedIn Automation", title: "Turn LinkedIn into your", accent: "best growth channel",
    description: "Find the right prospects, connect naturally, and follow up automatically—without losing the human touch.",
    icon: <FaLinkedinIn />, features: ["Smart prospect discovery", "Personalised sequences", "Automated follow-ups", "Campaign analytics"], stat: "3×", statLabel: "more conversations",
  },
  "email-landingpage": {
    eyebrow: "Email Automation", title: "Send outreach that earns", accent: "real replies",
    description: "Launch reliable, personalised email campaigns with warm inboxes, verified contacts, and clear performance tracking.",
    icon: <FaEnvelope />, features: ["Multi-inbox campaigns", "Email warm-up", "Bounce protection", "Sequence analytics"], stat: "9", statLabel: "inboxes supported",
  },
  "whatsapp-landingpage": {
    eyebrow: "WhatsApp Automation", title: "Move every lead from", accent: "hello to booked",
    description: "Create responsive WhatsApp journeys, automate follow-ups, and keep every conversation connected to your CRM.",
    icon: <FaWhatsapp />, features: ["Meta-approved flows", "Instant lead replies", "Smart follow-ups", "CRM sync"], stat: "24/7", statLabel: "lead engagement",
  },
  "voicelandingpage": {
    eyebrow: "Voice AI Agent", title: "Every customer call,", accent: "answered intelligently",
    description: "Deploy English and Hindi AI voice agents for qualification, support, reminders, and appointment booking.",
    icon: <FaPhone />, features: ["Natural AI conversations", "English + Hindi", "Concurrent calling", "Full API access"], stat: "15", statLabel: "concurrent calls",
  },
  "voice_agent": {
    eyebrow: "AI Voice Agent", title: "A voice that works while", accent: "your team grows",
    description: "Handle inbound and outbound calls with a fast, consistent AI agent that never misses a follow-up.",
    icon: <FaPhone />, features: ["Inbound and outbound", "Custom call scripts", "Call summaries", "CRM handoff"], stat: "₹3", statLabel: "per usage minute",
  },
  "whatsapp_agent": {
    eyebrow: "WhatsApp AI Agent", title: "An always-on agent for", accent: "every WhatsApp lead",
    description: "Qualify prospects, answer questions, and move conversations forward with an AI agent trained for your business.",
    icon: <FaWhatsapp />, features: ["AI qualification", "Knowledge-based replies", "Human handover", "Conversation history"], stat: "<1m", statLabel: "response time",
  },
  "customer_support_agent": {
    eyebrow: "Customer Support Agent", title: "Fast support that still", accent: "feels personal",
    description: "Give customers accurate answers across channels and route complex conversations to the right teammate.",
    icon: <FaRobot />, features: ["Knowledge-base answers", "Ticket categorisation", "Smart escalation", "Conversation insights"], stat: "24/7", statLabel: "customer support",
  },
  "website_builder": {
    eyebrow: "AI Website Builder", title: "Launch a website built to", accent: "convert",
    description: "Turn your offer into a fast, responsive website with clear messaging, polished design, and lead capture built in.",
    icon: <FaGlobe />, features: ["Responsive design", "Conversion-first copy", "Lead capture forms", "Fast publishing"], stat: "10×", statLabel: "faster launch",
  },
  "digital_marketing": {
    eyebrow: "WooAgent", title: "Meet your AI", accent: "marketing employee",
    description: "Plan campaigns, create ads, analyse performance, and manage your growth from one connected workspace.",
    icon: <FaBolt />, features: ["Campaign planning", "Creative assistance", "Performance insights", "CRM + WhatsApp"], stat: "1", statLabel: "connected workspace",
  },
  "signallanding": {
    eyebrow: "Buyer Signals", title: "Reach prospects when", accent: "intent is highest",
    description: "Use meaningful activity and engagement signals to prioritise the people most likely to start a conversation.",
    icon: <FaBolt />, features: ["Intent monitoring", "Lead prioritisation", "Timely outreach", "Signal-based sequences"], stat: "2×", statLabel: "better timing",
  },
};

const planModules = [
  { name: "LinkedIn Automation", note: "Per LinkedIn account", icon: <FaLinkedinIn />, cls: "blue", prices: ["₹3,500 / month", "₹7,500 / 3 months", "₹12,000 / 6 months"] },
  { name: "Email Automation", note: "Includes 2 domains", icon: <FaEnvelope />, cls: "red", prices: ["₹2,500 / month", "₹6,000 / 3 months", "₹8,000 / 6 months"] },
  { name: "WhatsApp Automation", note: "Automated conversations at scale", icon: <FaWhatsapp />, cls: "green", prices: ["₹1,500 / month", "₹3,600 / 3 months", "₹6,000 / 6 months"] },
];

const Check = () => <span className="tick"><FaCheck /></span>;

function Header() {
  const [open, setOpen] = useState(false);
  return <header className="lw-header">
    <a href="/" className="lw-logo"><img src="/leadwoo-logo.png" alt="LeadWoo" /></a>
    <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Open menu"><FaBars /></button>
    <nav className={open ? "open" : ""}>
      <div className="nav-group"><span>Products</span><div className="mega">
        <a href="/linkedin-landingpage"><FaLinkedinIn /> LinkedIn Automation</a>
        <a href="/email-landingpage"><FaEnvelope /> Email Automation</a>
        <a href="/whatsapp-landingpage"><FaWhatsapp /> WhatsApp Automation</a>
        <a href="/voicelandingpage"><FaPhone /> Voice AI Agent</a>
        <a href="/digital_marketing"><FaRobot /> WooAgent</a>
      </div></div>
      <a href="/plans">Pricing</a><a href="/articles">Blog</a><a href="/about">About</a>
    </nav>
    <div className="header-cta"><a className="login" href="https://app.tryleadwoo.com/">Sign in</a><a className="btn primary" href="mailto:vishal@getleadwoo.com?subject=LeadWoo%20demo">Book a demo <FaArrowRight /></a></div>
  </header>;
}

function Footer() {
  return <footer className="lw-footer"><div className="footer-grid">
    <div><h4>Solutions</h4><a href="/email-landingpage">Email Automation</a><a href="/linkedin-landingpage">LinkedIn Automation</a><a href="/whatsapp-landingpage">WhatsApp Automation</a><a href="/voicelandingpage">Voice Agent</a><a href="/digital_marketing">WooAgent</a></div>
    <div><h4>Products</h4><a href="/voice_agent">AI Voice Agent</a><a href="/whatsapp_agent">WhatsApp Agent</a><a href="/customer_support_agent">Support Agent</a><a href="/website_builder">Website Builder</a><a href="/digital_marketing">Digital Marketing Agent</a></div>
    <div><h4>Company</h4><a href="/about">About</a><a href="/plans">Pricing</a><a href="/articles">Blog</a><a href="mailto:vishal@getleadwoo.com">Contact</a><a href="/privacy">Privacy</a></div>
    <div className="contact"><h4>Get in touch</h4><a href="mailto:vishal@getleadwoo.com"><FaEnvelope /> vishal@getleadwoo.com</a><a href="https://getleadwoo.com/"><FaGlobe /> getleadwoo.com</a><p><FaLocationDot /> Made with care, shipped from Bangalore.</p><div className="social"><a href="https://www.linkedin.com/company/getleadwoo/" aria-label="LinkedIn"><FaLinkedinIn /></a><a href="https://twitter.com" aria-label="X"><FaXTwitter /></a><a href="https://youtube.com" aria-label="YouTube"><FaYoutube /></a></div></div>
  </div><div className="footer-base"><b>Leadwoo</b><span>© 2026 Leadwoo. All rights reserved.</span><a href="/privacy">Privacy Policy</a><a href="/termsandservice">Terms of Service</a><span className="status">● All systems operational</span></div></footer>;
}

function Shell({ children }: { children: React.ReactNode }) {
  return <><Header /><main>{children}</main><Footer /></>;
}

function HomePage() {
  return <Shell>
    <section className="home-hero dot-bg"><div className="hero-copy"><span className="pill">✦ AI-powered outreach, one connected platform</span><h1>Turn more prospects into <em>conversations.</em></h1><p>LeadWoo brings LinkedIn, email, WhatsApp, voice AI, and CRM together—so your team can reach the right people and grow without the busywork.</p><div className="actions"><a className="btn primary" href="mailto:vishal@getleadwoo.com?subject=Book%20a%20LeadWoo%20demo">Book a free demo <FaArrowRight /></a><a className="btn secondary" href="/plans">Explore pricing</a></div><div className="mini-trust"><span><Check /> Guided onboarding</span><span><Check /> Built for Indian teams</span><span><Check /> Scale anytime</span></div></div>
    <div className="hero-visual"><div className="orbit o1"><FaLinkedinIn /></div><div className="orbit o2"><FaEnvelope /></div><div className="orbit o3"><FaWhatsapp /></div><div className="dashboard"><div className="dash-top"><span></span><span></span><span></span></div><small>OUTREACH PERFORMANCE</small><h3>Growth workspace</h3><div className="metric"><b>1,284</b><span>Prospects reached</span></div><div className="bars"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><div className="dash-row"><span><b>42%</b> Reply rate</span><span><b>86</b> Meetings</span></div></div></div></section>
    <section className="logo-strip"><span>One platform for modern revenue teams</span><b>LinkedIn</b><b>Email</b><b>WhatsApp</b><b>Voice AI</b><b>CRM</b></section>
    <section className="section"><div className="section-head"><span>THE LEADWOO PLATFORM</span><h2>Every growth channel, <em>working together</em></h2><p>Choose the tools you need today and add more as your outreach grows.</p></div><div className="solution-grid">
      {Object.entries(products).slice(0,6).map(([slug,p])=><a className="solution-card" href={`/${slug}`} key={slug}><div>{p.icon}</div><h3>{p.eyebrow}</h3><p>{p.description}</p><span>Explore solution <FaArrowRight /></span></a>)}
    </div></section>
    <section className="dark-band"><div><span>MORE THAN AUTOMATION</span><h2>Your team gets a smarter way to <em>grow.</em></h2></div><div className="outcome-grid"><article><b>01</b><h3>Find the right people</h3><p>Focus outreach on prospects who match your ideal customer profile.</p></article><article><b>02</b><h3>Start better conversations</h3><p>Use relevant, personalised messages across every channel.</p></article><article><b>03</b><h3>Turn interest into revenue</h3><p>Keep leads organised and guide every opportunity forward.</p></article></div></section>
    <CTA />
  </Shell>;
}

function ProductPage({ product }: { product: Product }) {
  return <Shell><section className="product-hero dot-bg"><div><span className="pill">{product.eyebrow}</span><h1>{product.title} <em>{product.accent}.</em></h1><p>{product.description}</p><div className="actions"><a className="btn primary" href={`mailto:vishal@getleadwoo.com?subject=${encodeURIComponent(product.eyebrow)}%20demo`}>Book a free demo <FaArrowRight /></a><a className="btn secondary" href="/plans">See pricing</a></div></div><div className="product-art"><div className="big-icon">{product.icon}</div><span>{product.stat}</span><p>{product.statLabel}</p></div></section>
    <section className="section"><div className="section-head"><span>BUILT TO PERFORM</span><h2>Everything you need to <em>move faster</em></h2></div><div className="feature-grid">{product.features.map((f,i)=><article key={f}><b>0{i+1}</b><Check /><h3>{f}</h3><p>Simple to set up, easy for your team to use, and connected to the rest of your LeadWoo workflow.</p></article>)}</div></section>
    <section className="split-section"><div><span>ONE CONNECTED WORKFLOW</span><h2>Built for execution, not more complexity.</h2><p>LeadWoo keeps activity, conversations, and results in one place so your team always knows what to do next.</p></div><div className="workflow"><span>Discover</span><i>→</i><span>Engage</span><i>→</i><span>Qualify</span><i>→</i><span>Convert</span></div></section><CTA /></Shell>;
}

function PricingPage() {
  return <Shell><section className="pricing-hero dot-bg"><span className="pill">✣ Simple, flexible pricing</span><h1>Choose the right plan<br/>for your <em>growth</em></h1><p>From individual outreach modules to complete AI-powered growth systems. Start with what you need and scale when you’re ready.</p><div className="actions"><a className="btn primary" href="#plans">Explore plans ↓</a><a className="btn secondary" href="mailto:vishal@getleadwoo.com?subject=Help%20me%20choose">Help me choose</a></div><div className="mini-trust"><span><Check /> Flexible plans</span><span><Check /> Guided onboarding</span><span><Check /> Scale anytime</span></div></section>
  <section className="section" id="plans"><div className="section-head"><span>PAY PER MODULE</span><h2>Build your own <em>outreach stack</em></h2><p>Choose only the channels you need. Longer billing cycles give you the best value.</p></div><div className="plan-grid">{planModules.map(m=><article className="plan-card" key={m.name}><div className={`plan-icon ${m.cls}`}>{m.icon}</div><h3>{m.name}</h3><p>{m.note}</p><div className="price-list">{m.prices.map((price,i)=><div className={i===2?"best":""} key={price}><Check /><span>{price}</span>{i===2&&<b>Best value</b>}</div>)}</div><a href={`mailto:vishal@getleadwoo.com?subject=${encodeURIComponent(m.name)}`}>Choose this module <FaArrowRight /></a></article>)}</div></section>
  <section className="personal-plan"><div><span>PERSONAL BRANDING</span><h2>Turn your LinkedIn into a <em>growth channel</em></h2><p>Strategy, content, profile enhancement, and end-to-end outreach automation—managed as one focused plan.</p><div className="check-grid">{["4 LinkedIn posts per month","Profile enhancement","End-to-end automation","ICP extraction","GTM strategy","1 LinkedIn account"].map(x=><span key={x}><Check />{x}</span>)}</div></div><article><div className="popular">MOST POPULAR</div><h3><FaLinkedinIn /> LinkedIn Personal Branding</h3><div className="price-list"><div><Check /><span><strong>₹8,000</strong> / month</span></div><div><Check /><span><strong>₹15,000</strong> / 3 months</span></div><div className="best"><Check /><span><strong>₹24,000</strong> / 6 months</span><b>Best value</b></div></div><a className="btn primary" href="mailto:vishal@getleadwoo.com?subject=LinkedIn%20Personal%20Branding">Get this plan <FaArrowRight /></a></article></section>
  <section className="voice-pricing"><div className="section-head light"><span>VOICE AGENT + CRM</span><h2>Let your AI agent handle the <em>conversation</em></h2></div><div className="voice-grid">{[["Voice Agent 500","₹3,000","500 minutes","1 AI agent","3 concurrent calls"],["Voice Agent 1000","₹5,000","1,000 minutes","5 AI agents","15 concurrent calls"]].map((v,i)=><article className={i?"featured":""} key={v[0]}><small>{i?"SCALE":"STARTER"}</small><h3>{v[0]}</h3><b>{v[1]}<em>/month</em></b>{v.slice(2).map(x=><span key={x}><Check />{x}</span>)}<span><Check />English + Hindi</span><span><Check />Full API access</span><a className={`btn ${i?"primary":"ghost"}`} href={`mailto:vishal@getleadwoo.com?subject=${encodeURIComponent(v[0])}`}>Choose plan</a></article>)}</div></section>
  <section className="woo-plan"><div><span>ALL-IN-ONE AI MARKETING</span><h2>Meet <em>WooAgent</em>, your AI marketing employee</h2><p>Plan, create, manage, and analyse your digital marketing from one connected workspace.</p></div><article><small>COMPLETE GROWTH SYSTEM</small><b>₹4,000<em>/month</em></b><p>CRM + WhatsApp + WooAgent</p><a className="btn dark" href="mailto:vishal@getleadwoo.com?subject=WooAgent">Get WooAgent <FaArrowRight /></a></article></section><CTA /></Shell>;
}

function AboutPage() {
  return <Shell><section className="simple-hero dot-bg"><span className="pill">ABOUT LEADWOO</span><h1>Growth should feel more <em>human.</em></h1><p>We’re building practical AI tools that help ambitious teams create meaningful conversations, work smarter, and grow consistently.</p></section><section className="about-story"><div><span>OUR STORY</span><h2>One platform. Every conversation.</h2></div><div><p>LeadWoo started with a simple observation: teams were spending too much time switching between disconnected outreach tools and too little time speaking with customers.</p><p>We brought LinkedIn, email, WhatsApp, voice AI, CRM, and marketing intelligence into one connected system—built for real teams and real growth.</p></div></section><section className="values">{["Practical AI","Human conversations","Measurable growth"].map((x,i)=><article key={x}><b>0{i+1}</b><h3>{x}</h3><p>Technology should make good work easier, clearer, and more effective.</p></article>)}</section><CTA /></Shell>;
}

function ArticlesPage() {
  const posts=[["Outbound that feels human","How to personalise automation without making your outreach sound automated."],["The modern LinkedIn growth system","A practical framework for finding prospects and starting better conversations."],["WhatsApp follow-ups that convert","How fast, relevant replies help teams move leads forward."],["What a Voice AI Agent can handle","Where AI calling creates value—and where the human team should step in."],["A simpler revenue tech stack","Why connected tools outperform scattered workflows."],["Meet WooAgent","A closer look at the AI marketing employee for growing businesses."]];
  return <Shell><section className="simple-hero dot-bg"><span className="pill">LEADWOO INSIGHTS</span><h1>Ideas for smarter, more <em>human growth.</em></h1><p>Practical guides on outreach, automation, AI agents, and building a modern revenue engine.</p></section><section className="article-grid">{posts.map((p,i)=><article key={p[0]}><div className={`article-art a${i%3}`}><span>0{i+1}</span></div><small>GROWTH PLAYBOOK · 6 MIN READ</small><h2>{p[0]}</h2><p>{p[1]}</p><a href="mailto:vishal@getleadwoo.com?subject=LeadWoo%20article">Read article <FaArrowRight /></a></article>)}</section></Shell>;
}

function LegalPage({ type }: { type: "privacy"|"terms" }) {
  const privacy=type==="privacy"; return <Shell><section className="legal"><span>LAST UPDATED: JULY 2026</span><h1>{privacy?"Privacy Policy":"Terms of Service"}</h1><p>This page explains how LeadWoo handles information and the terms that apply when you use our website and services.</p>{(privacy?["Information we collect","How we use information","Data protection and retention","Your choices and rights","Contact us"]:["Using LeadWoo","Accounts and acceptable use","Subscriptions and payments","Service availability","Liability and contact"]).map((h,i)=><article key={h}><h2>{i+1}. {h}</h2><p>We collect and use only the information reasonably required to provide, secure, improve, and support LeadWoo services. Specific commercial terms may also be described in your order form or service agreement.</p></article>)}</section></Shell>;
}

function CTA(){return <section className="global-cta"><span>READY TO GROW?</span><h2>Turn your outreach into a <em>growth engine.</em></h2><p>Tell us what you want to automate. We’ll help you choose the right setup.</p><a className="btn white" href="mailto:vishal@getleadwoo.com?subject=Book%20a%20LeadWoo%20demo">Book a free demo <FaArrowRight /></a></section>}

export function LeadWooPage({ route }: { route: string }) {
  if(route==="home") return <HomePage />;
  if(route==="plans") return <PricingPage />;
  if(route==="about") return <AboutPage />;
  if(route==="articles") return <ArticlesPage />;
  if(route==="privacy" || route==="termsandservice") return <LegalPage type={route==="privacy"?"privacy":"terms"} />;
  return <ProductPage product={products[route] ?? products.digital_marketing} />;
}
