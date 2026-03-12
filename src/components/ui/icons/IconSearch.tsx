import { clsx } from 'clsx'
import type { IconProps } from './types'

export function IconSearch({ className }: IconProps) {
  return (
    <svg className={clsx(className)} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  )
}
