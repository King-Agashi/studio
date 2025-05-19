// src/components/layout/NavLink.tsx
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  Icon?: LucideIcon;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
}

export function NavLink({ 
  href, 
  children, 
  Icon, 
  className,
  activeClassName = "text-primary font-semibold border-b-2 border-primary",
  inactiveClassName = "text-foreground/70 hover:text-foreground"
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
        isActive ? activeClassName : inactiveClassName,
        className
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {Icon && <Icon className="h-5 w-5" />}
      <span>{children}</span>
    </Link>
  );
}
