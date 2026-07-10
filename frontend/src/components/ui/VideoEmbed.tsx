import { useRef, useState } from 'react'

interface VideoEmbedProps {
  videoId: string
  title: string
  autoplay?: boolean
}

export default function VideoEmbed({ videoId, title, autoplay = false }: VideoEmbedProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [muted, setMuted] = useState(autoplay)

  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    iv_load_policy: '3',
  })
  if (autoplay) {
    params.set('autoplay', '1')
    params.set('mute', '1')
    params.set('loop', '1')
    params.set('playlist', videoId)
    params.set('controls', '0')
    params.set('enablejsapi', '1')
  }

  const toggleMute = () => {
    const win = iframeRef.current?.contentWindow
    if (!win) return
    win.postMessage(JSON.stringify({ event: 'command', func: muted ? 'unMute' : 'mute', args: [] }), '*')
    setMuted(!muted)
  }

  return (
    <div className="relative w-full pb-[56.25%] rounded-lg overflow-hidden bg-black">
      <iframe
        ref={iframeRef}
        className="absolute inset-0 w-full h-full"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      {autoplay && (
        <button
          onClick={toggleMute}
          className="absolute bottom-3 right-3 bg-black/60 hover:bg-black/80 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm transition-colors"
        >
          {muted ? '🔊 Unmute' : '🔇 Mute'}
        </button>
      )}
    </div>
  )
}
