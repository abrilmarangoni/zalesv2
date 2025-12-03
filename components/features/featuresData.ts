"use client"

export type FeatureType = "ai" | "content" | "outbound" | "globally"

export interface FeatureData {
  id: string
  title: string
  description: string
  deliverables: string[]
  deliverablesCount: number
  type: FeatureType
}

const features: FeatureData[] = [
  {
    id: "revops",
    title: "AI RevOps Agents",
    description:
      "Sophisticated AI Agents that capture insights, update the CRM, route leads instantly, trigger next steps, and escalate exceptions—end to end. Outcomes: Faster speed-to-lead, a cleaner CRM, consistent follow-up, fewer manual hours per rep, and a more reliable pipeline.",
    deliverables: [
      "Custom AI Agents",
      "AI Agent Calendar",
      "SDRs Enablement",
      "AEs Enablement",
      "TAL Creation",
      "Lead Routing",
      "Lead Scoring",
      "Signal Tracking",
      "Phone Numbers",
      "Sequences",
      "Slack Notifications",
      "CRM Workflows",
      "CRM Clean-Up",
      "CRM Enrichment",
      "Inbound Enrichment",
      "Job-Change Tracking",
      "Data Formatting",
      "Product Analytics",
      "Lifecycle Stages",
      "Analytics Reports",
    ],
    deliverablesCount: 20,
    type: "ai",
  },
  {
    id: "content",
    title: "Content Machine",
    description:
      "A ZalesMachine-built platform that transforms call transcripts, technical YouTube videos, Reddit threads, and podcasts into high-quality technical posts that position you as the go-to authority in your niche.",
    deliverables: [
      "Graph CMS Distribution",
      "LinkedIn Distribution",
      "Team Interviews",
      "Customer Interviews",
      "Strategic Ideation",
      "Content Calendar",
      "Creative Design",
      "Case Study Creation",
      "Analytics Reports",
      "Attribution Setup",
      "LinkedIn Profile Optimization",
      "Sales Enablement",
      "Lifecycle Sequences",
      "Directory Listings",
    ],
    deliverablesCount: 14,
    type: "content",
  },
  {
    id: "outbound",
    title: "Outbound Machine",
    description:
      "A proven system created by ZalesMachine that automates prospecting end-to-end — from ICP definition and TAM build to enrichment, multichannel outreach, and booked calls.",
    deliverables: [
      "Graph Email Prospecting",
      "LinkedIn Prospecting",
      "ICP Modeling",
      "TAM Map",
      "Email Infrastructure",
      "Plays Selection",
      "Tools Selection",
      "List Building",
      "Contact Sourcing",
      "Data Enrichment",
      "Lead Scoring",
      "Personalized Copywriting",
      "ICP Connection Requests",
      "AI Reply Drafts",
      "CRM Workflows",
      "CRM Sync",
      "Analytics Reports",
    ],
    deliverablesCount: 17,
    type: "outbound",
  },
  {
    id: "global",
    title: "Globally Usable",
    description:
      "We work globally, serving clients across multiple countries and regions. Our proven system delivers results regardless of location.",
    deliverables: [],
    deliverablesCount: 0,
    type: "globally",
  },
]

export function useFeaturesData() {
  return features
}

