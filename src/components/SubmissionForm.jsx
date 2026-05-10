import { useState, useRef } from 'react';
import { X, Upload, FileText, CheckCircle2 } from 'lucide-react';

export default function SubmissionForm({ promptEditable = true, givenPrompt = '', onSubmit, category }) {
  const [formData, setFormData] = useState({
    prompt: givenPrompt,
    expert_answer: '',
    supporting_facts: '',
    justification: '',
    documents: [{ company_name: '', ticker: '', CIK: '', doc_type: '10-K', filing_date: '', doc_period: '', sec_url: '', pdf_url: '', pdf_filename: '' }],
    pii_scrub_confirmed: false
  });

  const updateField = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const updateDocument = (index, field, value) => setFormData(prev => ({
    ...prev,
    documents: prev.documents.map((doc, i) => i === index ? { ...doc, [field]: value } : doc)
  }));

  const addDocument = () => setFormData(prev => ({
    ...prev,
    documents: [...prev.documents, { company_name: '', ticker: '', CIK: '', doc_type: '10-K', filing_date: '', doc_period: '', sec_url: '', pdf_url: '', pdf_filename: '' }]
  }));

  const removeDocument = (index) => setFormData(prev => ({
    ...prev,
    documents: prev.documents.filter((_, i) => i !== index)
  }));

  const handlePdfUpload = (index, file) => {
    if (!file || !file.name.toLowerCase().endsWith('.pdf')) return;
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.map((doc, i) => i === index ? {
        ...doc,
        pdf_filename: file.name,
        pdf_url: 'https://drive.google.com/new_pdf/'
      } : doc)
    }));
  };

  const removePdf = (index) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.map((doc, i) => i === index ? {
        ...doc,
        pdf_filename: '',
        pdf_url: ''
      } : doc)
    }));
  };

  return (
    <div className="bg-white border border-[var(--color-border)] p-6 space-y-5">
      {/* Prompt */}
      <div>
        <label className="font-[var(--font-mono)] text-[0.7rem] tracking-widest text-[var(--color-ink-light)] font-medium block mb-1.5">
          PROMPT
        </label>
        {promptEditable ? (
          <textarea
            value={formData.prompt}
            onChange={e => updateField('prompt', e.target.value)}
            placeholder="Write your financial question here..."
            className="w-full p-3 border border-[var(--color-border)] bg-[var(--color-cream)] text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-accent)] min-h-[5rem] resize-y"
          />
        ) : (
          <div className="p-3 bg-[var(--color-cream-dark)] border border-[var(--color-border)] text-sm text-[var(--color-ink)] italic leading-relaxed">
            "{givenPrompt}"
          </div>
        )}
      </div>

      {/* Expert Answer */}
      <div>
        <label className="font-[var(--font-mono)] text-[0.7rem] tracking-widest text-[var(--color-ink-light)] font-medium block mb-1.5">
          EXPERT ANSWER
        </label>
        <textarea
          value={formData.expert_answer}
          onChange={e => updateField('expert_answer', e.target.value)}
          placeholder="Your factual answer to the prompt..."
          className="w-full p-3 border border-[var(--color-border)] bg-[var(--color-cream)] text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-accent)] min-h-[5rem] resize-y"
        />
      </div>

      {/* Supporting Facts */}
      <div>
        <label className="font-[var(--font-mono)] text-[0.7rem] tracking-widest text-[var(--color-ink-light)] font-medium block mb-1.5">
          SUPPORTING FACTS
        </label>
        <textarea
          value={formData.supporting_facts}
          onChange={e => updateField('supporting_facts', e.target.value)}
          placeholder="Include all relevant data with page references. Self-contained enough that a reviewer can verify without re-opening the document."
          className="w-full p-3 border border-[var(--color-border)] bg-[var(--color-cream)] text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-accent)] min-h-[5rem] resize-y"
        />
      </div>

      {/* Justification */}
      <div>
        <label className="font-[var(--font-mono)] text-[0.7rem] tracking-widest text-[var(--color-ink-light)] font-medium block mb-1.5">
          JUSTIFICATION
        </label>
        <textarea
          value={formData.justification}
          onChange={e => updateField('justification', e.target.value)}
          placeholder="Show your reasoning or computation. For calculations, show the formula, inputs, and arithmetic."
          className="w-full p-3 border border-[var(--color-border)] bg-[var(--color-cream)] text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-accent)] min-h-[4rem] resize-y"
        />
      </div>

      {/* Document Metadata */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="font-[var(--font-mono)] text-[0.7rem] tracking-widest text-[var(--color-ink-light)] font-medium">
            DOCUMENT METADATA
          </label>
          <button onClick={addDocument} className="font-[var(--font-mono)] text-[0.7rem] text-[var(--color-accent)] bg-[var(--color-cream-dark)] border border-[var(--color-border)] px-2 py-1 hover:bg-[var(--color-border)] transition-colors">
            + Add another document
          </button>
        </div>
        <div className="space-y-3">
          {formData.documents.map((doc, idx) => (
            <DocumentCard
              key={idx}
              doc={doc}
              idx={idx}
              total={formData.documents.length}
              onUpdate={updateDocument}
              onRemove={removeDocument}
              onPdfUpload={handlePdfUpload}
              onPdfRemove={removePdf}
            />
          ))}
        </div>
      </div>

      {/* PII Confirmation */}
      <label className="flex items-center gap-2.5 cursor-pointer pt-2">
        <input
          type="checkbox"
          checked={formData.pii_scrub_confirmed}
          onChange={e => updateField('pii_scrub_confirmed', e.target.checked)}
          className="w-4 h-4 accent-[var(--color-accent)]"
        />
        <span className="text-sm text-[var(--color-ink-light)]">
          I confirm there is no PII (names, emails, addresses, etc.) in my submission
        </span>
      </label>

      {/* Submit */}
      {onSubmit && (
        <div className="pt-4 border-t border-[var(--color-border)]">
          <button
            onClick={() => onSubmit(formData)}
            className="px-6 py-3 bg-[var(--color-accent)] text-[var(--color-cream)] text-sm font-medium tracking-wide hover:opacity-90 transition-opacity"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

function DocumentCard({ doc, idx, total, onUpdate, onRemove, onPdfUpload, onPdfRemove }) {
  const fileInputRef = useRef(null);

  return (
    <div className="p-3 bg-[var(--color-cream)] border border-[var(--color-border)]">
      <div className="flex items-center justify-between mb-2">
        <span className="font-[var(--font-mono)] text-[0.65rem] tracking-wider text-[var(--color-accent)] font-medium">
          DOCUMENT {String(idx + 1).padStart(2, '0')}
        </span>
        {total > 1 && (
          <button onClick={() => onRemove(idx)} className="flex items-center gap-1 font-[var(--font-mono)] text-[0.65rem] text-[var(--color-danger)] bg-[#FBF0EB] px-2 py-0.5">
            <X size={11} /> Remove
          </button>
        )}
      </div>
      <div className="grid grid-cols-3 gap-3">
        <CompactField label="Company" value={doc.company_name} onChange={v => onUpdate(idx, 'company_name', v)} />
        <CompactField label="Ticker" value={doc.ticker} onChange={v => onUpdate(idx, 'ticker', v)} />
        <CompactField label="CIK" value={doc.CIK} onChange={v => onUpdate(idx, 'CIK', v)} />
        <CompactField label="Doc Type" value={doc.doc_type} onChange={v => onUpdate(idx, 'doc_type', v)} />
        <CompactField label="Filing Date" value={doc.filing_date} onChange={v => onUpdate(idx, 'filing_date', v)} placeholder="YYYY-MM-DD" />
        <CompactField label="Period" value={doc.doc_period} onChange={v => onUpdate(idx, 'doc_period', v)} placeholder="Q2 2024" />
      </div>
      <div className="mt-3">
        <CompactField label="SEC URL" value={doc.sec_url} onChange={v => onUpdate(idx, 'sec_url', v)} placeholder="https://www.sec.gov/..." full />
      </div>

      {/* PDF Upload */}
      <div className="mt-3">
        <span className="font-[var(--font-mono)] text-[0.6rem] tracking-wider text-[var(--color-muted)]">SOURCE PDF</span>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={e => {
            if (e.target.files[0]) onPdfUpload(idx, e.target.files[0]);
            e.target.value = '';
          }}
        />
        {doc.pdf_filename ? (
          <div className="mt-1 flex items-center gap-2 p-2 border border-[var(--color-border)] bg-white">
            <CheckCircle2 size={14} className="text-[var(--color-success)] shrink-0" />
            <FileText size={14} className="text-[var(--color-accent)] shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-[var(--color-ink)] truncate">{doc.pdf_filename}</p>
              <p className="text-xs text-[var(--color-muted)] truncate">{doc.pdf_url}</p>
            </div>
            <button onClick={() => onPdfRemove(idx)} className="text-[var(--color-danger)] hover:opacity-70 shrink-0">
              <X size={14} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="mt-1 w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-[var(--color-border)] text-sm text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors cursor-pointer"
          >
            <Upload size={15} />
            Upload PDF from SEC filing
          </button>
        )}
      </div>
    </div>
  );
}

function CompactField({ label, value, onChange, placeholder, full }) {
  return (
    <div className={full ? 'col-span-3' : ''}>
      <span className="font-[var(--font-mono)] text-[0.6rem] tracking-wider text-[var(--color-muted)]">{label}</span>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full mt-1 p-2 border border-[var(--color-border)] bg-white text-sm text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-accent)]"
      />
    </div>
  );
}
