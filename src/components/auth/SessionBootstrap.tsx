"use client";

import { useEffect } from "react";
import { loadSession } from "@/lib/auth";

/** Loads the signed-in user once per page load, so synchronous session reads work in click handlers. */
export function SessionBootstrap() {
  useEffect(() => {
    void loadSession();
  }, []);
  return null;
}
