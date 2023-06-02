import clsx from 'clsx'
import { HTMLProps } from 'react'

export function Container({ className, ...props }: HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={clsx('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)}
      {...props}
    />
  )
}
