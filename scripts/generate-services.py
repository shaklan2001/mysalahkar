#!/usr/bin/env python3
"""Regenerate src/lib/data/services.ts from docs/Service List.xlsx."""

from __future__ import annotations

import json
import re
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
XLSX = ROOT / "docs" / "Service List.xlsx"
OUT_TS = ROOT / "src" / "lib" / "data" / "services.ts"


def col_idx(ref: str) -> int:
    m = re.match(r"([A-Z]+)", ref)
    col = 0
    for ch in m.group(1):
        col = col * 26 + (ord(ch) - ord("A") + 1)
    return col - 1


def clean_consultant(s: str) -> str:
    s = (s or "").strip()
    for p in [
        "( Consultant-",
        "(Consultant-",
        "Consultant-",
        "Consultant -",
        "( Consultant -",
    ]:
        if s.startswith(p):
            s = s[len(p) :]
    return s.rstrip(")").strip()


def esc(s: str) -> str:
    return s.replace("\\", "\\\\").replace('"', '\\"')


def parse_rows(z: zipfile.ZipFile, sheet: str, shared: list[str], ns: dict) -> list[list[str]]:
    sheet_xml = ET.fromstring(z.read(sheet))
    rows_raw: list[dict[int, str]] = []
    max_col = 0
    for row in sheet_xml.findall("m:sheetData/m:row", ns):
        cells: dict[int, str] = {}
        for c in row.findall("m:c", ns):
            idx = col_idx(c.get("r", ""))
            max_col = max(max_col, idx)
            t = c.get("t")
            v = c.find("m:v", ns)
            if v is not None:
                cells[idx] = shared[int(v.text)] if t == "s" else v.text
        rows_raw.append(cells)
    rows: list[list[str]] = []
    for cells in rows_raw:
        r = [""] * (max_col + 1)
        for i, v in cells.items():
            r[i] = v
        rows.append(r)
    return rows


def main() -> None:
    with zipfile.ZipFile(XLSX) as z:
        ns = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
        shared: list[str] = []
        root = ET.fromstring(z.read("xl/sharedStrings.xml"))
        for si in root.findall("m:si", ns):
            texts = []
            for t in si.findall(".//m:t", ns):
                if t.text:
                    texts.append(t.text)
            shared.append("".join(texts))

        rows1 = parse_rows(z, "xl/worksheets/sheet1.xml", shared, ns)
        syb_services: list[dict[str, str]] = []
        roc_services: list[dict[str, str]] = []
        for r in rows1[1:]:
            n0, c0 = r[0].strip(), clean_consultant(r[1])
            n3 = r[3].strip() if len(r) > 3 else ""
            c3 = clean_consultant(r[4]) if len(r) > 4 else ""
            if n0 and not n0.startswith("("):
                syb_services.append({"name": n0, "consultant": c0})
            if n3 and not n3.startswith("("):
                roc_services.append({"name": n3, "consultant": c3 or "Soniya Gupta"})

        section_splits = {
            "Income Tax": "income-tax-tds",
            "TDS": "income-tax-tds",
            "GST": "gst",
            "Trademark": "trademark",
            "FEMA": "fema",
            "Audit & Valuations": "audit-valuations",
            "Financial Services": "financial-services",
            "Services In UAE": "services-in-uae",
        }
        groups: dict[str, list[dict[str, str]]] = {
            k: []
            for k in [
                "start-your-business",
                "income-tax-tds",
                "gst",
                "trademark",
                "fema",
                "audit-valuations",
                "financial-services",
                "services-in-uae",
            ]
        }
        current = "start-your-business"
        for s in syb_services:
            if s["name"] in section_splits:
                current = section_splits[s["name"]]
            groups[current].append(s)

        rows2 = parse_rows(z, "xl/worksheets/sheet2.xml", shared, ns)
        fema_matrix: list[dict[str, str]] = []
        for r in rows2[2:]:
            if len(r) > 1 and r[1].strip() and r[0].strip().isdigit():
                desc_parts = [
                    p
                    for p in [
                        r[2].strip() if len(r) > 2 else "",
                        r[3].strip() if len(r) > 3 else "",
                        r[4].strip() if len(r) > 4 else "",
                    ]
                    if p
                ]
                fema_matrix.append(
                    {
                        "name": r[1].strip(),
                        "consultant": "Pawan Agarwal / CS Sandhya Gupta",
                        "description": " · ".join(desc_parts)
                        if desc_parts
                        else "FEMA compliance requirement",
                    }
                )

    categories_meta = [
        ("start-your-business", "Start Your Business", "Business registration & setup", "Building2", "CS", "#0f766e", "sneha-cs"),
        ("income-tax-tds", "Income Tax & TDS", "Direct tax, returns, assessments, and TDS compliance", "Calculator", "CA", "#0e7490", "arjun-ca"),
        ("gst", "GST", "Registration, filings, assessments, and GST advisory", "Receipt", "CA", "#0891b2", "arjun-ca"),
        ("trademark", "Trademark", "Search, registration, opposition, and renewal", "BadgeCheck", "CS", "#7c3aed", "sneha-cs"),
        ("fema", "FEMA & Cross-border", "FDI, ODI, ECB, RBI compliance, and foreign investment", "Landmark", "FEMA", "#059669", "kabir-fema"),
        ("audit-valuations", "Audit, Valuations & M&A", "Due diligence, valuations, mergers, and advisory", "LineChart", "CA", "#b45309", "arjun-ca"),
        ("financial-services", "Financial Services", "Project finance, loans, debt structuring, and capital advisory", "TrendingUp", "Lending", "#1d4ed8", "veer-lending"),
        ("services-in-uae", "Services in UAE", "UAE company setup, corporate tax, VAT, and transfer pricing", "Globe", "CA", "#6366f1", "arjun-ca"),
        ("roc-secretarial", "ROC Plus Secretarial Services", "ROC filings, board resolutions, conversions, and agreements", "Briefcase", "CS", "#db2777", "sneha-cs"),
        ("fema-compliance-matrix", "FEMA Compliance Matrix for CA/CS", "Compliance triggers, forms, and reporting timelines", "Table", "FEMA", "#047857", "kabir-fema"),
    ]

    categories = []
    for id_, title, desc, icon, typ, color, agent in categories_meta:
        if id_ == "roc-secretarial":
            services = [
                {"name": s["name"], "consultant": s["consultant"], "description": desc}
                for s in roc_services
            ]
        elif id_ == "fema-compliance-matrix":
            services = fema_matrix
        else:
            services = [
                {"name": s["name"], "consultant": s["consultant"], "description": desc}
                for s in groups[id_]
            ]
        categories.append(
            {
                "id": id_,
                "category": title,
                "summary": desc,
                "iconName": icon,
                "type": typ,
                "color": color,
                "agentSlug": agent,
                "services": services,
            }
        )

    lines = [
        'import type { AgentType } from "./agents";',
        "",
        "export type ServiceItem = {",
        "  name: string;",
        "  consultant: string;",
        "  description: string;",
        "};",
        "",
        "export type ServiceCategory = {",
        "  id: string;",
        "  iconName: string;",
        "  category: string;",
        "  summary: string;",
        "  type: AgentType | string;",
        "  color: string;",
        "  agentSlug: string;",
        "  services: ServiceItem[];",
        "};",
        "",
        "export const serviceCategories: ServiceCategory[] = [",
    ]

    for cat in categories:
        lines.extend(
            [
                "  {",
                f'    id: "{cat["id"]}",',
                f'    iconName: "{cat["iconName"]}",',
                f'    category: "{esc(cat["category"])}",',
                f'    summary: "{esc(cat["summary"])}",',
                f'    type: "{cat["type"]}",',
                f'    color: "{cat["color"]}",',
                f'    agentSlug: "{cat["agentSlug"]}",',
                "    services: [",
            ]
        )
        for s in cat["services"]:
            lines.append(
                f'      {{ name: "{esc(s["name"])}", consultant: "{esc(s["consultant"])}", description: "{esc(s["description"])}" }},'
            )
        lines.extend(["    ],", "  },"])

    lines.extend(
        [
            "];",
            "",
            "export const totalServices = serviceCategories.reduce(",
            "  (sum, cat) => sum + cat.services.length,",
            "  0",
            ");",
            "",
            "export const uniqueConsultants = Array.from(",
            "  new Set(",
            "    serviceCategories.flatMap((cat) => cat.services.map((s) => s.consultant))",
            "  )",
            ").sort();",
            "",
            "export function getCategoryById(id: string): ServiceCategory | undefined {",
            "  return serviceCategories.find((cat) => cat.id === id);",
            "}",
            "",
            "const typeToCategories: Record<string, string[]> = {",
            '  CA: ["income-tax-tds", "gst", "audit-valuations", "services-in-uae"],',
            '  CS: ["start-your-business", "roc-secretarial", "trademark"],',
            '  FEMA: ["fema", "fema-compliance-matrix"],',
            '  "Wealth Management": ["financial-services"],',
            '  Lending: ["financial-services"],',
            '  Lawyer: ["roc-secretarial"],',
            '  "Real Estate": ["audit-valuations"],',
            "};",
            "",
            "export function getCatalogServicesForAgentType(type: string, limit = 12): string[] {",
            "  const ids = typeToCategories[type] ?? [];",
            "  const names: string[] = [];",
            "  for (const id of ids) {",
            "    const cat = getCategoryById(id);",
            "    if (!cat) continue;",
            "    for (const service of cat.services) {",
            "      if (names.length >= limit) return names;",
            "      if (!names.includes(service.name)) names.push(service.name);",
            "    }",
            "  }",
            "  return names;",
            "}",
            "",
            "export function getAllServiceNames(): string[] {",
            "  return serviceCategories.flatMap((cat) => cat.services.map((s) => s.name));",
            "}",
            "",
        ]
    )

    OUT_TS.write_text("\n".join(lines))
    total = sum(len(c["services"]) for c in categories)
    print(f"Generated {OUT_TS} — {len(categories)} categories, {total} services")


if __name__ == "__main__":
    main()
