"use client"

export type ProblemType = "standard" | "globally"

export interface ProblemData {
  id: string
  title: string
  description: string
  deliverables: string[]
  deliverablesCount: number
  type: ProblemType
}

const problems: ProblemData[] = [
  {
    id: "problem1",
    title: "SDRs and BDRs prospect manually — or at best, semi-automated.",
    description: "Your SDR team wastes time doing research, hunting for emails on Apollo or Lusha, and building non-personalized sequences in Hubspot or Apollo.",
    deliverables: [],
    deliverablesCount: 0,
    type: "standard",
  },
  {
    id: "problem2",
    title: "Paid ads bring leads, but not as qualified as you'd like.",
    description: "Meta Ads and Google Ads attract leads, but you waste too much time qualifying them — and 80% aren't even your ICP.",
    deliverables: [],
    deliverablesCount: 0,
    type: "standard",
  },
  {
    id: "problem3",
    title: "Hiring a sales team is tough",
    description: "Your company doesn't have the time, energy or resources to search for, hire, train, and onboard new sales staff members.",
    deliverables: [],
    deliverablesCount: 0,
    type: "standard",
  },
  {
    id: "problem4",
    title: "You use tools like Apollo, HubSpot, or Salesforce to automate sales.",
    description: "They help with processes, but still don't deliver the results you expect — and your team ends up wasting time setting them up and managing them.",
    deliverables: [],
    deliverablesCount: 0,
    type: "standard",
  },
  {
    id: "problem5",
    title: "Manual and operational tasks.",
    description: "Processes like handing off leads from inbound to outbound eat up your sales team's time — leaving little room for what really matters: closing deals.",
    deliverables: [],
    deliverablesCount: 0,
    type: "standard",
  },
]

export function useProblemsData() {
  return problems
}

