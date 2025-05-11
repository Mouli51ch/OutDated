export interface Dataset {
  id: string
  title: string
  description: string
  organization: string
  organizationType: string
  price: number
  tags: string[]
  createdAt: string
  image: string
  dataType: string
  accessType: string
  accessCount: number
  size: string
  qualityScore: number
  privacyTechnique: string
  domain: string
  updateFrequency?: string
  sampleAvailable?: boolean
}

export interface License {
  id: string
  datasetId: string
  licensee: string
  purchasedAt: string
  expiresAt: string
  accessCount: number
  maxAccessCount: number
  termsAccepted: boolean
  usageRestrictions: string[]
}

export interface DatasetFilter {
  dataType?: string[]
  domain?: string[]
  accessType?: string[]
  priceRange?: [number, number]
  privacyTechnique?: string[]
  organizationType?: string[]
  minQualityScore?: number
}

export interface TrainingJob {
  id: string
  datasetId: string
  status: "pending" | "running" | "completed" | "failed"
  progress: number
  startedAt: string
  completedAt?: string
  modelType: string
  modelSize: string
  outputUrl?: string
}

export interface AccessLog {
  id: string
  datasetId: string
  user: string
  timestamp: string
  action: "view" | "download" | "train"
  success: boolean
}

export interface GovernanceProposal {
  id: string
  title: string
  description: string
  proposer: string
  status: "active" | "passed" | "rejected"
  votes: {
    yes: number
    no: number
  }
  createdAt: string
  endsAt: string
}
