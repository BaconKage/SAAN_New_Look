'use client';

import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, EnvelopeSimpleIcon, WhatsappLogoIcon } from '@phosphor-icons/react';
import { useSearchParams } from 'next/navigation';
import { useId, useMemo, useState } from 'react';

import { products } from '@/content/products';
import { site, whatsappLink } from '@/content/site';
import { solutions } from '@/content/solutions';
import { cn } from '@/lib/utils';

const SPACE_TO_SOLUTION: Record<string, string> = {
  huddle: 'video-conferencing',
  boardroom: 'boardrooms',
  lecture: 'smart-classrooms',
  auditorium: 'professional-audio',
  lobby: 'digital-signage',
};
const SCALE = ['One room', '2 to 5 rooms', '6 to 20 rooms', 'More than 20', 'Campus or multi-site'];
const TIMING = ['Within a month', '1 to 3 months', '3 to 6 months', 'Just exploring'];
const STEPS = ['Space', 'Scale', 'Details'];

export function Planner() {
  const params = useSearchParams();
  const uid = useId();

  const initial = useMemo(() => {
    const picked = new Set<string>();
    const sol = params.get('solution');
    const space = params.get('space');
    const prod = products.find((p) => p.id === params.get('product'));
    if (sol && solutions.some((s) => s.slug === sol)) picked.add(sol);
    if (space && SPACE_TO_SOLUTION[space]) picked.add(SPACE_TO_SOLUTION[space]!);
    if (prod?.solutions[0]) picked.add(prod.solutions[0]);
    return { picked, product: prod ? `${prod.brand} ${prod.name}` : '' };
  }, [params]);

  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<Set<string>>(initial.picked);
  const [scale, setScale] = useState('');
  const [timing, setTiming] = useState('');
  const [form, setForm] = useState({ name: '', org: '', email: '', phone: '', city: '', message: initial.product ? `Interested in the ${initial.product}.` : '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState<null | 'whatsapp' | 'email'>(null);

  const toggle = (slug: string) =>
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });

  const summary = () => {
    const interests = [...picked].map((s) => solutions.find((x) => x.slug === s)?.title).filter(Boolean).join(', ');
    const lines = ['Hello SAAN, I would like to plan a project.', '', `Interested in: ${interests || 'Not sure yet'}`];
    if (scale) lines.push(`Scale: ${scale}`);
    if (timing) lines.push(`Timeline: ${timing}`);
    if (form.city) lines.push(`Location: ${form.city}`);
    lines.push('', `Name: ${form.name}`);
    if (form.org) lines.push(`Organisation: ${form.org}`);
    if (form.email) lines.push(`Email: ${form.email}`);
    if (form.phone) lines.push(`Phone: ${form.phone}`);
    if (form.message) lines.push('', form.message);
    return lines.join('\n');
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Please tell us your name.';
    if (!form.email.trim() && !form.phone.trim()) e.contact = 'Add an email address or a phone number so we can reply.';
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'That email address does not look right.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const send = (via: 'whatsapp' | 'email') => {
    if (!validate()) return;
    const body = summary();
    if (via === 'whatsapp') {
      window.open(whatsappLink(body), '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Project enquiry from ${form.name}`)}&body=${encodeURIComponent(body)}`;
    }
    setSent(via);
  };

  if (sent) {
    return (
      <div className="rounded-[var(--radius-card)] border border-white/[0.08] bg-ink-850 p-8 md:p-12" role="status">
        <span className="grid size-14 place-items-center rounded-full bg-signal-500 text-ink-950">
          <CheckIcon weight="bold" className="size-6" />
        </span>
        <h2 className="display-tight mt-8 text-[2.2rem] text-fog-50">Your brief is ready to send.</h2>
        <p className="mt-4 max-w-lg text-lg leading-relaxed text-fog-400">
          {sent === 'whatsapp'
            ? 'WhatsApp has opened with your project details filled in. Press send there and we will reply on the same chat.'
            : 'Your email app has opened with the details filled in. Press send and we will reply by email.'}{' '}
          If nothing opened, call us on {site.phone.display}.
        </p>
        <button type="button" onClick={() => setSent(null)} className="mt-8 font-medium text-signal-400 underline-offset-4 hover:underline">
          Edit the brief
        </button>
      </div>
    );
  }

  const field = 'mt-2 w-full rounded-xl border border-white/12 bg-ink-850 px-4 py-3.5 text-fog-50 placeholder:text-fog-500 transition-colors focus:border-signal-500 focus:outline-none';
  const chip = (on: boolean) =>
    cn(
      'rounded-full border px-4 py-2.5 text-[0.95rem] transition-colors duration-300',
      on ? 'border-signal-500 bg-signal-500 text-ink-950' : 'border-white/12 text-fog-200 hover:border-white/30',
    );

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (step < 2) setStep(step + 1);
        else send('whatsapp');
      }}
      className="rounded-[var(--radius-card)] border border-white/[0.08] bg-ink-900 p-6 md:p-10"
      aria-labelledby={`${uid}-title`}
    >
      <h2 id={`${uid}-title`} className="sr-only">
        Project planner
      </h2>
      <ol className="grid grid-cols-3 gap-3" aria-label="Progress">
        {STEPS.map((s, i) => (
          <li key={s}>
            <button
              type="button"
              onClick={() => i < step && setStep(i)}
              disabled={i > step}
              aria-current={i === step ? 'step' : undefined}
              className="w-full text-left disabled:cursor-default"
            >
              <span className="relative block h-[3px] overflow-hidden rounded-full bg-white/10">
                <span className={cn('absolute inset-0 origin-left bg-signal-500 transition-transform duration-700 ease-[var(--ease-out-expo)]', i <= step ? 'scale-x-100' : 'scale-x-0')} />
              </span>
              <span className={cn('mt-3 block text-sm', i === step ? 'text-fog-50' : 'text-fog-500')}>{s}</span>
            </button>
          </li>
        ))}
      </ol>

      <div key={step} className="mt-10 animate-[word-in_0.6s_var(--ease-out-expo)_both]">
        {step === 0 && (
          <fieldset>
            <legend className="text-2xl font-semibold text-fog-50" style={{ fontStretch: '110%' }}>
              What are you planning?
            </legend>
            <p className="mt-2 text-fog-400">Pick everything that applies.</p>
            <div className="mt-7 grid gap-2 sm:grid-cols-2">
              {solutions.map((s) => {
                const on = picked.has(s.slug);
                return (
                  <button
                    key={s.slug}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(s.slug)}
                    className={cn(
                      'flex items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left transition-colors duration-300',
                      on ? 'border-signal-500 bg-signal-500/10 text-fog-50' : 'border-white/10 text-fog-200 hover:border-white/25',
                    )}
                  >
                    <span>{s.title}</span>
                    <span className={cn('grid size-6 shrink-0 place-items-center rounded-full border transition-colors', on ? 'border-signal-500 bg-signal-500 text-ink-950' : 'border-white/20')}>
                      {on && <CheckIcon weight="bold" className="size-3.5" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        {step === 1 && (
          <div className="space-y-9">
            <fieldset>
              <legend className="text-2xl font-semibold text-fog-50" style={{ fontStretch: '110%' }}>
                How big is the project?
              </legend>
              <div className="mt-5 flex flex-wrap gap-2">
                {SCALE.map((s) => (
                  <button key={s} type="button" aria-pressed={scale === s} onClick={() => setScale(scale === s ? '' : s)} className={chip(scale === s)}>
                    {s}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-2xl font-semibold text-fog-50" style={{ fontStretch: '110%' }}>
                When do you need it?
              </legend>
              <div className="mt-5 flex flex-wrap gap-2">
                {TIMING.map((s) => (
                  <button key={s} type="button" aria-pressed={timing === s} onClick={() => setTiming(timing === s ? '' : s)} className={chip(timing === s)}>
                    {s}
                  </button>
                ))}
              </div>
            </fieldset>
            <div>
              <label htmlFor={`${uid}-city`} className="text-fog-200">
                City or site location
              </label>
              <input id={`${uid}-city`} value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className={field} placeholder="For example, Bengaluru" autoComplete="address-level2" />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <p className="text-2xl font-semibold text-fog-50" style={{ fontStretch: '110%' }}>
                Where should we reply?
              </p>
            </div>
            <div>
              <label htmlFor={`${uid}-name`} className="text-fog-200">
                Your name
              </label>
              <input id={`${uid}-name`} required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={field} autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? `${uid}-name-err` : undefined} />
              {errors.name && (
                <p id={`${uid}-name-err`} className="mt-2 text-sm text-signal-300">
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <label htmlFor={`${uid}-org`} className="text-fog-200">
                Organisation
              </label>
              <input id={`${uid}-org`} value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} className={field} autoComplete="organization" />
            </div>
            <div>
              <label htmlFor={`${uid}-email`} className="text-fog-200">
                Email
              </label>
              <input id={`${uid}-email`} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={field} autoComplete="email" aria-invalid={Boolean(errors.email)} />
              {errors.email && <p className="mt-2 text-sm text-signal-300">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor={`${uid}-phone`} className="text-fog-200">
                Phone
              </label>
              <input id={`${uid}-phone`} type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={field} autoComplete="tel" />
            </div>
            {errors.contact && <p className="text-sm text-signal-300 sm:col-span-2">{errors.contact}</p>}
            <div className="sm:col-span-2">
              <label htmlFor={`${uid}-msg`} className="text-fog-200">
                Anything else we should know?
              </label>
              <textarea id={`${uid}-msg`} rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={cn(field, 'resize-y')} placeholder="Room sizes, existing equipment, platforms you use" />
            </div>
          </div>
        )}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-7">
        {step > 0 ? (
          <button type="button" onClick={() => setStep(step - 1)} className="inline-flex items-center gap-2 text-fog-400 transition-colors hover:text-fog-50">
            <ArrowLeftIcon className="size-4" /> Back
          </button>
        ) : (
          <span />
        )}
        {step < 2 ? (
          <button type="submit" className="inline-flex h-12 items-center gap-3 rounded-full bg-signal-500 pl-6 pr-5 font-medium text-ink-950 transition-colors hover:bg-signal-400 active:scale-[0.98]">
            Continue <ArrowRightIcon weight="bold" className="size-4" />
          </button>
        ) : (
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={() => send('email')} className="inline-flex h-12 items-center gap-2.5 rounded-full border border-white/15 px-6 font-medium text-fog-50 transition-colors hover:bg-white/5">
              <EnvelopeSimpleIcon className="size-5" /> Send by email
            </button>
            <button type="submit" className="inline-flex h-12 items-center gap-2.5 rounded-full bg-signal-500 px-6 font-medium text-ink-950 transition-colors hover:bg-signal-400 active:scale-[0.98]">
              <WhatsappLogoIcon weight="bold" className="size-5" /> Send on WhatsApp
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
