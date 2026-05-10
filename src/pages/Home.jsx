import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, CheckCircle2, Star, ChevronRight, Download, ChevronDown } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-8 py-14">
      {/* Hero */}
      <div className="mb-14">
        <div className="font-[var(--font-mono)] text-[0.7rem] tracking-[0.15em] text-[var(--color-accent)] mb-3">
          FINANCIAL ANALYSIS | SFT DATA COLLECTION
        </div>
        <div className="flex items-start justify-between gap-8">
          <h1 className="font-[var(--font-display)] text-5xl leading-tight text-[var(--color-ink)] font-medium tracking-tight">
            Write the questions<br />
            <em className="italic text-[var(--color-accent)]">finance professionals</em><br />
            actually ask.
          </h1>
          <DownloadSampleData />
        </div>
        <p className="text-lg text-[var(--color-ink-light)] mt-5 max-w-xl leading-relaxed">
          This project involves writing finance questions and human-written answers based on public SEC filings (10-K and 10-Q reports). The data trains an AI model on real financial reasoning.
        </p>
        <div className="flex items-center gap-6 mt-6">
          <div>
            <div className="font-[var(--font-mono)] text-[0.65rem] tracking-widest text-[var(--color-muted)]">RATE</div>
            <div className="font-[var(--font-display)] text-2xl text-[var(--color-ink)] font-medium">$20<span className="text-base text-[var(--color-muted)]">/hour</span></div>
          </div>
          <div className="w-px h-10 bg-[var(--color-border)]"></div>
          <div>
            <div className="font-[var(--font-mono)] text-[0.65rem] tracking-widest text-[var(--color-muted)]">FORMAT</div>
            <div className="text-sm text-[var(--color-ink)] font-medium">Self-paced, no deadlines</div>
          </div>
          <div className="w-px h-10 bg-[var(--color-border)]"></div>
          <div>
            <div className="font-[var(--font-mono)] text-[0.65rem] tracking-widest text-[var(--color-muted)]">CATEGORIES</div>
            <div className="text-sm text-[var(--color-ink)] font-medium">3 difficulty levels</div>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
        <SectionCard
          to="/qualification"
          icon={<CheckCircle2 size={22} />}
          title="Qualification Tests"
          description="Demonstrate financial analysis skills across three categories to unlock data submission and review."
        />
        <SectionCard
          to="/data-submission"
          icon={<FileText size={22} />}
          title="Data Submission"
          description="Create finance questions and answers from SEC filings for AI training data."
        />
        <SectionCard
          to="/review"
          icon={<Star size={22} />}
          title="Review Submissions"
          description="Review and grade submissions for quality assurance."
        />
      </div>

      {/* Who we're looking for */}
      <div className="grid grid-cols-2 gap-12">
        <div>
          <h2 className="font-[var(--font-display)] text-xl text-[var(--color-ink)] font-medium mb-3">
            Ideal background
          </h2>
          <p className="text-sm text-[var(--color-ink-light)] leading-relaxed mb-3">
            This project requires comfort reading and reasoning through SEC filings. Ideal backgrounds include:
          </p>
          <ul className="text-sm text-[var(--color-ink-light)] leading-loose space-y-1">
            <li>• CFA Level 2+ candidates</li>
            <li>• Investment banking associates</li>
            <li>• FP&A analysts or Big 4 senior auditors</li>
            <li>• Finance professors or PhD students in accounting/finance</li>
          </ul>
        </div>
        <div>
          <h2 className="font-[var(--font-display)] text-xl text-[var(--color-ink)] font-medium mb-3">
            How the data gets used
          </h2>
          <p className="text-sm text-[var(--color-ink-light)] leading-relaxed mb-3">
            Questions should sound like they came from someone doing real work:
          </p>
          <div className="space-y-2.5">
            {[
              "An IB analyst checking a number in a target's filing during a deal",
              "A fund manager comparing capital allocation across competitors",
              "An equity researcher reconciling segment reporting against MD&A",
            ].map((item, i) => (
              <div key={i} className="flex gap-3">
                <span className="font-[var(--font-mono)] text-xs text-[var(--color-accent)] mt-0.5">0{i + 1}</span>
                <p className="text-sm text-[var(--color-ink-light)] leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DownloadSampleData() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const base = import.meta.env.BASE_URL;

  const download = (format) => {
    const file = format === 'json' ? 'SampleData.jsonl' : 'SampleData.csv';
    const a = document.createElement('a');
    a.href = `${base}sampledata/${file}`;
    a.download = file;
    a.click();
    setOpen(false);
  };

  return (
    <div className="relative shrink-0 mt-2" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2.5 bg-[var(--color-ink)] text-[var(--color-cream)] text-sm font-medium hover:opacity-90 transition-opacity"
      >
        <Download size={15} />
        Download sample data
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute right-0 mt-1 bg-white border border-[var(--color-border)] shadow-lg z-10 min-w-[160px]">
          <button
            onClick={() => download('json')}
            className="w-full text-left px-4 py-2.5 text-sm text-[var(--color-ink)] hover:bg-[var(--color-cream-dark)] transition-colors"
          >
            JSON (.jsonl)
          </button>
          <button
            onClick={() => download('csv')}
            className="w-full text-left px-4 py-2.5 text-sm text-[var(--color-ink)] hover:bg-[var(--color-cream-dark)] transition-colors border-t border-[var(--color-border)]"
          >
            CSV (.csv)
          </button>
        </div>
      )}
    </div>
  );
}

function SectionCard({ to, icon, title, description }) {
  return (
    <Link
      to={to}
      className="group block bg-white border border-[var(--color-border)] p-6 transition-all hover:border-[var(--color-accent)] hover:translate-y-[-2px]"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-[var(--color-accent)]">{icon}</div>
      </div>
      <h3 className="font-[var(--font-display)] text-lg text-[var(--color-ink)] font-medium mb-2">{title}</h3>
      <p className="text-sm text-[var(--color-ink-light)] leading-relaxed mb-4">{description}</p>
      <div className="flex items-center gap-1 text-sm text-[var(--color-accent)] font-medium group-hover:gap-2 transition-all">
        Enter <ChevronRight size={14} />
      </div>
    </Link>
  );
}
