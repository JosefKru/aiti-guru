import { clsx } from 'clsx'
import type { IconProps } from './types'

export function IconPlusCircle({ className }: IconProps) {
  return (
    <svg className={clsx(className)} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  )
}
