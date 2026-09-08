"use client";

import {
  APPLICATIONS_STORAGE_KEY,
  type ListingApplication,
  type ListingApplicationStatus,
} from "@/lib/data/marketplace";

function readAll(): ListingApplication[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(APPLICATIONS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ListingApplication[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAll(apps: ListingApplication[]) {
  localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(apps));
}

export function listApplications(): ListingApplication[] {
  return readAll().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function listApprovedApplications(): ListingApplication[] {
  return listApplications().filter((a) => a.status === "approved");
}

export function saveApplication(app: ListingApplication): void {
  const all = readAll().filter((a) => a.id !== app.id);
  all.push(app);
  writeAll(all);
}

export function updateApplicationStatus(
  id: string,
  status: ListingApplicationStatus,
  reviewNote?: string,
): ListingApplication | null {
  const all = readAll();
  const idx = all.findIndex((a) => a.id === id);
  if (idx === -1) return null;
  all[idx] = {
    ...all[idx],
    status,
    reviewedAt: new Date().toISOString(),
    reviewNote,
  };
  writeAll(all);
  return all[idx];
}
