export const CATEGORIES = {
  A: {
    id: 'A',
    title: 'Category A',
    subtitle: 'Single-document, direct lookup',
    description: 'Simple factual questions from one 10-K or 10-Q. No computation, no cross-section synthesis.',
    estTime: '15–20 min',
    difficulty: 1,
    intro: "These are simple lookup questions from a single SEC filing. No math, no comparing things across documents. Read the filing and pull out a specific number or fact.",
    maxSubmissions: 10,
  },
  B: {
    id: 'B',
    title: 'Category B',
    subtitle: 'Single-document, multi-section or computation',
    description: 'Harder questions from a single document. Combine multiple sections, do math, or infer values not directly stated.',
    estTime: '30–40 min',
    difficulty: 2,
    intro: "These need more thinking. Single document still, but may require combining multiple sections (segment table plus MD&A), or computing something not directly stated (YoY growth %, margin, ratio).",
    maxSubmissions: 10,
  },
  C: {
    id: 'C',
    title: 'Category C',
    subtitle: 'Multi-document, cross-firm comparison',
    description: 'Pull from 2+ filings (up to 40). Normalize across companies, identify patterns or differences.',
    estTime: '60–90 min',
    difficulty: 3,
    intro: "These are the hardest. Pull from 2 or more filings, sometimes up to 40 documents, usually comparing companies in the same sector. Questions a sell-side analyst or fund manager would actually ask.",
    maxSubmissions: 10,
  }
};

export const QUAL_TEST_PROMPTS = {
  A: {
    q1: "What was 3M's total net sales for the three months ended June 30, 2024, per its Q2 2024 10-Q?",
    q2: "Write a prompt appropriate for Category A, different from the existing questions.",
    q3: "Write another prompt appropriate for Category A, different from the existing questions.",
  },
  B: {
    q1: "As per Boeing's FY2024 10-K, by what % did Commercial Airplanes segment revenue grow YoY, and which two factors does management cite in MD&A as the largest contributors? Reconcile any apparent discrepancy between the segment table.",
    q2: "Write a prompt appropriate for Category B, different from the existing questions.",
    q3: "Write another prompt appropriate for Category B, different from the existing questions.",
  },
  C: {
    q1: "Using the most recent FY 10-Ks of NVIDIA (NVDA), Advanced Micro Devices (AMD), and Intel (INTC), compute each company's R&D intensity (R&D expense ÷ total revenue) for the most recent fiscal year and the prior fiscal year. Identify (a) which company has the highest R&D intensity in the most recent year, and (b) which company saw the largest YoY change in R&D intensity, expressed in basis points.",
    q2: "Write a prompt appropriate for Category C, different from the existing questions.",
    q3: "Write another prompt appropriate for Category C, different from the existing questions.",
  }
};

export const QUAL_EXAMPLES = {
  A: {
    prompt: "What was 3M's total net sales for the three months ended June 30, 2024, per its Q2 2024 10-Q?",
    filledJson: {
      submission_id: "QUAL-A-EX-001",
      category: "A",
      prompt: "What was 3M's total net sales for the three months ended June 30, 2024, per its Q2 2024 10-Q?",
      expert_answer: "3M's total net sales for the three months ended June 30, 2024 were $6,256 million.",
      supporting_facts: "Per the Condensed Consolidated Statement of Income (page 4 of 3M's Q2 2024 10-Q): Total net sales for the three months ended June 30, 2024 were $6,256M, compared to $8,325M for the same period in 2023.",
      justification: "Direct extraction from the consolidated statement of income. No computation required.",
      documents: [{
        metadata: { company_name: "3M Company", ticker: "MMM", CIK: "0000066740", doc_type: "10-Q", filing_date: "2024-07-25", doc_period: "Q2 2024" },
        sec_url: "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000066740",
        pdf_url: "https://drive.google.com/new_pdf/"
      }],
      pii_scrub_confirmed: true
    },
    whyItPasses: "Single document, direct extraction. Supporting facts include the page reference and prior-year comparator. Anyone evaluating a model answer to this prompt could verify it from supporting facts alone, without re-opening the 10-Q."
  },
  B: {
    prompt: "Based on Apple Inc.'s 10-K for the fiscal year ended September 30, 2023, what was the percentage change in net sales for the 'Wearables, Home and Accessories' segment compared to FY2022?",
    filledJson: {
      submission_id: "QUAL-B-EX-001",
      category: "B",
      prompt: "Based on Apple Inc.'s 10-K for the fiscal year ended September 30, 2023, what was the percentage change in net sales for the 'Wearables, Home and Accessories' segment compared to FY2022?",
      expert_answer: "Net sales for the Wearables, Home and Accessories segment decreased by approximately 3.4% from FY2022 to FY2023.",
      supporting_facts: "From the 'Products and Services Performance' section of Apple's FY2023 10-K (page 23): Wearables, Home and Accessories net sales were $39,845M in FY2023 and $41,241M in FY2022.",
      justification: "Computed as (39,845 − 41,241) / 41,241 = −0.03384, or a 3.38% decrease.",
      documents: [{
        metadata: { company_name: "Apple Inc.", ticker: "AAPL", CIK: "0000320193", doc_type: "10-K", filing_date: "2023-11-03", doc_period: "FY 2023" },
        sec_url: "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000320193",
        pdf_url: "https://drive.google.com/new_pdf/"
      }],
      pii_scrub_confirmed: true
    },
    whyItPasses: "Requires extraction (two segment values) AND a YoY computation. Supporting facts make verification possible without re-opening the source doc."
  },
  C: {
    prompt: "Compare FY2024 capital allocation policy (buybacks vs dividends vs capex vs M&A as % of operating cash flow) across the five largest U.S. money-center banks (JPM, BAC, WFC, C, USB) and identify which firm had the largest YoY shift.",
    filledJson: {
      submission_id: "QUAL-C-EX-001",
      category: "C",
      prompt: "Compare FY2024 capital allocation policy across the five largest U.S. money-center banks (JPM, BAC, WFC, C, USB)...",
      expert_answer: "JPM: Div 12% / Buyback 9% / Capex 13%; BAC: Div 17% / Buyback 11% / Capex 9%; WFC: Div 9% / Buyback 21% / Capex 4%; C: Div 13% / Buyback 5% / Capex 13%; USB: Div 27% / Buyback 5% / Capex 18%. Wells Fargo had the largest YoY shift, increasing buybacks from 12% to 21% of OCF.",
      supporting_facts: "JPM FY2024 10-K (p.53): OCF $110B, dividends $13.5B, buybacks $10B. BAC FY2024 10-K (p.41): OCF $47B, dividends $8B, buybacks $5.2B. WFC FY2024 10-K (p.56): OCF $60B, dividends $5.2B, buybacks $12.8B. C FY2024 10-K (p.47): OCF $31B, dividends $4.1B, buybacks $1.5B. USB FY2024 10-K (p.38): OCF $11.5B, dividends $3.1B, buybacks $0.6B.",
      justification: "Each ratio = (allocation $) / (operating cash flow $). YoY shift computed by comparing FY2024 percentages to FY2023 disclosure in each 10-K.",
      documents: [
        { metadata: { company_name: "JPMorgan Chase & Co.", ticker: "JPM", CIK: "0000019617", doc_type: "10-K", filing_date: "2025-02-21", doc_period: "FY 2024" }, sec_url: "https://www.sec.gov/cgi-bin/browse-edgar?CIK=0000019617", pdf_url: "" },
        { metadata: { company_name: "Bank of America Corp.", ticker: "BAC", CIK: "0000070858", doc_type: "10-K", filing_date: "2025-02-20", doc_period: "FY 2024" }, sec_url: "https://www.sec.gov/cgi-bin/browse-edgar?CIK=0000070858", pdf_url: "" },
        { metadata: { company_name: "Wells Fargo & Company", ticker: "WFC", CIK: "0000072971", doc_type: "10-K", filing_date: "2025-02-27", doc_period: "FY 2024" }, sec_url: "https://www.sec.gov/cgi-bin/browse-edgar?CIK=0000072971", pdf_url: "" },
        { metadata: { company_name: "Citigroup Inc.", ticker: "C", CIK: "0000831001", doc_type: "10-K", filing_date: "2025-02-23", doc_period: "FY 2024" }, sec_url: "https://www.sec.gov/cgi-bin/browse-edgar?CIK=0000831001", pdf_url: "" },
        { metadata: { company_name: "U.S. Bancorp", ticker: "USB", CIK: "0000036104", doc_type: "10-K", filing_date: "2025-02-21", doc_period: "FY 2024" }, sec_url: "https://www.sec.gov/cgi-bin/browse-edgar?CIK=0000036104", pdf_url: "" },
      ],
      pii_scrub_confirmed: true
    },
    whyItPasses: "Five documents, all FY2024 10-Ks, with consistent normalization. Every value is cited with a page reference, so a reviewer can verify any cell without opening the 10-K."
  }
};

export const QUAL_RUBRIC = {
  title: "Qualification Test Grading Rubric",
  q1Criteria: [
    { name: "Expert Answer & Accuracy", weight: "2 pts", levels: [
      { score: "2", text: "Directly and accurately answers the question with only relevant information" },
      { score: "1", text: "Correct answer but contains extra content or minor error" },
      { score: "0", text: "Factually wrong, or does not answer the question asked" }
    ]},
    { name: "Supporting Facts", weight: "2 pts", levels: [
      { score: "2", text: "All required numbers, names and other info are included from document(s)" },
      { score: "1", text: "Some required data missing, or unnecessary irrelevant data included" },
      { score: "0", text: "Most required data missing, or data is fabricated" }
    ]},
    { name: "Justification", weight: "2 pts", levels: [
      { score: "2", text: "Reasoning is clear and complete; formula, inputs, and arithmetic are shown" },
      { score: "1", text: "Reasoning is partial, or formula and work are missing" },
      { score: "0", text: "No reasoning provided, or reasoning is incoherent" }
    ]},
    { name: "Adherence to Schema", weight: "1 pt", levels: [
      { score: "1", text: "All fields populated; JSON parses; metadata and source_url are verified" },
      { score: "0", text: "Majority of fields blank, JSON does not parse, or source_url is invalid" }
    ]},
  ],
  q2q3Criteria: [
    { name: "Question Creation", weight: "1.5 pts each", levels: [
      { score: "1.5", text: "Question belongs to the same category with the same level of difficulty" },
      { score: "0.75", text: "Question belongs to the same category but slightly ambiguous" },
      { score: "0", text: "Question does not belong to the category, ambiguous, or not relevant (Reject)" }
    ]},
  ],
  totalNote: null
};

export const DATA_SUBMISSION_RUBRIC = {
  title: "Data Submission Grading Criteria",
  note: "Every submission will be reviewed against the following criteria. All five must be met for the submission to be accepted.",
  criteria: [
    { name: "Question Creation", description: "The question matches the assigned category in topic and difficulty, asks for factual information supported by the cited document(s), and is not a duplicate of an earlier submission" },
    { name: "Expert Answer & Accuracy", description: "The expert_answer field directly answers the question with only the relevant information, and the answer is factually and numerically accurate" },
    { name: "Justification", description: "The justification field clearly explains how the supporting facts lead to the expert_answer. For calculation-based answers, the formula, inputs, and arithmetic are shown" },
    { name: "Supporting Facts", description: "The supporting_facts field contains every number, name, date, and page reference needed to answer the question, drawn directly from the cited document(s). A reviewer should be able to verify any plausible model answer using only the supporting_facts, without reopening the source document" },
    { name: "Adherence to Schema", description: "All JSON fields are populated. The JSON parses without errors. Document metadata and source_url are accurate and verifiable against the SEC source" },
  ]
};

export const REVIEW_RUBRIC = {
  title: "Review & QA Grading Criteria",
  note: "Rate each submission against these criteria. Decide: Accept, Edit & Resubmit, or Reject.",
  criteria: [
    { name: "Question Creation", levels: [
      { label: "Accept", text: "Matches the assigned category in topic and difficulty; factual" },
      { label: "Fix", text: "Slightly ambiguous, borderline category fit — edit and resubmit" },
      { label: "Reject", text: "Wrong category, opinion-based — reject the submission" }
    ]},
    { name: "Expert Answer & Accuracy", levels: [
      { label: "Accept", text: "Directly and accurately answers the question with only relevant information" },
      { label: "Fix", text: "Correct answer but contains extra content or minor error — edit and resubmit" },
      { label: "Reject", text: "Factually wrong, or does not answer the question asked — reject" }
    ]},
    { name: "Justification", levels: [
      { label: "Accept", text: "Reasoning is clear and complete; formula, inputs, and arithmetic shown" },
      { label: "Fix", text: "Reasoning is partial, or formula and work are missing — edit and resubmit" },
      { label: "Reject", text: "No reasoning provided, or reasoning is incoherent — reject" }
    ]},
    { name: "Supporting Facts", levels: [
      { label: "Accept", text: "All required numbers, names, dates, and page references included" },
      { label: "Fix", text: "Some required data missing or unnecessary irrelevant data — edit and resubmit" },
      { label: "Reject", text: "Most required data missing, or data is fabricated — reject" }
    ]},
    { name: "Adherence to Schema", levels: [
      { label: "Accept", text: "All fields populated; JSON parses; metadata and source_url verified" },
      { label: "Fix", text: "Minor errors (wrong year, formatting issue) — edit and resubmit" },
      { label: "Reject", text: "Wrong JSON parse, fields are blank — reject" }
    ]},
  ]
};

export const GUIDELINES = [
  "Usage of other Internet/AI tools is not permitted",
  "Taking help of others results in automatic termination from the project",
  "Only cite 10-K or 10-Q documents from SEC EDGAR",
  "Sharing or using questions/answers before or after submission is prohibited",
  "Source materials from SEC website only, published on or after October 2023",
  "Questions must ask for factual information — no opinions or forecasts",
];

export const SEC_ACCESS_STEPS = [
  "Go to: https://www.sec.gov/edgar/searchedgar/companysearch",
  'Search for the company, then click on the relevant 10-K or 10-Q filing',
  'Click "Menu" on the SEC page, then click "Open as HTML"',
  '"Print" and set destination to "Save as PDF" — save the PDF file',
  "Copy the SEC URL and enter it in the relevant fields in your answer",
];

export const AUTO_REJECT_CRITERIA = [
  "Any PII in the prompt or answer",
  "Fabricated or incorrect citations",
  "Usage of unsupported/non-SEC documents",
  "Opinion-based or subjective questions instead of factual ones",
  "Hallucinated supporting facts or calculations",
  "Broken, inaccessible, or irrelevant SEC URLs",
  "Plagiarized or AI-generated copied responses",
];

export const JSON_FIELD_GUIDE = [
  { key: 'prompt', desc: 'The financial question you are creating. Must match the assigned category in topic and difficulty.' },
  { key: 'expert_answer', desc: 'The factual answer. Be precise — state the number, value, or comparison the prompt asks for.' },
  { key: 'supporting_facts', desc: 'Relevant data from the filing(s) with page references. Self-contained so a reviewer can verify without opening the source PDF.' },
  { key: 'justification', desc: 'Reasoning or calculation. For calculations, show the formula, inputs, and arithmetic.' },
  { key: 'documents', desc: 'Metadata about each SEC filing used (company, ticker, CIK, doc type, dates) and SEC URL.' },
  { key: 'pii_scrub_confirmed', desc: 'Confirm there is no PII anywhere in the submission.' },
];

export const SAMPLE_SUBMISSIONS = {
  A: [
    {
      id: "SUB-A-001", status: "pending_review", prompt: "What was Johnson & Johnson's total revenue for Q3 2024 per its 10-Q?",
      submitter: "Profile_12", submitted_at: "2025-05-02",
      expert_answer: "Johnson & Johnson's total revenue for Q3 2024 was $22,471 million.",
      supporting_facts: "Per the Condensed Consolidated Statement of Earnings (page 3 of J&J's Q3 2024 10-Q): Total revenues were $22,471M for the three months ended September 29, 2024, vs $21,351M for the same period in 2023.",
      justification: "Direct extraction from the consolidated statement of earnings. No computation required.",
      documents: [{ metadata: { company_name: "Johnson & Johnson", ticker: "JNJ", CIK: "0000200406", doc_type: "10-Q", filing_date: "2024-10-25", doc_period: "Q3 2024" }, sec_url: "https://www.sec.gov/cgi-bin/browse-edgar?CIK=0000200406", pdf_url: "https://drive.google.com/new_pdf/" }],
    },
    {
      id: "SUB-A-002", status: "accepted", prompt: "What was Coca-Cola's net operating revenue for the quarter ended September 29, 2024?",
      submitter: "Profile_07", submitted_at: "2025-05-01",
      expert_answer: "Coca-Cola's net operating revenues for Q3 2024 were $11,854 million.",
      supporting_facts: "Per Coca-Cola's Q3 2024 10-Q Condensed Consolidated Statements of Income (page 4): Net operating revenues were $11,854M vs $11,953M in Q3 2023.",
      justification: "Direct extraction. No computation required.",
      documents: [{ metadata: { company_name: "The Coca-Cola Company", ticker: "KO", CIK: "0000021344", doc_type: "10-Q", filing_date: "2024-10-23", doc_period: "Q3 2024" }, sec_url: "https://www.sec.gov/cgi-bin/browse-edgar?CIK=0000021344", pdf_url: "https://drive.google.com/new_pdf/" }],
    },
    {
      id: "SUB-A-003", status: "needs_fix", prompt: "What was Tesla's automotive revenue in Q4 2024 per its 10-K?",
      submitter: "Profile_22", submitted_at: "2025-04-30",
      expert_answer: "Tesla's automotive revenue for Q4 2024 was $19,800 million.",
      supporting_facts: "From Tesla's FY2024 10-K, Revenue by source table (page 45): Automotive revenues for Q4 2024 were $19,800M.",
      justification: "Direct extraction from the revenue breakdown table.",
      documents: [{ metadata: { company_name: "Tesla, Inc.", ticker: "TSLA", CIK: "0001318605", doc_type: "10-K", filing_date: "2025-01-29", doc_period: "FY 2024" }, sec_url: "https://www.sec.gov/cgi-bin/browse-edgar?CIK=0001318605", pdf_url: "https://drive.google.com/new_pdf/" }],
    },
  ],
  B: [
    {
      id: "SUB-B-001", status: "pending_review",
      prompt: "Per Microsoft's FY2024 10-K, what was the YoY growth in Intelligent Cloud segment operating income, and what drove the margin expansion per MD&A?",
      submitter: "Profile_05", submitted_at: "2025-05-03",
      expert_answer: "Intelligent Cloud segment operating income grew 32% YoY to $37.5B in FY2024. Per MD&A, margin expansion was driven by Azure revenue growth and improved AI services monetization.",
      supporting_facts: "Microsoft FY2024 10-K (p.38): Intelligent Cloud operating income was $37,524M in FY2024 vs $28,395M in FY2023. MD&A (p.42): 'The increase was primarily driven by growth in Azure and other cloud services revenue, including AI services.'",
      justification: "YoY growth = (37,524 - 28,395) / 28,395 = 32.1%.",
      documents: [{ metadata: { company_name: "Microsoft Corporation", ticker: "MSFT", CIK: "0000789019", doc_type: "10-K", filing_date: "2024-07-30", doc_period: "FY 2024" }, sec_url: "https://www.sec.gov/cgi-bin/browse-edgar?CIK=0000789019", pdf_url: "https://drive.google.com/new_pdf/" }],
    },
    {
      id: "SUB-B-002", status: "accepted",
      prompt: "Based on Meta's FY2024 10-K, compute the implied average revenue per user (ARPU) for the Family of Apps segment.",
      submitter: "Profile_18", submitted_at: "2025-05-01",
      expert_answer: "Meta's implied FoA ARPU for FY2024 was approximately $49.50 per user.",
      supporting_facts: "Meta FY2024 10-K (p.55): Family of Apps revenue was $156.2B. (p.61): Family daily active people (DAP) averaged 3.15 billion in Q4 2024.",
      justification: "Implied ARPU = $156,200M / 3,150M users = $49.59 per user, rounded to ~$49.50.",
      documents: [{ metadata: { company_name: "Meta Platforms, Inc.", ticker: "META", CIK: "0001326801", doc_type: "10-K", filing_date: "2025-02-06", doc_period: "FY 2024" }, sec_url: "https://www.sec.gov/cgi-bin/browse-edgar?CIK=0001326801", pdf_url: "https://drive.google.com/new_pdf/" }],
    },
  ],
  C: [
    {
      id: "SUB-C-001", status: "pending_review",
      prompt: "Compare R&D intensity across NVDA, AMD, and INTC for FY2024 and identify the largest YoY change in basis points.",
      submitter: "Profile_03", submitted_at: "2025-05-04",
      expert_answer: "NVDA: 14.2% R&D intensity (FY2024), AMD: 23.1%, INTC: 31.5%. NVDA had the largest YoY change at -580 basis points (from 20.0% in FY2023).",
      supporting_facts: "NVDA FY2024 10-K (p.51): R&D $8.7B, Revenue $61.0B. AMD FY2024 10-K (p.42): R&D $5.9B, Revenue $25.5B. INTC FY2024 10-K (p.38): R&D $16.7B, Revenue $53.0B. Prior year: NVDA R&D $7.3B, Revenue $36.6B.",
      justification: "R&D intensity = R&D / Revenue. NVDA FY2024: 8.7/61.0 = 14.2%, FY2023: 7.3/36.6 = 20.0%. Change = -580bps.",
      documents: [
        { metadata: { company_name: "NVIDIA Corporation", ticker: "NVDA", CIK: "0001045810", doc_type: "10-K", filing_date: "2025-02-26", doc_period: "FY 2024" }, sec_url: "https://www.sec.gov/cgi-bin/browse-edgar?CIK=0001045810", pdf_url: "https://drive.google.com/new_pdf/" },
        { metadata: { company_name: "Advanced Micro Devices", ticker: "AMD", CIK: "0000002488", doc_type: "10-K", filing_date: "2025-02-04", doc_period: "FY 2024" }, sec_url: "https://www.sec.gov/cgi-bin/browse-edgar?CIK=0000002488", pdf_url: "https://drive.google.com/new_pdf/" },
        { metadata: { company_name: "Intel Corporation", ticker: "INTC", CIK: "0000050863", doc_type: "10-K", filing_date: "2025-01-30", doc_period: "FY 2024" }, sec_url: "https://www.sec.gov/cgi-bin/browse-edgar?CIK=0000050863", pdf_url: "https://drive.google.com/new_pdf/" },
      ],
    },
    {
      id: "SUB-C-002", status: "needs_fix",
      prompt: "Rank the Big 5 tech companies by free cash flow margin for FY2024 using their 10-Ks.",
      submitter: "Profile_11", submitted_at: "2025-05-02",
      expert_answer: "FCF Margin ranking: AAPL 28.5%, MSFT 33.2%, GOOGL 25.1%, AMZN 14.8%, META 35.1%. META leads, followed by MSFT.",
      supporting_facts: "AAPL 10-K (p.44): FCF $108B, Rev $380B. MSFT 10-K (p.50): FCF $74B, Rev $223B. GOOGL 10-K (p.55): FCF $82B, Rev $327B. AMZN 10-K (p.38): FCF $92B, Rev $620B. META 10-K (p.48): FCF $55B, Rev $157B.",
      justification: "FCF Margin = Free Cash Flow / Revenue for each company.",
      documents: [
        { metadata: { company_name: "Apple Inc.", ticker: "AAPL", CIK: "0000320193", doc_type: "10-K", filing_date: "2024-11-01", doc_period: "FY 2024" }, sec_url: "https://www.sec.gov/cgi-bin/browse-edgar?CIK=0000320193", pdf_url: "https://drive.google.com/new_pdf/" },
        { metadata: { company_name: "Microsoft Corporation", ticker: "MSFT", CIK: "0000789019", doc_type: "10-K", filing_date: "2024-07-30", doc_period: "FY 2024" }, sec_url: "https://www.sec.gov/cgi-bin/browse-edgar?CIK=0000789019", pdf_url: "https://drive.google.com/new_pdf/" },
      ],
    },
  ]
};

export const SAMPLE_QUAL_SUBMISSIONS = {
  A: [
    {
      id: "EVAL-A-001", status: "pending_review", submitter: "Profile_31", submitted_at: "2025-05-04", score: null,
      q1_prompt: "What was 3M's total net sales for the three months ended June 30, 2024, per its Q2 2024 10-Q?",
      q1_answer: "3M's total net sales for the three months ended June 30, 2024 were $6,256 million.",
      q1_facts: "Per the Condensed Consolidated Statement of Income (page 4 of 3M's Q2 2024 10-Q): Total net sales were $6,256M vs $8,325M in Q2 2023.",
      q1_justification: "Direct extraction from the income statement. No computation required.",
      q1_documents: [{ metadata: { company_name: "3M Company", ticker: "MMM", CIK: "0000066740", doc_type: "10-Q", filing_date: "2024-07-25", doc_period: "Q2 2024" }, sec_url: "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000066740", pdf_url: "https://drive.google.com/new_pdf/" }],
      q2_prompt: "What was PepsiCo's net revenue for Q3 2024 from its 10-Q?",
      q3_prompt: "What was Pfizer's total revenues for Q2 2024 per its 10-Q?",
    },
    {
      id: "EVAL-A-002", status: "graded", submitter: "Profile_19", submitted_at: "2025-05-03", score: 8.5,
      q1_prompt: "What was 3M's total net sales for the three months ended June 30, 2024, per its Q2 2024 10-Q?",
      q1_answer: "Total net sales were $6,256 million for Q2 2024.",
      q1_facts: "3M Q2 2024 10-Q, page 4: Net sales $6,256M.",
      q1_justification: "Direct lookup, no calculation needed.",
      q1_documents: [{ metadata: { company_name: "3M Company", ticker: "MMM", CIK: "0000066740", doc_type: "10-Q", filing_date: "2024-07-25", doc_period: "Q2 2024" }, sec_url: "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000066740", pdf_url: "https://drive.google.com/new_pdf/" }],
      q2_prompt: "What was Procter & Gamble's net sales for Q1 FY2025 from its 10-Q?",
      q3_prompt: "What was Adobe's total revenue for Q4 FY2024 per its 10-K?",
    },
  ],
  B: [
    {
      id: "EVAL-B-001", status: "pending_review", submitter: "Profile_14", submitted_at: "2025-05-04", score: null,
      q1_prompt: "As per Boeing's FY2024 10-K, by what % did Commercial Airplanes segment revenue grow YoY?",
      q1_answer: "Boeing Commercial Airplanes revenue grew approximately 15.3% YoY in FY2024.",
      q1_facts: "Boeing FY2024 10-K (p.35): Commercial Airplanes revenue was $33.9B in FY2024 vs $29.4B in FY2023.",
      q1_justification: "YoY growth = (33,900 - 29,400) / 29,400 = 15.3%.",
      q1_documents: [{ metadata: { company_name: "The Boeing Company", ticker: "BA", CIK: "0000012927", doc_type: "10-K", filing_date: "2025-02-11", doc_period: "FY 2024" }, sec_url: "https://www.sec.gov/cgi-bin/browse-edgar?CIK=0000012927", pdf_url: "https://drive.google.com/new_pdf/" }],
      q2_prompt: "From Amazon's FY2024 10-K, what was the operating margin change for AWS YoY?",
      q3_prompt: "Per Alphabet's FY2024 10-K, compute the YoY revenue growth rate for Google Cloud.",
    },
  ],
  C: [
    {
      id: "EVAL-C-001", status: "pending_review", submitter: "Profile_08", submitted_at: "2025-05-05", score: null,
      q1_prompt: "Compare R&D intensity across NVDA, AMD, and INTC for FY2024.",
      q1_answer: "NVDA: 14.2%, AMD: 23.1%, INTC: 31.5%. NVDA had the largest YoY change at -580bps.",
      q1_facts: "NVDA 10-K: R&D $8.7B, Rev $61.0B. AMD 10-K: R&D $5.9B, Rev $25.5B. INTC 10-K: R&D $16.7B, Rev $53.0B.",
      q1_justification: "R&D intensity = R&D expense / total revenue. Computed for each company.",
      q1_documents: [
        { metadata: { company_name: "NVIDIA Corporation", ticker: "NVDA", CIK: "0001045810", doc_type: "10-K", filing_date: "2025-02-26", doc_period: "FY 2024" }, sec_url: "https://www.sec.gov/cgi-bin/browse-edgar?CIK=0001045810", pdf_url: "https://drive.google.com/new_pdf/" },
        { metadata: { company_name: "Advanced Micro Devices", ticker: "AMD", CIK: "0000002488", doc_type: "10-K", filing_date: "2025-02-04", doc_period: "FY 2024" }, sec_url: "https://www.sec.gov/cgi-bin/browse-edgar?CIK=0000002488", pdf_url: "https://drive.google.com/new_pdf/" },
        { metadata: { company_name: "Intel Corporation", ticker: "INTC", CIK: "0000050863", doc_type: "10-K", filing_date: "2025-01-30", doc_period: "FY 2024" }, sec_url: "https://www.sec.gov/cgi-bin/browse-edgar?CIK=0000050863", pdf_url: "https://drive.google.com/new_pdf/" },
      ],
      q2_prompt: "Compare gross margins across the Big 3 US automakers (GM, F, TSLA) for FY2024.",
      q3_prompt: "Rank the top 5 US airlines by revenue per available seat mile for FY2024.",
    },
  ]
};
