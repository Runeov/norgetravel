'use client';

import Image from 'next/image';
import { useRef } from 'react';
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  Clock3,
  ExternalLink,
  Leaf,
  MapPin,
  Repeat2,
} from 'lucide-react';
import { AddToTripButton } from '@/components/ui/AddToTripButton';
import { ShareButtons } from '@/components/ui/ShareButtons';
import { getPartnerName, trackEvent } from '@/lib/analytics';
import {
  DESTINATION_LABELS,
  PRICE_RANGE_LABELS,
} from '@/lib/schemas/travel.shared';
import type { Transport } from '@/lib/schemas/travel.transport.schema';
import {
  getOperatorInitials,
  getTransportOperatorLogo,
} from '@/data/transport-operator-logos';

interface TransportCardProps {
  item: Transport;
}

function OperatorLogo({ operator }: { operator: string }) {
  const logo = getTransportOperatorLogo(operator);

  return (
    <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white p-2 shadow-sm sm:h-14 sm:w-14">
      {logo ? (
        <Image
          src={logo}
          alt={`${operator} logo`}
          fill
          sizes="56px"
          className="object-contain p-2"
        />
      ) : (
        <span className="text-sm font-bold tracking-tight text-[#1B3A5C]" aria-hidden="true">
          {getOperatorInitials(operator)}
        </span>
      )}
    </span>
  );
}

function Detail({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Clock3;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#39708e]" aria-hidden="true" />
      <div>
        <dt className="text-xs font-medium text-slate-400">{label}</dt>
        <dd className="mt-0.5 text-sm leading-snug text-slate-700">{children}</dd>
      </div>
    </div>
  );
}

export function TransportCard({ item }: TransportCardProps) {
  const operatorUrl = item.bookingUrl || item.website;
  const expandedOnce = useRef(false);

  function handleToggle(event: React.SyntheticEvent<HTMLDetailsElement>) {
    if (!event.currentTarget.open || expandedOnce.current) return;

    expandedOnce.current = true;
    trackEvent('transport_item_expanded', {
      item_id: item.id,
      item_name: item.name,
      operator: item.operator,
      transport_type: item.transportType,
      destination: item.destination,
    });
  }

  return (
    <details
      id={item.id}
      onToggle={handleToggle}
      className="group scroll-mt-28 bg-white open:bg-slate-50/40"
    >
      <summary className="grid cursor-pointer list-none grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-4 py-5 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1B3A5C] sm:gap-5 sm:px-6 [&::-webkit-details-marker]:hidden">
        <OperatorLogo operator={item.operator} />

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <p className="text-xs font-semibold text-[#39708e]">{item.operator}</p>
            {item.isEcoFriendly && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#11643f]">
                <Leaf className="h-3.5 w-3.5" aria-hidden="true" />
                Lower impact
              </span>
            )}
          </div>
          <h3 className="mt-1 text-base font-semibold leading-snug tracking-[-0.015em] text-slate-900 sm:text-lg">
            {item.name}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
            <span className="inline-flex min-w-0 items-center gap-1.5">
              <span className="max-w-[12rem] truncate sm:max-w-[18rem]">{item.routeFrom}</span>
              <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="max-w-[12rem] truncate sm:max-w-[18rem]">{item.routeTo}</span>
            </span>
            {item.duration && <span className="hidden tabular-nums md:inline">{item.duration}</span>}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden text-sm font-medium text-slate-500 lg:inline">
            {PRICE_RANGE_LABELS[item.priceRange]}
          </span>
          <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#1B3A5C] transition-transform duration-200 group-open:rotate-180">
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </summary>

      <div className="border-t border-slate-100 px-4 pb-6 pt-5 sm:px-6 sm:pb-7">
        <div className="grid gap-7 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)]">
          <div>
            <p className="max-w-[70ch] text-sm leading-relaxed text-slate-600">
              {item.description}
            </p>

            <dl className="mt-6 grid gap-x-6 gap-y-5 sm:grid-cols-2">
              {item.duration && (
                <Detail icon={Clock3} label="Journey time">{item.duration}</Detail>
              )}
              {item.frequency && (
                <Detail icon={Repeat2} label="Frequency">{item.frequency}</Detail>
              )}
              {item.seasonalAvailability && (
                <Detail icon={CalendarDays} label="Season">{item.seasonalAvailability}</Detail>
              )}
              <Detail icon={MapPin} label="Coverage">
                {item.destination === 'all' ? 'Nationwide' : DESTINATION_LABELS[item.destination]}
              </Detail>
            </dl>
          </div>

          <div className="flex flex-col justify-between gap-6 border-t border-slate-200 pt-5 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
            <div>
              <p className="text-xs font-medium text-slate-400">Price level</p>
              <p className="mt-1 text-base font-semibold text-slate-900">
                {PRICE_RANGE_LABELS[item.priceRange]}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <AddToTripButton
                item={{
                  id: item.id,
                  name: item.name,
                  category: 'transport',
                  imageUrl: item.imageUrl,
                  location: item.location,
                  priceRange: item.priceRange,
                  destination: item.destination,
                  addedAt: '',
                }}
                className="border-slate-300 bg-white hover:border-[#1B3A5C] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3A5C] focus-visible:ring-offset-2 active:translate-y-px"
              />
              {operatorUrl && (
                <a
                  href={operatorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent('transport_operator_click', {
                      item_id: item.id,
                      item_name: item.name,
                      category: 'transport',
                      destination: item.destination,
                      partner: getPartnerName(operatorUrl),
                    })
                  }
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#1B3A5C] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#112a45] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3A5C] focus-visible:ring-offset-2 active:translate-y-px"
                >
                  Check route
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              )}
            </div>

            <ShareButtons
              url={`/travel/transport/#${item.id}`}
              title={item.name}
              label="Share"
              className="justify-between border-t border-slate-200 pt-4"
            />
          </div>
        </div>
      </div>
    </details>
  );
}
