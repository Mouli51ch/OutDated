"use client"

import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { BorderMagicButton } from "@/components/ui/border-magic-button"
import {
  Shield,
  BookOpen,
  CheckCircle,
  Download,
  Clock,
  Mail,
  Globe,
  Tag,
  Database,
  Lock,
  Key,
  UserCheck,
  Fingerprint,
} from "lucide-react"
import { motion } from "framer-motion"

export default function WhitepaperContent() {
  const [activeSection, setActiveSection] = useState("abstract")
  const sectionRefs = {
    hero: useRef<HTMLDivElement>(null),
    abstract: useRef<HTMLDivElement>(null),
    introduction: useRef<HTMLDivElement>(null),
    objectives: useRef<HTMLDivElement>(null),
    workflow: useRef<HTMLDivElement>(null),
    security: useRef<HTMLDivElement>(null),
    conclusion: useRef<HTMLDivElement>(null),
  }

  // Handle scroll and update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200

      // Find the section that is currently in view
      for (const section in sectionRefs) {
        const element = sectionRefs[section as keyof typeof sectionRefs].current
        if (!element) continue

        const offsetTop = element.offsetTop
        const offsetHeight = element.offsetHeight

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll to section when clicking on nav link
  const scrollToSection = (section: string) => {
    const element = sectionRefs[section as keyof typeof sectionRefs].current
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      })
    }
  }

  // Animation variants for sections
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <div className="relative">
      {/* Sticky Side Navigation (desktop only) */}
      <div className="hidden lg:block fixed left-8 top-1/2 transform -translate-y-1/2 z-30">
        <div className="bg-black/80 backdrop-blur-md rounded-xl border border-white/10 p-4 shadow-lg">
          <nav className="flex flex-col space-y-4">
            {[
              { id: "abstract", label: "Abstract" },
              { id: "introduction", label: "Introduction" },
              { id: "objectives", label: "Objectives" },
              { id: "workflow", label: "Verification Workflow" },
              { id: "security", label: "Security & Privacy" },
              { id: "conclusion", label: "Conclusion" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "text-left px-4 py-2 rounded-lg transition-all duration-300",
                  activeSection === item.id
                    ? "bg-gradient-to-r from-[#00FFF5]/20 to-[#9945FF]/20 text-white border-l-2 border-[#00FFF5]"
                    : "text-gray-400 hover:text-white",
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Anchor Links (only visible on mobile) */}
      <div className="lg:hidden sticky top-20 z-30 bg-black/80 backdrop-blur-md border-y border-white/10 overflow-x-auto">
        <div className="flex whitespace-nowrap px-4 py-3">
          {[
            { id: "abstract", label: "Abstract" },
            { id: "introduction", label: "Introduction" },
            { id: "objectives", label: "Objectives" },
            { id: "workflow", label: "Workflow" },
            { id: "security", label: "Security" },
            { id: "conclusion", label: "Conclusion" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "px-3 py-1 mx-1 rounded-full text-sm transition-all duration-300",
                activeSection === item.id
                  ? "bg-gradient-to-r from-[#00FFF5]/20 to-[#9945FF]/20 text-white"
                  : "text-gray-400 hover:text-white",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section
        ref={sectionRefs.hero}
        className="relative min-h-[60vh] flex items-center justify-center py-32 px-4 md:px-8 overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Digital rain effect */}
          <div className="absolute inset-0 opacity-10">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-px bg-gradient-to-b from-transparent via-[#00FFF5] to-transparent"
                style={{
                  left: `${Math.random() * 100}%`,
                  height: `${Math.random() * 30 + 20}%`,
                  top: `-${Math.random() * 20}%`,
                  opacity: Math.random() * 0.5 + 0.3,
                  animationDuration: `${Math.random() * 10 + 10}s`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>

          {/* Circuit pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="circuit-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <path
                    d="M0 50 H100 M50 0 V100 M25 25 L75 75 M75 25 L25 75"
                    stroke="#00FFF5"
                    strokeWidth="0.5"
                    fill="none"
                  />
                  <circle cx="50" cy="50" r="3" fill="#9945FF" />
                  <circle cx="25" cy="25" r="2" fill="#00FFF5" />
                  <circle cx="75" cy="75" r="2" fill="#00FFF5" />
                  <circle cx="75" cy="25" r="2" fill="#00FFF5" />
                  <circle cx="25" cy="75" r="2" fill="#00FFF5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
            </svg>
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-[#00FFF5] to-white">
              Dataset Provider Verification Whitepaper
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Establishing trust and transparency in the data marketplace through robust identity verification
            </p>
            <BorderMagicButton size="lg" className="group">
              <Download className="mr-2 h-5 w-5 group-hover:text-[#00FFF5]" />
              <span className="group-hover:text-[#00FFF5]">Download Full Whitepaper</span>
            </BorderMagicButton>
          </motion.div>
        </div>
      </section>

      {/* Abstract Section */}
      <section ref={sectionRefs.abstract} className="py-20 px-4 md:px-8 max-w-7xl mx-auto" id="abstract">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Abstract</h2>
              <div className="bg-black/40 backdrop-blur-md rounded-xl border border-white/10 p-6 md:p-8 relative overflow-hidden">
                {/* Decorative corner elements */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#00FFF5]/30 rounded-tl-lg"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#9945FF]/30 rounded-br-lg"></div>

                <p className="text-gray-300 mb-4 relative z-10">
                  This whitepaper outlines the{" "}
                  <span className="font-bold text-white">Dataset Provider Verification</span> process for the OutDated
                  Platform, ensuring that data providers—whether individuals, organizations, or research institutes—are
                  authenticated and assigned accurate metadata tags.
                </p>
                <p className="text-gray-300 relative z-10">
                  By leveraging Decentralized Identifiers (DIDs), email and domain verification, and public credential
                  checks, we establish trust and transparency in the data marketplace.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-64 h-64">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00FFF5]/20 to-[#9945FF]/20 rounded-full blur-xl animate-pulse"></div>
                <div className="relative bg-black/60 backdrop-blur-md rounded-full border border-white/10 w-full h-full flex items-center justify-center">
                  <div className="relative">
                    <Fingerprint className="w-24 h-24 text-[#00FFF5]" />
                    <div className="absolute bottom-0 right-0 bg-black/80 rounded-full p-2 border border-white/20">
                      <Shield className="w-10 h-10 text-[#9945FF]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Introduction Section */}
      <section
        ref={sectionRefs.introduction}
        className="py-20 px-4 md:px-8 max-w-7xl mx-auto bg-black/40"
        id="introduction"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">1. Introduction</h2>
          <div className="bg-black/40 backdrop-blur-md rounded-xl border border-white/10 p-6 md:p-8 mb-8">
            <p className="text-gray-300 mb-6">
              Trustworthy data provisioning demands rigorous identity verification. This process prevents fraudulent or
              low-quality contributions and enables consumers to filter datasets by provider attributes (e.g., research
              affiliation, domain expertise).
            </p>
          </div>

          {/* Pipeline steps with icons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: UserCheck,
                title: "Validates",
                description: "Provider identity via DIDs and verifiable credentials.",
              },
              {
                icon: Globe,
                title: "Verifies",
                description: "Control of organizational emails and public URLs.",
              },
              {
                icon: Tag,
                title: "Assigns",
                description: "Standardized metadata tags based on role, sector, or specialization.",
              },
              {
                icon: BookOpen,
                title: "Logs",
                description: "Every verification step for auditability.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-black/20 backdrop-blur-md rounded-lg p-4 border border-white/5 hover:border-[#00FFF5]/20 transition-colors duration-300"
              >
                <div className="bg-gradient-to-br from-[#00FFF5]/10 to-[#9945FF]/10 rounded-lg p-3 border border-white/10">
                  <item.icon className="w-6 h-6 text-[#00FFF5]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Objectives Section */}
      <section ref={sectionRefs.objectives} className="py-20 px-4 md:px-8 max-w-7xl mx-auto" id="objectives">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-white text-center">2. Objectives</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Authentication",
                icon: Key,
                description: "Confirm provider ownership of claimed identity or organization.",
              },
              {
                title: "Verification",
                icon: CheckCircle,
                description: "Programmatically validate contact emails and public web presence.",
              },
              {
                title: "Metadata Enrichment",
                icon: Tag,
                description: "Tag providers with roles (e.g., Researcher) and domains (e.g., Medical).",
              },
              {
                title: "Transparency",
                icon: BookOpen,
                description: "Record verification results in immutable logs.",
              },
            ].map((objective, index) => (
              <div
                key={index}
                className="bg-black/40 backdrop-blur-md rounded-xl border border-white/10 p-6 hover:border-[#00FFF5]/30 transition-all duration-300 h-full"
              >
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00FFF5]/20 to-[#9945FF]/20 rounded-full blur-lg"></div>
                    <div className="relative bg-black/60 backdrop-blur-md rounded-full border border-white/10 p-4">
                      <objective.icon className="w-8 h-8 text-[#00FFF5]" />
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white text-center">{objective.title}</h3>
                <p className="text-gray-300 text-center">{objective.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Verification Workflow Section */}
      <section ref={sectionRefs.workflow} className="py-20 px-4 md:px-8 max-w-7xl mx-auto bg-black/40" id="workflow">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">3. Verification Workflow</h2>

          {/* DID Check */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-br from-[#00FFF5]/10 to-[#9945FF]/10 rounded-full p-3 border border-white/10">
                <Key className="w-6 h-6 text-[#00FFF5]" />
              </div>
              <h3 className="text-2xl font-bold text-white">3.1 Decentralized Identifier (DID) Check</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ml-4 md:ml-12">
              {[
                {
                  step: "DID Registration",
                  description:
                    "Providers register a DID (e.g., DID:sol:…) linking their on-chain address to a DID document.",
                },
                {
                  step: "Credential Presentation",
                  description:
                    "Providers present verifiable credentials (VCs) signed by recognized issuers (universities, employers).",
                },
                {
                  step: "Cryptographic Proof",
                  description: "Validate VC signatures and check revocation status via DID resolver.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-black/60 backdrop-blur-md rounded-lg border border-white/10 p-5 relative"
                >
                  <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-[#00FFF5] text-black flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{item.step}</h4>
                  <p className="text-gray-300 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Email & Domain Verification */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-br from-[#00FFF5]/10 to-[#9945FF]/10 rounded-full p-3 border border-white/10">
                <Mail className="w-6 h-6 text-[#00FFF5]" />
              </div>
              <h3 className="text-2xl font-bold text-white">3.2 Email & Domain Verification</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ml-4 md:ml-12">
              {[
                {
                  step: "Email Challenge",
                  description:
                    "Send a one-time token to the provider's email (must be corporate or organizational domain).",
                },
                {
                  step: "Domain Record Check",
                  description: "Verify DMARC/DKIM/SPF records to prevent spoofing.",
                },
                {
                  step: "Public URL Proof",
                  description:
                    "Require provider to host a JSON snippet or TXT record at a well-known URL containing their DID and token.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-black/60 backdrop-blur-md rounded-lg border border-white/10 p-5 relative"
                >
                  <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-[#9945FF] text-white flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{item.step}</h4>
                  <p className="text-gray-300 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Metadata Tag Assignment */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-br from-[#00FFF5]/10 to-[#9945FF]/10 rounded-full p-3 border border-white/10">
                <Tag className="w-6 h-6 text-[#00FFF5]" />
              </div>
              <h3 className="text-2xl font-bold text-white">3.3 Metadata Tag Assignment</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ml-4 md:ml-12 mb-8">
              <div className="bg-black/60 backdrop-blur-md rounded-lg border border-white/10 p-6">
                <h4 className="text-lg font-bold text-[#00FFF5] mb-4">Preliminary Tags</h4>
                <ul className="space-y-2">
                  {[
                    "Researcher",
                    "Medical Employee",
                    "University Affiliated",
                    "Government Data Source",
                    "Private Sector",
                  ].map((tag, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#00FFF5]"></div>
                      <span className="text-white">{tag}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-black/60 backdrop-blur-md rounded-lg border border-white/10 p-6">
                <h4 className="text-lg font-bold text-[#9945FF] mb-4">Specialty Tags</h4>
                <ul className="space-y-2">
                  {["Visually Impaired Research Institute", "Climate Science Lab", "Financial Analytics Firm"].map(
                    (tag, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#9945FF]"></div>
                        <span className="text-white">{tag}</span>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-md rounded-lg border border-white/10 p-6 ml-4 md:ml-12">
              <h4 className="text-lg font-bold text-white mb-4">Criteria for Tags</h4>
              <ul className="space-y-4">
                {[
                  {
                    tag: "Researcher",
                    criteria: "holds a VC from an academic institution.",
                  },
                  {
                    tag: "Medical Employee",
                    criteria: "email domain in a verified list of healthcare orgs and VC from medical board.",
                  },
                  {
                    tag: "University Affiliated",
                    criteria: "VC or URL proof from .edu domain.",
                  },
                  {
                    tag: "Visually Impaired Research Institute",
                    criteria:
                      "VC issued by relevant accreditation body and website demonstrates focus on assistive tech.",
                  },
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 w-3 h-3 rounded-full bg-gradient-to-r from-[#00FFF5] to-[#9945FF]"></div>
                    <div>
                      <span className="font-bold text-[#00FFF5]">{item.tag}:</span>
                      <span className="text-gray-300 ml-2">{item.criteria}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Audit & Logging */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-br from-[#00FFF5]/10 to-[#9945FF]/10 rounded-full p-3 border border-white/10">
                <BookOpen className="w-6 h-6 text-[#00FFF5]" />
              </div>
              <h3 className="text-2xl font-bold text-white">3.4 Audit & Logging</h3>
            </div>

            <div className="ml-4 md:ml-12">
              <p className="text-gray-300 mb-6">All verification events are recorded:</p>

              <div className="bg-black/80 rounded-lg p-6 font-mono text-sm overflow-x-auto mb-4">
                <pre className="text-[#00FFF5]">
                  {`provider_id: string
did: string
email_verified: boolean
domain_verified: boolean
vc_types: [string]
tags_assigned: [string]
timestamp: datetime
logs:
  - stage: DID | Email | Domain | Tagging
    result: pass | fail
    details: string`}
                </pre>
              </div>

              <p className="text-gray-300">
                Logs are appended to a tamper-evident ledger, accessible via the Admin API.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Security & Privacy Section */}
      <section ref={sectionRefs.security} className="py-20 px-4 md:px-8 max-w-7xl mx-auto" id="security">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-white">4. Security & Privacy Considerations</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Database,
                title: "Data Minimization",
                description: "Only store hashed identifiers and verification flags.",
              },
              {
                icon: Lock,
                title: "Encryption",
                description: "Encrypt logs at rest using KMS keys.",
              },
              {
                icon: Shield,
                title: "Consent",
                description: "Providers explicitly consent to verification and publishing of selected metadata.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-black/40 backdrop-blur-md rounded-xl border border-white/10 p-6 hover:border-[#00FFF5]/30 transition-all duration-300"
              >
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00FFF5]/20 to-[#9945FF]/20 rounded-full blur-lg"></div>
                    <div className="relative bg-black/60 backdrop-blur-md rounded-full border border-white/10 p-4">
                      <item.icon className="w-8 h-8 text-[#00FFF5]" />
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white text-center">{item.title}</h3>
                <p className="text-gray-300 text-center">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Conclusion Section */}
      <section
        ref={sectionRefs.conclusion}
        className="py-20 px-4 md:px-8 max-w-7xl mx-auto bg-black/40"
        id="conclusion"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">5. Conclusion</h2>

          <div className="bg-black/60 backdrop-blur-md rounded-xl border border-white/10 p-8 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#00FFF5]/30 rounded-tl-lg"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#9945FF]/30 rounded-br-lg"></div>

            <p className="text-gray-300 mb-6 relative z-10">
              By combining DIDs, verifiable credentials, and programmatic email/domain proof, the Dataset Provider
              Verification process builds a robust trust foundation. Metadata tags enable consumers to filter and choose
              data sources with confidence, improving overall marketplace quality and reliability.
            </p>

            <div className="flex justify-center">
              <div className="inline-block bg-black/40 px-6 py-2 rounded-full border border-white/10">
                <p className="text-[#00FFF5] font-mono">Version 1.0</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto bg-gradient-to-b from-black/0 to-[#00FFF5]/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to implement verification?</h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <BorderMagicButton size="lg" className="group">
              <span className="group-hover:text-[#00FFF5]">Request Integration</span>
            </BorderMagicButton>
            <BorderMagicButton size="lg" className="group">
              <Download className="mr-2 h-5 w-5 group-hover:text-[#00FFF5]" />
              <span className="group-hover:text-[#00FFF5]">Download Whitepaper PDF</span>
            </BorderMagicButton>
          </div>

          <div className="flex items-center justify-center gap-2 text-gray-400">
            <Clock className="w-4 h-4" />
            <span className="text-sm">v1.0 · Last updated May 11, 2025.</span>
          </div>
        </div>
      </section>
    </div>
  )
} 