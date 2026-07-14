import { Link } from 'react-router-dom'

type Variant = 'primary' | 'outline' | 'outlineDark'

interface BaseProps {
  variant?: Variant
  fullWidth?: boolean
  loading?: boolean
  className?: string
  children: React.ReactNode
}

interface LinkButtonProps extends BaseProps {
  to: string
  onClick?: () => void
}

interface ActionButtonProps extends BaseProps {
  to?: undefined
  type?: 'button' | 'submit'
  onClick?: () => void
  disabled?: boolean
}

type ButtonProps = LinkButtonProps | ActionButtonProps

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: 'bg-brand-gold text-navy hover:bg-brand-gold-light hover:shadow-lg hover:shadow-brand-gold/30',
  outline: 'border border-white/30 text-white hover:border-white/60 hover:bg-white/5',
  outlineDark: 'border border-navy/25 text-navy hover:border-navy hover:bg-navy/5',
}

function classes(variant: Variant, fullWidth: boolean, disabled: boolean, className?: string) {
  return [
    'font-bold px-6 py-3 rounded-lg transition-all duration-150 inline-flex items-center justify-center gap-2 text-sm',
    disabled ? '' : 'hover:-translate-y-0.5 active:translate-y-0',
    VARIANT_CLASSES[variant],
    fullWidth ? 'w-full' : '',
    disabled ? 'opacity-60 cursor-not-allowed' : '',
    className || '',
  ].filter(Boolean).join(' ')
}

export default function Button(props: ButtonProps) {
  const { variant = 'primary', fullWidth = false, loading = false, className, children } = props

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} onClick={props.onClick} className={classes(variant, fullWidth, false, className)}>
        {children}
      </Link>
    )
  }

  const { type = 'button', onClick, disabled } = props as ActionButtonProps
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes(variant, fullWidth, Boolean(disabled || loading), className)}
    >
      {children}
    </button>
  )
}
