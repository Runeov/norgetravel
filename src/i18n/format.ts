import { Fragment, createElement, type ReactNode } from 'react';

/**
 * Template helpers for copy tables. Templates name their values in braces,
 * "{name} and {count}", so each language can put them where its grammar wants
 * them. Plain data, so copy passes from server pages to client components.
 */

/** A count phrase. Chinese and Japanese use the same text for both. */
export interface Plural {
  one: string;
  other: string;
}

type Vars = Record<string, string | number>;

/** Fills {key} placeholders. An unknown key is left in place so a missing value shows up in review. */
export const fmt = (template: string, vars: Vars = {}): string =>
  template.replace(/\{(\w+)\}/g, (match, key: string) => (key in vars ? String(vars[key]) : match));

/** "1 event" or "12 events"; {n} is the count. */
export const plural = (forms: Plural, n: number, vars: Vars = {}): string =>
  fmt(n === 1 ? forms.one : forms.other, { n, ...vars });

/** Like fmt, with elements (a link, a bold count) placed where the template names them. */
export function fmtNodes(template: string, nodes: Record<string, ReactNode>): ReactNode {
  const parts = template.split(/(\{\w+\})/);
  return createElement(
    Fragment,
    null,
    ...parts.map((part, i) => {
      const key = /^\{(\w+)\}$/.exec(part)?.[1];
      return createElement(Fragment, { key: i }, key && key in nodes ? nodes[key] : part);
    })
  );
}
