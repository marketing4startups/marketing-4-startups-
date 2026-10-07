import { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'm4s:planner:v1';

const channelOptions = [
  { value: 'Pain-point search content', label: 'Search content', small: 'Helpful pages for people already looking.' },
  { value: 'Direct outreach', label: 'Direct outreach', small: 'Speak with likely customers directly.' },
  { value: 'Partners', label: 'Partners', small: 'Reach buyers through trusted groups.' },
  { value: 'Communities', label: 'Communities', small: 'Help where customers already gather.' },
  { value: 'Social media', label: 'Social media', small: 'Share useful ideas where people spend time.' },
  { value: 'Referrals', label: 'Referrals', small: 'Ask customers or peers for introductions.' },
  { value: 'Paid ads', label: 'Paid ads', small: 'Test a capped message and audience.' },
  { value: 'Events', label: 'Events', small: 'Meet a focused group of likely buyers.' },
];

const defaultFormData = {
  company: '',
  stage: '',
  goal: '',
  timeframe: '60 days',
  currency: '€',
  audience: '',
  problem: '',
  lasttime: '',
  workaround: '',
  evidence: '',
  product: '',
  category: '',
  alternative: '',
  difference: '',
  proof: '',
  first: '',
  days: '14 days',
  test: '',
  measure: '',
  search: '',
  reverse: '',
  trial: '14 days',
  budget: '',
  cap: '',
  revenue: '',
  margin: '',
  life: '',
  payback: '',
  channels: [] as string[],
};

const titles = [
  'Build a focused growth plan.',
  'Start with a real customer.',
  'Make your message clear.',
  'Choose one small channel test.',
  'Set money guardrails.',
];

const descriptions = [
  'A few clear answers make a practical plan. Edit any answer before downloading.',
  'Learn what people already do, rather than asking if they like your idea.',
  'Say who you help, what you replace, and why you fit better.',
  'Choose one channel test with a clear result and fixed limit.',
  'Unknown numbers mean the plan should stay in test mode.',
];

const stepKickers = [
  'START WITH THE GOAL',
  'LEARN ABOUT THE CUSTOMER',
  'POSITION YOUR PRODUCT',
  'TEST A CHANNEL',
  'GOVERN THE SPEND',
];

function escapeHtml(value: string): string {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character as keyof Record<string, string>] || character);
}

function moneyDisplay(amount: number | null, currency: string): string {
  if (amount === null || Number.isNaN(amount)) return 'Not added';
  const prefix = currency || '';
  return `${prefix}${amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}

function toDisplayValue(value: string | string[] | undefined, fallback = 'Not added'): string {
  if (Array.isArray(value)) return value.length ? value.join(' · ') : fallback;
  if (typeof value === 'string' && value.trim()) return value.trim();
  return fallback;
}

function buildReportMarkup(formData: typeof defaultFormData): string {
  const currency = formData.currency || '';
  const revenue = Number(formData.revenue) || 0;
  const margin = Number(formData.margin) || 0;
  const life = Number(formData.life) || 0;
  const payback = Number(formData.payback) || 0;
  const ltv = revenue > 0 && margin > 0 && life > 0 && margin <= 100 ? revenue * (margin / 100) * life : null;
  const capL = ltv !== null ? ltv / 3 : null;
  const capP = revenue > 0 && margin > 0 && payback > 0 ? revenue * (margin / 100) * payback : null;
  const cap = capL !== null && capP !== null ? Math.min(capL, capP) : capL ?? capP;
  const channels = formData.channels || [];
  const seo = channels.includes('Pain-point search content');

  const questions = [
    'Tell me about the last time this happened.',
    'What did you try first? What happened?',
    'What did that cost in time or money?',
    'What have you already paid for or tried?',
    'Who decides or pays for a solution?',
  ];

  const metric = [
    ltv !== null
      ? `<div class="metric"><b>${escapeHtml(moneyDisplay(ltv, currency))}</b><small>Lifetime gross profit per customer</small></div>`
      : '',
    capL !== null
      ? `<div class="metric"><b>${escapeHtml(moneyDisplay(capL, currency))}</b><small>Cost cap at 3:1 LTV to CAC</small></div>`
      : '',
    capP !== null
      ? `<div class="metric"><b>${escapeHtml(moneyDisplay(capP, currency))}</b><small>Cost cap at payback limit</small></div>`
      : '',
  ].filter(Boolean).join('');

  const note = seo ? `<p><b>Pain-point SEO:</b> Write a useful page answering “${escapeHtml(toDisplayValue(formData.search, toDisplayValue(formData.problem)))}”. Explain the problem and practical next steps; measure qualified leads, not just views.</p>` : '';

  return `
    <div class="report-head">
      <div class="reportbrand">
        <img src="/marketing4startups-mark.svg" alt="Marketing4Startups" />
        <b>Marketing4Startups</b>
      </div>
      <span class="reportdate">GROWTH PLAN · ${escapeHtml(new Date().toLocaleDateString())}</span>
    </div>
    <h2>${escapeHtml(toDisplayValue(formData.company, 'Your startup'))} growth plan</h2>
    <p class="sub">${escapeHtml(toDisplayValue(formData.stage, 'Stage not selected'))} · ${escapeHtml(toDisplayValue(formData.timeframe, '60 days'))} · Goal: ${escapeHtml(toDisplayValue(formData.goal))}</p>

    <section class="sec">
      <h3>1 · Customer and problem</h3>
      <p><b>Customer:</b> ${escapeHtml(toDisplayValue(formData.audience))}</p>
      <p><b>Problem:</b> ${escapeHtml(toDisplayValue(formData.problem))}</p>
      <p><b>Current workaround:</b> ${escapeHtml(toDisplayValue(formData.workaround))}</p>
      <p><b>Recent story:</b> ${escapeHtml(toDisplayValue(formData.lasttime, 'Collect one in an interview.'))} ${escapeHtml(toDisplayValue(formData.evidence, ''))}</p>
    </section>

    <section class="sec">
      <h3>2 · Positioning</h3>
      <div class="position">For <b>${escapeHtml(toDisplayValue(formData.audience, '[customer]'))}</b> who need <b>${escapeHtml(toDisplayValue(formData.problem, '[job]'))}</b>, <b>${escapeHtml(toDisplayValue(formData.product, '[product]'))}</b> is a <b>${escapeHtml(toDisplayValue(formData.category, '[category]'))}</b> that <b>${escapeHtml(toDisplayValue(formData.difference, '[difference]'))}</b>. Unlike <b>${escapeHtml(toDisplayValue(formData.alternative, '[alternative]'))}</b>, it is backed by <b>${escapeHtml(toDisplayValue(formData.proof, '[proof to collect]'))}</b>.</div>
    </section>

    <section class="sec">
      <h3>3 · Bullseye channel test</h3>
      <p><b>Shortlist:</b> ${escapeHtml(channels.length ? channels.join(' · ') : 'No channel selected')}</p>
      <p><b>Test first:</b> ${escapeHtml(toDisplayValue(formData.first))} for ${escapeHtml(toDisplayValue(formData.days, '14 days'))}</p>
      <p><b>Small action:</b> ${escapeHtml(toDisplayValue(formData.test))}</p>
      <p><b>Count:</b> ${escapeHtml(toDisplayValue(formData.measure))}</p>
      <p><b>Test cap:</b> ${formData.cap && Number(formData.cap) > 0 ? escapeHtml(moneyDisplay(Number(formData.cap), currency)) : 'Set before starting'} · <b>Plan budget:</b> ${formData.budget && Number(formData.budget) > 0 ? escapeHtml(moneyDisplay(Number(formData.budget), currency)) : 'Not entered'}</p>
      ${note}
    </section>

    <section class="sec">
      <h3>4 · Customer discovery</h3>
      <p>Speak with five people who fit your target. Ask about past behavior; do not pitch during discovery.</p>
      <ol>${questions.map((entry) => `<li>${escapeHtml(entry)}</li>`).join('')}</ol>
    </section>

    <section class="sec">
      <h3>5 · Free-to-paid trial</h3>
      <p>${formData.reverse === 'yes' ? `Offer new users a clear ${escapeHtml(toDisplayValue(formData.trial, '14 days'))} trial of paid features. Track activation, feature use, conversion, and retention. State the end date and price clearly.` : 'For software, consider a short, clear trial of paid features. Track activation, paid conversion, and retention. Skip it if it does not fit your offer.'}</p>
    </section>

    <section class="sec">
      <h3>6 · Unit economics guardrails</h3>
      <p>Monthly revenue per customer: ${revenue > 0 ? escapeHtml(moneyDisplay(revenue, currency)) : 'unknown'} · Gross margin: ${margin > 0 && margin <= 100 ? escapeHtml(`${margin}%`) : 'unknown'} · Customer life: ${life > 0 ? escapeHtml(`${life} months`) : 'unknown'}</p>
      ${metric ? `<div class="metrics">${metric}</div>` : '<div class="rnote">Economics are not ready to approve scaling. Keep spend within the test cap and calculate a customer cost ceiling before increasing spend.</div>'}
      <p><b>Decision rule:</b> Scale only if qualified customers cost less than the lower of the 3:1 LTV limit and payback limit, and results repeat. Otherwise stop or change one thing.</p>
    </section>

    <section class="sec">
      <h3>Next actions</h3>
      <ol>
        <li>Complete five customer conversations and record recent examples.</li>
        <li>Run the ${escapeHtml(toDisplayValue(formData.first, 'chosen channel'))} test with one measure and a spend limit.</li>
        <li>Review after ${escapeHtml(toDisplayValue(formData.days, '14 days'))}: stop, adjust, or repeat.</li>
      </ol>
    </section>

    <div class="rfoot">Working plan, not a forecast. Label estimates and replace them with observed customer and cost data. Draft saved only in this browser.</div>
  `;
}

function hasRequiredFields(step: number, formData: typeof defaultFormData): boolean {
  if (step === 0) {
    return !!formData.company.trim() && !!formData.goal.trim();
  }
  if (step === 1) {
    return !!formData.audience.trim() && !!formData.problem.trim() && !!formData.workaround.trim();
  }
  if (step === 2) {
    return !!formData.product.trim() && !!formData.category.trim() && !!formData.alternative.trim() && !!formData.difference.trim();
  }
  if (step === 3) {
    return !!formData.channels.length && !!formData.first.trim() && !!formData.test.trim() && !!formData.measure.trim();
  }
  return true;
}

export default function App() {
  const [formData, setFormData] = useState(defaultFormData);
  const [step, setStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [saveStatus, setSaveStatus] = useState('Private draft · saved on this device');

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved: Partial<typeof defaultFormData> = JSON.parse(raw);
        if (saved) {
          setFormData({ ...defaultFormData, ...saved, channels: Array.isArray(saved.channels) ? saved.channels : [] });
        }
      }
    } catch {
      setSaveStatus('Could not read saved draft');
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      setSaveStatus('Private draft · saved on this device');
    } catch {
      setSaveStatus('Draft could not be saved');
    }
  }, [formData]);

  const chosenChannels = formData.channels;
  const reportHtml = useMemo(() => buildReportMarkup(formData), [formData]);

  const updateField = (field: keyof typeof defaultFormData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const updateFieldArray = (field: 'channels', value: string) => {
    setFormData((current) => {
      const existing = current.channels || [];
      const next = existing.includes(value)
        ? existing.filter((item) => item !== value)
        : [...existing, value];
      return { ...current, [field]: next.slice(0, 3) };
    });
  };

  const handleStepChange = (nextStep: number) => {
    const safeIndex = Math.max(0, Math.min(4, nextStep));
    setStep(safeIndex);
    setErrorMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const validateCurrentStep = (index: number) => {
    if (!hasRequiredFields(index, formData)) {
      setErrorMessage(index === 3 ? 'Choose at least one possible channel and complete the test details.' : 'Please complete the required fields before continuing.');
      return false;
    }

    if (index === 3 && !formData.first.trim()) {
      setErrorMessage('Choose which channel to test first.');
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (!validateCurrentStep(step)) return;
    if (step < 4) handleStepChange(step + 1);
  };

  const handleBack = () => {
    if (step > 0) handleStepChange(step - 1);
  };

  const handleJump = (destination: number) => {
    if (destination <= step) {
      handleStepChange(destination);
      return;
    }

    for (let index = step; index < destination; index += 1) {
      if (!hasRequiredFields(index, formData)) {
        setErrorMessage(index === 3 ? 'Choose at least one possible channel and complete the test details.' : 'Please complete the required fields before continuing.');
        return;
      }
    }
    handleStepChange(destination);
  };

  const handleClear = () => {
    const shouldClear = window.confirm('Clear this saved plan from this browser?');
    if (!shouldClear) return;
    localStorage.removeItem(STORAGE_KEY);
    setFormData({ ...defaultFormData, timeframe: '60 days', currency: '€', days: '14 days', trial: '14 days' });
    setStep(0);
    setErrorMessage('');
    setSaveStatus('New private plan');
  };

  const handleDownload = () => {
    window.print();
  };

  const handleSelectedChannels = (value: string) => {
    setFormData((current) => {
      const list = current.channels || [];
      const next = list.includes(value) ? list.filter((entry) => entry !== value) : [...list, value];
      if (next.length > 3) return current;
      const updated = { ...current, channels: next };
      if (!next.includes(current.first)) {
        updated.first = '';
      }
      return updated;
    });
  };

  const panel = [
    <section key="0" className={`panel ${step === 0 ? 'active' : ''}`} data-panel="0">
      <h2>What are you building?</h2>
      <p className="lead">Choose one clear result and a short window.</p>
      <div className="grid">
        <div className="field">
          <label htmlFor="company">STARTUP OR PRODUCT NAME</label>
          <input id="company" maxLength={100} placeholder="e.g. Northstar" value={formData.company} onChange={(e) => updateField('company', e.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="stage">WHERE ARE YOU TODAY?</label>
          <select id="stage" value={formData.stage} onChange={(e) => updateField('stage', e.target.value)}>
            <option value="">Choose one</option>
            <option>Idea or research</option>
            <option>Building a first version</option>
            <option>Early customers</option>
            <option>Growing sales</option>
          </select>
        </div>
        <div className="field full">
          <label htmlFor="goal">WHAT WOULD A GOOD RESULT LOOK LIKE?</label>
          <textarea id="goal" maxLength={400} placeholder="e.g. Book 10 qualified demos" value={formData.goal} onChange={(e) => updateField('goal', e.target.value)} required />
          <p className="hint">Choose something you can count: interviews, trials, demos, or customers.</p>
        </div>
        <div className="field">
          <label htmlFor="timeframe">PLAN LENGTH</label>
          <select id="timeframe" value={formData.timeframe} onChange={(e) => updateField('timeframe', e.target.value)}>
            <option>30 days</option>
            <option>60 days</option>
            <option>90 days</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="currency">CURRENCY</label>
          <select id="currency" value={formData.currency} onChange={(e) => updateField('currency', e.target.value)}>
            <option value="€">Euro (€)</option>
            <option value="$">US dollar ($)</option>
            <option value="£">Pound (£)</option>
            <option value="">Other / unsure</option>
          </select>
        </div>
      </div>
      <div className="callout">Start with one audience and one important problem. Expand when you have proof.</div>
    </section>,

    <section key="1" className={`panel ${step === 1 ? 'active' : ''}`} data-panel="1">
      <h2>Choose a real customer problem.</h2>
      <p className="lead">Use the Mom Test: ask about what people already do, not whether they like your idea.</p>
      <div className="grid">
        <div className="field full">
          <label htmlFor="audience">WHO HAS THIS PROBLEM?</label>
          <textarea id="audience" maxLength={400} placeholder="Their role, situation, or type of business." value={formData.audience} onChange={(e) => updateField('audience', e.target.value)} required />
        </div>
        <div className="field full">
          <label htmlFor="problem">WHAT PAINFUL JOB ARE THEY TRYING TO DO?</label>
          <textarea id="problem" maxLength={500} placeholder="Describe the problem in the customer's words." value={formData.problem} onChange={(e) => updateField('problem', e.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="lasttime">WHEN DID IT HAPPEN MOST RECENTLY?</label>
          <textarea id="lasttime" maxLength={350} placeholder="What happened the last time?" value={formData.lasttime} onChange={(e) => updateField('lasttime', e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="workaround">WHAT DO THEY DO INSTEAD TODAY?</label>
          <textarea id="workaround" maxLength={350} placeholder="Tool, workaround, delay, or cost." value={formData.workaround} onChange={(e) => updateField('workaround', e.target.value)} required />
        </div>
        <div className="field full">
          <label htmlFor="evidence">WHAT SHOWS IT MATTERS? <small>Optional</small></label>
          <textarea id="evidence" maxLength={400} placeholder="Past spending, attempts, time lost, or a customer story." value={formData.evidence} onChange={(e) => updateField('evidence', e.target.value)} />
        </div>
      </div>
      <div className="callout"><b>Ask:</b> “Tell me about the last time this happened.” “What did you try?” “What was hard?” Avoid pitching your product.</div>
    </section>,

    <section key="2" className={`panel ${step === 2 ? 'active' : ''}`} data-panel="2">
      <h2>Explain why your product is different.</h2>
      <p className="lead">Make it clear who you help, what you replace, and why your product fits better.</p>
      <div className="grid">
        <div className="field">
          <label htmlFor="product">WHAT DO YOU OFFER?</label>
          <input id="product" maxLength={150} placeholder="Product or service" value={formData.product} onChange={(e) => updateField('product', e.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="category">WHAT KIND OF THING IS IT?</label>
          <input id="category" maxLength={150} placeholder="e.g. Scheduling app" value={formData.category} onChange={(e) => updateField('category', e.target.value)} required />
        </div>
        <div className="field full">
          <label htmlFor="alternative">WHAT DO CUSTOMERS USE OR DO INSTEAD?</label>
          <textarea id="alternative" maxLength={350} placeholder="Include doing nothing." value={formData.alternative} onChange={(e) => updateField('alternative', e.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="difference">WHAT IS THE MAIN DIFFERENCE?</label>
          <textarea id="difference" maxLength={350} placeholder="A useful advantage for this customer." value={formData.difference} onChange={(e) => updateField('difference', e.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="proof">WHAT PROOF CAN YOU SHOW? <small>Optional</small></label>
          <textarea id="proof" maxLength={350} placeholder="A result, demo, story, or “not tested yet.”" value={formData.proof} onChange={(e) => updateField('proof', e.target.value)} />
        </div>
      </div>
      <div className="callout">If proof is missing, say so. Make collecting proof part of the plan.</div>
    </section>,

    <section key="3" className={`panel ${step === 3 ? 'active' : ''}`} data-panel="3">
      <h2>Pick a small channel test.</h2>
      <p className="lead">List a few ways to reach your customers (Bullseye), then choose one to test first.</p>
      <b className="group">POSSIBLE WAYS TO REACH THEM · CHOOSE UP TO THREE</b>
      <div className="channels">
        {channelOptions.map((option) => (
          <div className="ch" key={option.value}>
            <input
              id={option.value.toLowerCase().replace(/\s+/g, '-')}
              type="checkbox"
              value={option.value}
              checked={chosenChannels.includes(option.value)}
              onChange={() => handleSelectedChannels(option.value)}
            />
            <label htmlFor={option.value.toLowerCase().replace(/\s+/g, '-')}> 
              <b>{option.label}</b>
              <small>{option.small}</small>
            </label>
          </div>
        ))}
      </div>
      <p className="count">{chosenChannels.length} of 3 selected</p>
      <div className="grid">
        <div className="field">
          <label htmlFor="first">WHICH WILL YOU TEST FIRST?</label>
          <select id="first" value={formData.first} onChange={(e) => updateField('first', e.target.value)} required>
            <option value="">Choose a selected channel</option>
            {chosenChannels.map((channel) => (
              <option key={channel} value={channel}>{channel}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="days">HOW LONG?</label>
          <select id="days" value={formData.days} onChange={(e) => updateField('days', e.target.value)}>
            <option>7 days</option>
            <option>14 days</option>
            <option>30 days</option>
          </select>
        </div>
        <div className="field full">
          <label htmlFor="test">WHAT SMALL ACTION WILL YOU TAKE?</label>
          <textarea id="test" maxLength={350} placeholder="e.g. Ask 15 operations managers one useful question." value={formData.test} onChange={(e) => updateField('test', e.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="measure">WHAT RESULT WILL YOU COUNT?</label>
          <input id="measure" maxLength={160} placeholder="e.g. Qualified replies" value={formData.measure} onChange={(e) => updateField('measure', e.target.value)} required />
        </div>
        <div className="field">
          <label htmlFor="search">WHAT WOULD THEY SEARCH FOR? <small>Optional</small></label>
          <input id="search" maxLength={180} placeholder="Problem in their own words" value={formData.search} onChange={(e) => updateField('search', e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="reverse">CAN USERS TRY PAID FEATURES FIRST?</label>
          <select id="reverse" value={formData.reverse} onChange={(e) => updateField('reverse', e.target.value)}>
            <option value="">Choose one</option>
            <option value="yes">Yes — software product</option>
            <option value="no">No / not relevant</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="trial">IF YES, HOW LONG? <small>Optional</small></label>
          <select id="trial" value={formData.trial} onChange={(e) => updateField('trial', e.target.value)}>
            <option>7 days</option>
            <option>14 days</option>
            <option>30 days</option>
          </select>
        </div>
      </div>
      <div className="callout">Set a spending limit before a test. Clicks and likes alone are not proof of sales.</div>
    </section>,

    <section key="4" className={`panel ${step === 4 ? 'active' : ''}`} data-panel="4">
      <h2>Set money guardrails and get your plan.</h2>
      <p className="lead">Use real numbers where you can. Unknown numbers mean: keep the test small.</p>
      <div className="grid">
        <div className="field">
          <label htmlFor="budget">TOTAL BUDGET <small>Optional</small></label>
          <input id="budget" type="number" min="0" step=".01" placeholder="e.g. 500" value={formData.budget} onChange={(e) => updateField('budget', e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="cap">MAX SPEND ON THIS TEST <small>Optional</small></label>
          <input id="cap" type="number" min="0" step=".01" placeholder="e.g. 100" value={formData.cap} onChange={(e) => updateField('cap', e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="revenue">MONTHLY REVENUE PER CUSTOMER <small>Optional</small></label>
          <input id="revenue" type="number" min="0" step=".01" placeholder="e.g. 80" value={formData.revenue} onChange={(e) => updateField('revenue', e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="margin">GROSS MARGIN (%) <small>Optional</small></label>
          <input id="margin" type="number" min="0" max="100" step=".1" placeholder="e.g. 75" value={formData.margin} onChange={(e) => updateField('margin', e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="life">EXPECTED CUSTOMER LIFE (MONTHS) <small>Optional</small></label>
          <input id="life" type="number" min="0" step=".1" placeholder="e.g. 18" value={formData.life} onChange={(e) => updateField('life', e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="payback">MAX PAYBACK (MONTHS) <small>Optional</small></label>
          <input id="payback" type="number" min="0" step=".1" placeholder="e.g. 6" value={formData.payback} onChange={(e) => updateField('payback', e.target.value)} />
        </div>
      </div>
      <div className="callout">Do not scale paid growth until customer value, acquisition cost, and payback fit your limits. Replace estimates with real results.</div>
      <div id="pdf-report" className="report hidden" aria-live="polite" dangerouslySetInnerHTML={{ __html: reportHtml }} />
      <p id="error" className="error" role="alert">{errorMessage}</p>
      <div className="actions">
        <button type="button" className="secondary" onClick={handleBack}>Back</button>
        <div className="aright">
          <button type="button" className="secondary" onClick={() => handleStepChange(0)}>Review answers</button>
          <button type="button" className="primary" onClick={handleDownload}>Download strategy PDF</button>
        </div>
      </div>
    </section>,
  ];

  return (
    <>
      <header className="top">
        <a className="brand" href="#">
          <img src="/marketing4startups-mark.svg" alt="Marketing4Startups mark" />
          <span>
            <b>Marketing4Startups</b>
            <small>GROWTH, WITH EVIDENCE</small>
          </span>
        </a>
        <span id="save">{saveStatus}</span>
        <button id="clear" type="button" onClick={handleClear}>Clear draft</button>
      </header>

      <main className="layout">
        <aside className="rail">
          <h2>YOUR PLAN · FIVE STEPS</h2>
          <nav aria-label="Planner progress">
            {[0, 1, 2, 3, 4].map((index) => (
              <button
                key={index}
                type="button"
                className={step === index ? 'active' : index < step ? 'done' : ''}
                data-go={index}
                onClick={() => handleJump(index)}
              >
                <span>{index + 1}</span> {['Goal', 'Customer', 'Message', 'Channel test', 'Money'][index]}
              </button>
            ))}
          </nav>
          <p className="rail-note">Your answers stay in this browser. No account, sign-in, or upload.</p>
        </aside>

        <section>
          <div className="intro">
            <div className="eyebrow" id="kicker">STEP {step + 1} OF 5 · {stepKickers[step]}</div>
            <h1 id="title">{titles[step]}</h1>
            <p id="desc">{descriptions[step]}</p>
          </div>

          <form id="planner" noValidate>
            {panel}

            <p className="error" id="form-error" role="alert">{errorMessage}</p>
            <div className="actions" id="nav-actions">
              <button id="back" className="secondary" type="button" hidden={step === 0} onClick={handleBack}>Back</button>
              <button id="next" className="primary" type="button" hidden={step === 4} onClick={handleNext}>Continue</button>
            </div>
          </form>
        </section>
      </main>

      <footer className="footer">
        Draft saved only in this browser · <a href="/privacy-notice.md">Privacy and data</a>
      </footer>
    </>
  );
}
