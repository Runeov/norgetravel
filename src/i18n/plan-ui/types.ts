import type { Locale } from '@/lib/i18n-seo';
import type { PlanZoneId } from '@/lib/planner-data';
import type { LegMethod, PlanSeason } from '@/lib/plan-engine';
import type { TripBudget, TripInterest, TripItemCategory, TripMobility, TripPace } from '@/types/trip';
import type { Plural } from '../format';

/**
 * Interface text of the trip planner: the basics form, the plan panel, the
 * day-by-day and share sections, the add button and the shared plan page.
 * Also the planner's vocabulary (zones, interests, paces), which the rule
 * engine reuses for the plan it writes. Templates use ../format.ts.
 */
export interface PlanUiCopy {
  locale: Locale;
  /** Intl locale for dates. */
  dateLocale: string;
  zones: Record<PlanZoneId, string>;
  interests: Record<TripInterest, string>;
  paces: Record<TripPace, { label: string; hint: string }>;
  mobility: Record<TripMobility, string>;
  budgets: Record<TripBudget, string>;
  seasons: Record<PlanSeason, string>;
  /** Joins a list of names: "Food, Cities". */
  listJoin: string;
  basics: {
    title: string;
    intro: string;
    done: string;
    edit: string;
    add: string;
    where: string;
    arrive: string;
    leave: string;
    travellers: string;
    cameFor: string;
    pace: string;
    gettingAround: string;
    budget: string;
    /** {start}, {end} */
    range: string;
    from: string;
    travellerCount: Plural;
  };
  panel: {
    eyebrow: string;
    title: string;
    /** {season} */
    seasonTrip: string;
    nights: Plural;
    empty: string;
    error: string;
    sections: {
      light: string;
      fit: string;
      route: string;
      method: string;
      do: string;
      attend: string;
      stay: string;
      pack: string;
      sources: string;
    };
    /** {n}, {from}, {to} */
    leg: string;
    doEmpty: string;
    /** {n} and {examples}, which is `examples` filled or empty. */
    skipped: Plural;
    examples: string;
  };
  days: {
    title: string;
    introReady: string;
    introNotReady: string;
    stale: string;
    unverified: string;
    written: string;
    writing: string;
    again: string;
    write: string;
    error: string;
    day: string;
    leg: string;
  };
  share: {
    title: string;
    body: string;
    stale: string;
    linkLabel: string;
    copy: string;
    copied: string;
    open: string;
    making: string;
    again: string;
    make: string;
    error: string;
  };
  add: { add: string; added: string; addLabel: string; removeLabel: string };
  shared: {
    eyebrow: string;
    title: string;
    description: string;
    made: string;
    savedTitle: string;
    categories: Record<TripItemCategory, string>;
    ownPlan: string;
    use: string;
    opening: string;
    calendar: string;
    print: string;
    copyLink: string;
    linkCopied: string;
    send: string;
    /** Calendar event title: {n}, {title} */
    icsDay: string;
    icsPlan: string;
    /** Leg names in the calendar file: {from}, {to}, {method} */
    icsLeg: string;
    methods: Record<LegMethod, string>;
  };
}
