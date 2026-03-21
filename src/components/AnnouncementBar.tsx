"use client";

import { Announcement } from "@/types";

export default function AnnouncementBar({ announcements }: { announcements: Announcement[] }) {
  if (announcements.length === 0) {
    return null;
  }

  return (
    <div className="relative z-40 overflow-hidden bg-charcoal py-2 text-white">
      <div className="announcement-track whitespace-nowrap">
        {[...announcements, ...announcements].map((announcement, index) => (
          <span key={`${announcement.id}-${index}`} className="mx-8 inline-flex items-center gap-3 font-sans text-[11px] uppercase tracking-[0.22em] text-white/85">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
            {announcement.text}
          </span>
        ))}
      </div>
    </div>
  );
}
