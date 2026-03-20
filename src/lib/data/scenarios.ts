export type Category = 'cyber' | 'operations' | 'physical' | 'leadership';
export type Difficulty = 'foundation' | 'intermediate' | 'advanced';

export interface Inject {
  id: string;
  sort_order: number;
  time_offset_minutes: number;
  title: string;
  description: string;
  facilitator_prompt: string;
  discussion_questions: string[];
  facilitator_tips?: string[];
}

export interface Scenario {
  id: string;
  title: string;
  category: Category;
  difficulty: Difficulty;
  duration_min: number;
  duration_max: number;
  participants_min: number;
  participants_max: number;
  situation_brief: string;
  roles: string[];
  learning_objectives: string[];
  preflight_checklist: string[];
  debrief_questions: string[];
  is_free: boolean;
  injects: Inject[];
}

export const mockScenarios: Scenario[] = [
  {
    id: "cx-2024-0041",
    title: "Cyberattack & IT Systems Compromise",
    category: "cyber",
    difficulty: "intermediate",
    duration_min: 60,
    duration_max: 90,
    participants_min: 4,
    participants_max: 12,
    situation_brief: "It is Monday morning at 7:00am. Your IT security monitoring system has triggered a critical alert. Unusual outbound network traffic was detected from two workstations in the Finance department beginning at approximately 6:00am. Initial review by the overnight monitoring team dismissed it as a false positive.\n\nAt 6:30am, your IT Director received a second alert — this time indicating that file encryption activity has been detected across shared drives on the primary file server. She has confirmed that ransomware has been deployed on at least 14 workstations across three departments.\n\nThe malware appears to have entered through a phishing email opened Friday afternoon. Your cloud backup service is showing unusual authentication requests. External cybersecurity consultants are 4-6 hours away. Your organization processes payroll at 11:00am today.\n\nYou are the leadership team. The exercise begins now.",
    roles: [
      "CEO",
      "CTO/IT Director",
      "Legal Counsel",
      "Communications Lead",
      "HR Director",
      "Operations Manager"
    ],
    learning_objectives: [
      "Test clarity of incident command structure under pressure",
      "Identify gaps in external communication protocols",
      "Surface undocumented assumptions about backup availability",
      "Evaluate cross-functional coordination under concurrent workstreams",
      "Assess speed and quality of escalation decisions"
    ],
    preflight_checklist: [
      "Confirm all key roles are represented",
      "Set ground rules (no phones, no blame)",
      "Assign a note-taker",
      "Block 90 minutes with no interruptions",
      "Print or display the situation brief"
    ],
    debrief_questions: [
      "What was our most effective decision today, and why?",
      "At what point did we feel most overwhelmed by the injects?",
      "Is our leadership team fully aligned on ransom payment policies?",
      "Were there any communication breakdowns between IT and the rest of the business?",
      "What specific updates to our Incident Response Plan are required?"
    ],
    is_free: true,
    injects: [
      {
        id: "cyber-inj-1",
        sort_order: 1,
        time_offset_minutes: 0,
        title: "Initial Anomaly Alert",
        description: "The managed security service provider emails a vague warning about 'anomalous data egress' but declines to confirm a breach until their analyst runs a full check.",
        facilitator_prompt: "Does anyone want to proactively disconnect systems before we know for sure?",
        discussion_questions: ["Who has the authority to isolate the network?", "What operations break if we pull the plug?"],
        facilitator_tips: [
          "Wait for 5-8 min of open discussion before probing for the legal notification angle.",
          "If no one mentions vendors or third-party data, ask about customer PII stored on the affected server."
        ]
      },
      {
        id: "cyber-inj-2",
        sort_order: 2,
        time_offset_minutes: 15,
        title: "IT Director reports active ransomware deployment",
        description: "Your IT Director contacts you directly. She reports that ransomware has been detected on at least 14 workstations across three departments. File encryption is actively spreading across shared drives. The malware appears to have entered via a phishing email opened earlier this morning.\n\nThe IT team has isolated two network segments but believes the attack has already reached your primary file server. Your cloud backup service is also showing unusual authentication activity. External consultants will take 4-6 hours to arrive on site. You must act now.",
        facilitator_prompt: "Who owns the decision to shut down company-wide network access right now — and what information would you need before making that call?",
        discussion_questions: [
          "At what point does a cyber incident trigger a legal obligation to notify the data regulator?",
          "How do you operate the business for the next 72 hours without your core systems?"
        ],
        facilitator_tips: [
          "Watch for teams that immediately jump to shutdown without assessing business continuity impact — flag this in AAR.",
          "Push the CTO on whether backups are actually 'air-gapped' or just 'on the cloud'."
        ]
      },
      {
        id: "cyber-inj-3",
        sort_order: 3,
        time_offset_minutes: 30,
        title: "Media Inquiry Received",
        description: "A local news reporter calls the corporate communications desk asking for comment on 'system outages' after an employee tweeted about being unable to log in.",
        facilitator_prompt: "Do we confirm the attack or stick to a generic 'technical difficulties' holding statement?",
        discussion_questions: ["Who is the authorized spokesperson?", "What is the holding statement?"]
      },
      {
        id: "cyber-inj-4",
        sort_order: 4,
        time_offset_minutes: 45,
        title: "Core Systems Offline",
        description: "The IT Director confirms the primary file server is fully encrypted. The payroll system is inaccessible and we are 90 minutes away from the processing deadline.",
        facilitator_prompt: "How do we handle payroll and communicate this to employees?",
        discussion_questions: ["Do we have a manual payroll fallback?", "What is the employee communications plan?"]
      },
      {
        id: "cyber-inj-5",
        sort_order: 5,
        time_offset_minutes: 60,
        title: "Ransom Demand Received",
        description: "A text file appears on remaining accessible systems demanding 50 Bitcoin (approx $3.5M) for the decryption key. They threaten to publish our customer database on the dark web if we do not pay within 48 hours.",
        facilitator_prompt: "What is our policy on paying a ransom? Who has final authority, and is that documented?",
        discussion_questions: ["Are we legally allowed to pay?", "What is the stance of our cyber insurance provider?"]
      }
    ]
  },
  {
    id: "nd-2024-0012",
    title: "Natural Disaster",
    category: "operations",
    difficulty: "foundation",
    duration_min: 75,
    duration_max: 90,
    participants_min: 4,
    participants_max: 12,
    situation_brief: "Severe weather reports indicate a Category 4 hurricane has unexpectedly shifted course and is now projected to make landfall near your primary headquarters and distribution center in 36 hours. State emergency officials are debating mandatory evacuations.",
    roles: [
      "Facilities Director",
      "HR Director",
      "CEO",
      "Operations Manager",
      "Communications Lead",
      "Safety Officer"
    ],
    learning_objectives: [
      "Test employee life safety protocols ahead of impact",
      "Evaluate supply chain rerouting processes",
      "Assess remote work capabilities for core staff",
      "Identify gaps in facility lockdown procedures"
    ],
    preflight_checklist: [
      "Confirm all key roles are represented",
      "Set ground rules",
      "Assign a note-taker",
      "Block 90 minutes with no interruptions"
    ],
    debrief_questions: [
      "Did we prioritize employee safety above all operations?",
      "Were we proactive enough with early closures?",
      "What critical systems or supplies would we lose in this scenario?"
    ],
    is_free: true,
    injects: [
      {
        id: "nd-inj-1",
        sort_order: 1,
        time_offset_minutes: 0,
        title: "Evacuation Warning",
        description: "The mayor issues a voluntary evacuation order for coastal zones, including your facility. Public transit is shutting down in 4 hours.",
        facilitator_prompt: "Do we release staff immediately? What about folks who rely on transit?",
        discussion_questions: ["Who declares the facility officially closed?", "How are staff notified?"]
      },
      {
        id: "nd-inj-2",
        sort_order: 2,
        time_offset_minutes: 15,
        title: "Mandatory Evacuation Issued",
        description: "The governor upgrades the order to mandatory. All non-essential personnel must leave the area. The storm is now 24 hours away.",
        facilitator_prompt: "Who is considered 'essential' staff in our organization right now?",
        discussion_questions: ["Do we order anyone to stay behind?", "What is our liability if we do?"]
      },
      {
        id: "nd-inj-3",
        sort_order: 3,
        time_offset_minutes: 30,
        title: "Vendor Cancellation",
        description: "Your primary logistics provider announces they are halting all regional operations immediately. Two major shipments intended for fulfillment tomorrow are stuck at your dock.",
        facilitator_prompt: "Can we secure alternative transport, or do we eat the cost of the delayed shipments?",
        discussion_questions: ["Who is communicating with impacted clients?", "Do our contracts have Force Majeure clauses?"]
      },
      {
        id: "nd-inj-4",
        sort_order: 4,
        time_offset_minutes: 45,
        title: "Generator Failure",
        description: "While testing the backup generator ahead of the storm, facilities management discovers a fuel line leak. The generator cannot be operated safely, meaning if power drops, we have zero backup.",
        facilitator_prompt: "Does this change our shutdown timeline for active operations and servers?",
        discussion_questions: ["Can we source an emergency generator in time?", "How do we safely power down the on-site data center?"]
      },
      {
        id: "nd-inj-5",
        sort_order: 5,
        time_offset_minutes: 60,
        title: "Landfall and Initial Damage",
        description: "The storm makes landfall. Power is out across the city. Initial drone footage from a local news station shows severe flooding near our facility, with water likely reaching the ground floor.",
        facilitator_prompt: "What is our immediate priority for the first 12 hours post-impact?",
        discussion_questions: ["How do we account for the safety of all employees?", "When and how do we gain safe access to assess damage?"]
      }
    ]
  },
  {
    id: "sc-2024-0022",
    title: "Supply Chain Disruption",
    category: "operations",
    difficulty: "intermediate",
    duration_min: 60,
    duration_max: 90,
    participants_min: 4,
    participants_max: 10,
    situation_brief: "A critical raw material supplier overseas has experienced a catastrophic factory fire, halting all output. They provide 70% of a component necessary for your most profitable product line.",
    roles: ["Supply Chain VP", "COO", "CFO", "Sales Director"],
    learning_objectives: ["Assess supply chain redundancy"],
    preflight_checklist: ["Confirm roles"],
    debrief_questions: ["Did we move fast enough?"],
    is_free: false,
    injects: []
  },
  {
    id: "ps-2024-0033",
    title: "Active Shooter / Coordinated Attack",
    category: "physical",
    difficulty: "advanced",
    duration_min: 90,
    duration_max: 120,
    participants_min: 6,
    participants_max: 12,
    situation_brief: "Reports of gunfire on the 3rd floor of the corporate office. Local police have been dispatched but the situation is unresolved.",
    roles: ["Head of Security", "HR Director", "CEO", "Comms Lead"],
    learning_objectives: ["Test Run/Hide/Fight training"],
    preflight_checklist: ["Confirm roles"],
    debrief_questions: ["How did we perform on life safety protocols?"],
    is_free: false,
    injects: []
  },
  {
    id: "ps-2024-0034",
    title: "Drone / UAS Threat",
    category: "physical",
    difficulty: "foundation",
    duration_min: 60,
    duration_max: 90,
    participants_min: 4,
    participants_max: 8,
    situation_brief: "An unidentified drone has been hovering near the executive suite windows for 10 minutes, potentially recording proprietary meetings or mapping the facility.",
    roles: ["Head of Security", "Facilities Manager", "Legal"],
    learning_objectives: ["Understand UAS threat vectors"],
    preflight_checklist: ["Confirm roles"],
    debrief_questions: ["Do we have a clear UAS policy?"],
    is_free: false,
    injects: []
  },
  {
    id: "op-2024-0055",
    title: "Infrastructure Failure & Evacuation",
    category: "operations",
    difficulty: "intermediate",
    duration_min: 60,
    duration_max: 90,
    participants_min: 4,
    participants_max: 10,
    situation_brief: "A main water pipe burst on the floor above your primary data center and office space. Significant flooding is occurring.",
    roles: ["Facilities Director", "IT Director", "COO"],
    learning_objectives: ["Test COOP plan"],
    preflight_checklist: ["Confirm roles"],
    debrief_questions: ["Were our vital records protected?"],
    is_free: false,
    injects: []
  },
  {
    id: "op-2024-0056",
    title: "Hazardous Materials Spill",
    category: "operations",
    difficulty: "advanced",
    duration_min: 60,
    duration_max: 90,
    participants_min: 5,
    participants_max: 10,
    situation_brief: "A delivery truck has crashed in your loading dock, spilling 500 gallons of an unidentified chemical. Fumes are entering the HVAC system.",
    roles: ["Safety Officer", "Facilities Director", "Comms Lead"],
    learning_objectives: ["Test HAZMAT response and evacuation"],
    preflight_checklist: ["Confirm roles"],
    debrief_questions: ["Did we properly coordinate with local fire/EMS?"],
    is_free: false,
    injects: []
  },
  {
    id: "ps-2024-0036",
    title: "Civil Unrest & Violent Protest",
    category: "physical",
    difficulty: "intermediate",
    duration_min: 60,
    duration_max: 90,
    participants_min: 4,
    participants_max: 8,
    situation_brief: "A large, increasingly hostile protest has formed outside your corporate headquarters, blocking all entrances and exits. Employees are trapped inside.",
    roles: ["Head of Security", "HR Director", "Comms Lead"],
    learning_objectives: ["Evaluate perimeter security and employee safety"],
    preflight_checklist: ["Confirm roles"],
    debrief_questions: ["How did we manage employee anxiety?"],
    is_free: false,
    injects: []
  },
  {
    id: "cy-2024-0042",
    title: "Insider Threat & Sabotage",
    category: "cyber",
    difficulty: "advanced",
    duration_min: 90,
    duration_max: 120,
    participants_min: 5,
    participants_max: 10,
    situation_brief: "A recently terminated senior engineer has somehow retained access and is systematically deleting critical production databases.",
    roles: ["IT Director", "HR Director", "Legal", "CEO"],
    learning_objectives: ["Test offboarding and access auditing procedures"],
    preflight_checklist: ["Confirm roles"],
    debrief_questions: ["Where did our offboarding process fail?"],
    is_free: false,
    injects: []
  },
  {
    id: "ps-2024-0037",
    title: "IED & Suspicious Package",
    category: "physical",
    difficulty: "foundation",
    duration_min: 60,
    duration_max: 90,
    participants_min: 4,
    participants_max: 8,
    situation_brief: "The mailroom reports a package with no return address, excessive tape, and protruding wires. It was delivered directly to the CEO's administrative assistant.",
    roles: ["Facilities Manager", "Head of Security", "CEO"],
    learning_objectives: ["Test suspicious package protocols"],
    preflight_checklist: ["Confirm roles"],
    debrief_questions: ["Did we evacuate properly?"],
    is_free: false,
    injects: []
  }
];
