/**
 * ShareButtons.tsx — a copy-link button plus a native-share button (when the
 * browser supports the Web Share API). Both share a URL that links back to the
 * site, so shared content is always attributable.
 */
import { useEffect, useState } from "react";
import { useT } from "../i18n";

interface ShareButtonsProps {
  /** Resolves the URL to share (called on click, so it can reflect live state). */
  getUrl: () => string;
  /** Accompanying text for native share sheets. */
  text: string;
  /** Visual size. */
  size?: "sm" | "md";
}

export function ShareButtons({ getUrl, text, size = "md" }: ShareButtonsProps) {
  const t = useT();
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setCanNativeShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

  const flashCopied = () => {
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const copy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      flashCopied();
    } catch {
      // Clipboard may be blocked; fall back to a prompt so the user can copy manually.
      window.prompt(t.share.copyLink, url);
    }
  };

  const onCopy = () => copy(getUrl());

  const onNativeShare = async () => {
    const url = getUrl();
    try {
      await navigator.share({ title: "GG Tank Science Dashboard", text, url });
    } catch {
      // User dismissed the share sheet, or it failed — no action needed.
    }
  };

  const pad = size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm";

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={onCopy}
        className={`inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white font-medium text-slate-700 hover:border-brand-600 hover:text-brand-700 ${pad}`}
      >
        <span aria-hidden="true">{copied ? "✓" : "🔗"}</span>
        {copied ? t.share.copied : t.share.copyLink}
      </button>
      {canNativeShare && (
        <button
          type="button"
          onClick={onNativeShare}
          className={`inline-flex items-center gap-1.5 rounded-md bg-brand-600 font-medium text-white hover:bg-brand-700 ${pad}`}
        >
          <span aria-hidden="true">↗</span>
          {t.share.share}
        </button>
      )}
    </div>
  );
}
