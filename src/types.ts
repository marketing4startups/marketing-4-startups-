export interface ComparisonMetric {
  id: string;
  category: string;
  enterpriseFlaw: {
    title: string;
    description: string;
    timeline: string;
    costImpact: string;
  };
  startupEdge: {
    title: string;
    description: string;
    timeline: string;
    costImpact: string;
  };
  outperformanceMetric: string;
  metricLabel: string;
  founderTakeaway: string;
}

export interface ServicePillar {
  id: string;
  number: string;
  title: string;
  kicker: string;
  description: string;
  whyEnterpriseFailsHere: string;
  startupDeliverables: string[];
  timeline: string;
  typicalRoi: string;
}

export interface IrishSupportItem {
  id: string;
  name: string;
  agency: string;
  scope: string;
  strategicRelevance: string;
  grantValue: string;
}

export interface CaseStudy {
  id: string;
  companySnippet: string;
  sector: string;
  location: string;
  metric: string;
  metricContext: string;
  headline: string;
  theBottleneck: string;
  theTailoredStrategy: string;
  results: string[];
  founder?: {
    name: string;
    role: string;
    company: string;
    quote: string;
  };
}

export interface EngagementTier {
  id: string;
  name: string;
  isPopular?: boolean;
  idealFor: string;
  priceModel: string;
  duration: string;
  summary: string;
  features: string[];
  deliverables: string[];
  buttonText: string;
}

export interface BookingFormState {
  fullName: string;
  email: string;
  companyName: string;
  website: string;
  stage: 'Pre-Seed / Ideation' | 'Seed Funded' | 'Series A / Scaling' | 'Profitable SME / Established';
  location: 'Dublin' | 'Cork' | 'Galway' | 'Limerick / Shannon' | 'Regional Ireland' | 'UK & EU Operating';
  primaryBottleneck: 'Inconsistent Lead Generation' | 'Undefined ICP & Positioning' | 'Enterprise Playbook Cash Burn' | 'Entering UK/EU from Ireland' | 'Need Fractional Marketing Leadership';
  monthlyBudget: '€2k - €4k/mo' | '€4k - €8k/mo' | '€8k+/mo' | 'Project / Sprint Basis';
  preferredDate: string;
  preferredTime: string;
  notes: string;
  gdprAccepted: boolean;
  gdprConsentTimestamp?: string;
}
