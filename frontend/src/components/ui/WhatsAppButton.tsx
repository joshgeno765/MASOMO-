import { useTranslation } from 'react-i18next'
import { PRIMARY_WHATSAPP } from '../../lib/contact'

export default function WhatsAppButton() {
  const { t } = useTranslation()

  return (
    <a
      href={PRIMARY_WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('whatsapp.ariaLabel')}
      className="fixed bottom-24 right-5 z-40 w-14 h-14 rounded-full bg-[#25D366] shadow-xl flex items-center justify-center hover:brightness-105 transition-all"
    >
      <svg viewBox="0 0 32 32" className="w-8 h-8 fill-white" aria-hidden="true">
        <path d="M16.004 3C9.376 3 4 8.373 4 14.997c0 2.31.646 4.53 1.87 6.462L4 29l7.73-1.837a13.02 13.02 0 0 0 4.274.72h.004c6.627 0 12.003-5.373 12.003-11.997C28 8.373 22.627 3 16.004 3zm7.03 17.02c-.298.836-1.478 1.61-2.048 1.7-.554.087-1.174.29-3.944-.822-3.316-1.33-5.444-4.694-5.61-4.913-.166-.22-1.34-1.78-1.34-3.396 0-1.616.85-2.41 1.148-2.735.298-.324.65-.406.868-.406.217 0 .434.002.624.012.2.01.468-.076.732.558.298.72.998 2.484 1.084 2.663.087.18.145.39.03.61-.116.22-.174.36-.34.556-.174.196-.362.437-.518.588-.174.166-.354.346-.152.68.202.336.9 1.487 1.933 2.407 1.328 1.184 2.447 1.55 2.782 1.726.336.174.53.146.726-.088.196-.234.837-.976 1.06-1.31.224-.336.446-.28.75-.168.304.11 1.94.916 2.273 1.084.334.166.556.25.638.39.086.14.086.79-.212 1.628z" />
      </svg>
    </a>
  )
}
