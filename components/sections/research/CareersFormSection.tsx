"use client";

import Link from "next/link";
import { useState } from "react";
import { CAREERS } from "@/content/research";

type InquiryType = (typeof CAREERS.tabs)[number]["value"];

function ArrowIcon() {
  return (
    <svg className="size-3 shrink-0" viewBox="0 0 9 13" fill="none" aria-hidden="true">
      <circle cx="7.22" cy="6.589" r="1.28" fill="currentColor" />
      <circle cx="4.658" cy="4.018" r="1.28" fill="currentColor" />
      <circle cx="2.099" cy="1.46" r="1.28" fill="currentColor" />
      <circle cx="4.658" cy="9.151" r="1.28" fill="currentColor" />
      <circle cx="2.099" cy="11.718" r="1.28" fill="currentColor" />
    </svg>
  );
}

const inputClass =
  "w-full border border-[#C7D7F8] rounded-[10px] bg-mistral-beige px-4 py-3 text-sm text-mistral-black placeholder:text-mistral-black/30 focus:outline-none focus:border-mistral-black/40 transition-colors";

export function CareersFormSection() {
  const [tab, setTab] = useState<InquiryType>("careers");
  const [tabKey, setTabKey] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [updates, setUpdates] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [form, setForm] = useState({
    firstName: "",
    email: "",
    role: "",
    message: "",
    companySize: "",
    industry: "",
    heardFrom: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "message") setCharCount(value.length);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetForm = () => {
    setForm({
      firstName: "",
      email: "",
      role: "",
      message: "",
      companySize: "",
      industry: "",
      heardFrom: "",
    });
    setCharCount(0);
    setUpdates(false);
    setSubmitted(false);
  };

  return (
    <section id="careers" className="py-10 md:py-[100px]">
      <div className="container">
        {!submitted && (
          <div className="text-center mb-10 md:mb-20" data-reveal>
            <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-mistral-black">
              {CAREERS.title}
            </h2>
            <p className="mt-6 md:mt-12 text-sm leading-relaxed text-mistral-black/55 max-w-xl mx-auto">
              {CAREERS.lead}
            </p>
          </div>
        )}

        <div
          className="max-w-[640px] mx-auto w-full"
          data-reveal
          data-reveal-delay="1"
        >
          {!submitted && (
            <div className="border border-[#C7D7F8] rounded-[20px] overflow-hidden bg-mistral-beige-deep">
              {/* Tab bar */}
              <div className="flex border-b border-[#C7D7F8]/60">
                {CAREERS.tabs.map((opt) => {
                  const active = tab === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setTab(opt.value);
                        setTabKey((k) => k + 1);
                      }}
                      className={`flex-1 py-4 text-sm font-medium transition-colors ${
                        active
                          ? "bg-mistral-black text-white"
                          : "text-mistral-black/55 hover:text-mistral-black"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              {/* Tab content */}
              <div key={tabKey} className="px-6 py-7 md:px-10 md:py-10">
                {tab === "columbus-pro" && (
                  <ColumbusProForm
                    form={form}
                    charCount={charCount}
                    onChange={handleChange}
                    onSubmit={handleSend}
                  />
                )}
                {(tab === "investment" || tab === "elio") && (
                  <ElioInvestmentForm
                    tab={tab}
                    form={form}
                    charCount={charCount}
                    updates={updates}
                    onChange={handleChange}
                    onUpdatesChange={setUpdates}
                    onSubmit={handleSend}
                  />
                )}
                {tab === "careers" && (
                  <CareersForm
                    form={form}
                    charCount={charCount}
                    onChange={handleChange}
                    onSubmit={handleSend}
                  />
                )}
              </div>
            </div>
          )}

          {submitted && (
            <div className="flex flex-col items-center text-center py-16">
              <p className="text-3xl md:text-4xl font-semibold text-mistral-black tracking-tight mb-3">
                {CAREERS.success.title}
              </p>
              <p className="text-base md:text-lg leading-relaxed text-mistral-black/55 max-w-md">
                {CAREERS.success.body}
              </p>
              <button
                type="button"
                onClick={resetForm}
                className="group mt-8 inline-flex items-center gap-2 rounded-[7px] px-5 py-2.5 bg-mistral-black text-white text-sm transition-colors hover:bg-mistral-black/80"
              >
                <span>{CAREERS.success.reset}</span>
                <span className="text-mistral-orange transition-transform group-hover:translate-x-0.5">
                  <ArrowIcon />
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-medium text-mistral-black/50 uppercase tracking-wider">
      {children}
    </span>
  );
}

function LegalAndSubmit() {
  return (
    <>
      <p className="text-xs leading-relaxed text-mistral-black/45">
        {CAREERS.legal.prefix}
        <Link href={CAREERS.legal.termsHref} className="underline">
          {CAREERS.legal.termsText}
        </Link>
        {CAREERS.legal.middle}
        <Link href={CAREERS.legal.privacyHref} className="underline">
          {CAREERS.legal.privacyText}
        </Link>
        {CAREERS.legal.suffix}
      </p>
      <button
        type="submit"
        className="group rounded-[7px] flex items-center justify-between w-full sm:w-auto sm:self-start px-5 py-2.5 bg-mistral-black text-white text-sm transition-colors hover:bg-mistral-black/80"
      >
        <span className="mr-3">{CAREERS.submitText}</span>
        <span className="text-mistral-orange transition-transform group-hover:translate-x-0.5">
          <ArrowIcon />
        </span>
      </button>
    </>
  );
}

type FormProps = {
  form: {
    firstName: string;
    email: string;
    role: string;
    message: string;
    companySize: string;
    industry: string;
    heardFrom: string;
  };
  charCount: number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
};

function ColumbusProForm({ form, charCount, onChange, onSubmit }: FormProps) {
  const f = CAREERS.columbusPro;
  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <h3 className="text-xl md:text-2xl font-semibold text-mistral-black tracking-tight">
        {f.heading}
      </h3>

      <label className="flex flex-col gap-2">
        <FieldLabel>{f.fields.email.label}</FieldLabel>
        <input
          type="email"
          name="email"
          required
          value={form.email}
          onChange={onChange}
          placeholder={f.fields.email.placeholder}
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-2">
        <FieldLabel>{f.fields.companySize.label}</FieldLabel>
        <input
          type="text"
          name="companySize"
          required
          value={form.companySize}
          onChange={onChange}
          placeholder={f.fields.companySize.placeholder}
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-2">
        <FieldLabel>{f.fields.industry.label}</FieldLabel>
        <select
          name="industry"
          required
          value={form.industry}
          onChange={onChange}
          className={inputClass + " appearance-none cursor-pointer"}
        >
          <option value="" disabled>
            {f.fields.industry.placeholder}
          </option>
          {f.fields.industry.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-2">
        <FieldLabel>{f.fields.message.label}</FieldLabel>
        <textarea
          name="message"
          required
          maxLength={CAREERS.charLimit}
          rows={4}
          value={form.message}
          onChange={onChange}
          className={inputClass + " resize-y"}
        />
        <span className="text-xs text-right text-mistral-black/35">
          {charCount}/{CAREERS.charLimit}
        </span>
      </label>

      <label className="flex flex-col gap-2">
        <FieldLabel>{f.fields.heardFrom.label}</FieldLabel>
        <select
          name="heardFrom"
          value={form.heardFrom}
          onChange={onChange}
          className={inputClass + " appearance-none cursor-pointer"}
        >
          <option value="" disabled>
            {f.fields.heardFrom.placeholder}
          </option>
          {f.fields.heardFrom.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>

      <LegalAndSubmit />
    </form>
  );
}

function ElioInvestmentForm({
  tab,
  form,
  charCount,
  updates,
  onChange,
  onUpdatesChange,
  onSubmit,
}: FormProps & {
  tab: "elio" | "investment";
  updates: boolean;
  onUpdatesChange: (v: boolean) => void;
}) {
  const heading = tab === "investment" ? CAREERS.investment.heading : CAREERS.elio.heading;
  const roleLabel =
    tab === "investment" ? CAREERS.investment.orgLabel : CAREERS.elio.roleLabel;
  const messageLabel =
    tab === "investment" ? CAREERS.investment.messageLabel : CAREERS.elio.messageLabel;
  const messagePlaceholder =
    tab === "investment"
      ? CAREERS.investment.messagePlaceholder
      : CAREERS.elio.messagePlaceholder;
  const updatesLabel =
    tab === "investment" ? CAREERS.investment.updatesLabel : CAREERS.elio.updatesLabel;

  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <h3 className="text-xl md:text-2xl font-semibold text-mistral-black tracking-tight">
        {heading}
      </h3>

      <label className="flex flex-col gap-2">
        <FieldLabel>{CAREERS.elio.nameLabel}</FieldLabel>
        <input
          type="text"
          name="firstName"
          required
          value={form.firstName}
          onChange={onChange}
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-2">
        <FieldLabel>{CAREERS.elio.emailLabel}</FieldLabel>
        <input
          type="email"
          name="email"
          required
          value={form.email}
          onChange={onChange}
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-2">
        <FieldLabel>{roleLabel}</FieldLabel>
        <input
          type="text"
          name="role"
          required
          value={form.role}
          onChange={onChange}
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-2">
        <FieldLabel>{messageLabel}</FieldLabel>
        <textarea
          name="message"
          required
          maxLength={CAREERS.charLimit}
          rows={4}
          value={form.message}
          onChange={onChange}
          placeholder={messagePlaceholder}
          className={inputClass + " resize-y"}
        />
        <span className="text-xs text-right text-mistral-black/35">
          {charCount}/{CAREERS.charLimit}
        </span>
      </label>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={updates}
          onChange={(e) => onUpdatesChange(e.target.checked)}
          className="mt-1 size-4 accent-mistral-black"
        />
        <span className="text-xs leading-relaxed text-mistral-black/65">
          {updatesLabel}
        </span>
      </label>

      <LegalAndSubmit />
    </form>
  );
}

function CareersForm({ form, charCount, onChange, onSubmit }: FormProps) {
  const f = CAREERS.careersTab;
  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <h3 className="text-xl md:text-2xl font-semibold text-mistral-black tracking-tight">
        {f.heading}
      </h3>

      <label className="flex flex-col gap-2">
        <FieldLabel>{f.nameLabel}</FieldLabel>
        <input
          type="text"
          name="firstName"
          required
          value={form.firstName}
          onChange={onChange}
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-2">
        <FieldLabel>{f.emailLabel}</FieldLabel>
        <input
          type="email"
          name="email"
          required
          value={form.email}
          onChange={onChange}
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-2">
        <FieldLabel>{f.roleLabel}</FieldLabel>
        <input
          type="text"
          name="role"
          required
          value={form.role}
          onChange={onChange}
          placeholder={f.rolePlaceholder}
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-2">
        <FieldLabel>{f.messageLabel}</FieldLabel>
        <textarea
          name="message"
          required
          maxLength={CAREERS.charLimit}
          rows={4}
          value={form.message}
          onChange={onChange}
          placeholder={f.messagePlaceholder}
          className={inputClass + " resize-y"}
        />
        <span className="text-xs text-right text-mistral-black/35">
          {charCount}/{CAREERS.charLimit}
        </span>
      </label>

      <label className="flex flex-col gap-2">
        <FieldLabel>
          {f.resumeLabel}{" "}
          <span className="normal-case text-mistral-black/35">
            {f.resumeNote}
          </span>
        </FieldLabel>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          className="text-sm text-mistral-black file:mr-4 file:py-2 file:px-4 file:rounded-[7px] file:border-0 file:text-xs file:font-medium file:bg-mistral-black file:text-white file:cursor-pointer hover:file:bg-mistral-black/80 file:transition-colors"
        />
      </label>

      <LegalAndSubmit />
    </form>
  );
}
