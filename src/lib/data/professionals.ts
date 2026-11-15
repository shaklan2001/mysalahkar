"use client";

/**
 * Professional profiles, read from the API (the database is the only source). Each page load fetches the directory
 * once and each full profile once; every component shares those requests. A failed request is not cached, so the
 * next caller retries.
 */

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { toListing, type ApiProfessional, type MarketplaceListing } from "./marketplace";

let directory: Promise<MarketplaceListing[]> | null = null;
const profiles = new Map<string, Promise<MarketplaceListing | null>>();

/** Every live professional, as listing cards (no long profile fields). */
export function loadProfessionals(): Promise<MarketplaceListing[]> {
  directory ??= api<{ items: ApiProfessional[] }>("/professionals")
    .then(({ items }) => items.map(toListing))
    .catch((error) => {
      directory = null;
      throw error;
    });
  return directory;
}

/** One professional's full profile, or null when there is no live professional with that slug. */
export function loadProfessional(slug: string): Promise<MarketplaceListing | null> {
  let profile = profiles.get(slug);
  if (!profile) {
    profile = api<{ professional: ApiProfessional }>(`/professionals/${encodeURIComponent(slug)}`)
      .then(({ professional }) => toListing(professional))
      .catch((error: unknown) => {
        profiles.delete(slug);
        if (error && typeof error === "object" && "status" in error && error.status === 404) return null;
        throw error;
      });
    profiles.set(slug, profile);
  }
  return profile;
}

export type Loaded<T> =
  | { status: "loading"; data: null }
  | { status: "ready"; data: T }
  | { status: "error"; data: null };

function useLoaded<T>(key: string | null, load: () => Promise<T>): Loaded<T> {
  const [state, setState] = useState<{ key: string | null; value: Loaded<T> }>({
    key: null,
    value: { status: "loading", data: null },
  });

  useEffect(() => {
    if (key === null) return;
    let cancelled = false;
    load().then(
      (data) => !cancelled && setState({ key, value: { status: "ready", data } }),
      () => !cancelled && setState({ key, value: { status: "error", data: null } }),
    );
    return () => {
      cancelled = true;
    };
    // `load` is derived from `key`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return state.key === key ? state.value : { status: "loading", data: null };
}

/** Pass false to hold off (for example until a dialog opens). */
export function useProfessionals(enabled = true): Loaded<MarketplaceListing[]> {
  return useLoaded(enabled ? "directory" : null, loadProfessionals);
}

/** Pass null to wait (for example until the slug is known). */
export function useProfessional(slug: string | null): Loaded<MarketplaceListing | null> {
  return useLoaded(slug, () => loadProfessional(slug ?? ""));
}
