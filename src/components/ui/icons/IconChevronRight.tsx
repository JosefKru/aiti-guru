import { clsx } from 'clsx'
import type { IconProps } from './types'

export function IconChevronRight({ className }: IconProps) {
  return (
    <svg className={clsx(className)} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}
