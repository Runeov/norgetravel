import { LucideIcon } from 'lucide-react';

interface IconProps {
  icon: LucideIcon;
  label?: string;
  className?: string;
  size?: number;
}

/**
 * Accessible icon wrapper for lucide-react icons.
 * - Decorative (next to visible text): omit `label` → renders aria-hidden
 * - Meaningful (standalone): provide `label` → renders role="img" + aria-label
 */
export function Icon({ icon: LucideComponent, label, className, size = 20 }: IconProps) {
  if (label) {
    return (
      <LucideComponent
        size={size}
        className={className}
        aria-label={label}
        role="img"
      />
    );
  }
  return (
    <LucideComponent
      size={size}
      className={className}
      aria-hidden="true"
      focusable="false"
    />
  );
}
