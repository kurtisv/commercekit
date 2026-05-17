"use client";

import { useRouter } from "next/navigation";

import type { Locale } from "@/i18n/config";

export function LanguageSwitcher({ current }: { current: Locale }) {
  const router = useRouter();

  async function setLocale(nextLocale: Locale) {
    await fetch("/api/locale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale: nextLocale }),
    });
    router.refresh();
  }

  return (
    <div className="inline-flex rounded-full border bg-card p-1 text-xs font-semibold shadow-sm">
      {(["fr", "en"] as const).map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => {
            void setLocale(locale);
          }}
          className={
            current === locale
              ? "rounded-full bg-primary px-2.5 py-1 text-primary-foreground"
              : "rounded-full px-2.5 py-1 text-muted-foreground hover:text-foreground"
          }
          aria-pressed={current === locale}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
