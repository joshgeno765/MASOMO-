export default function VideoEmbed({ videoId, title }: { videoId: string; title: string }) {
  return (
    <div className="relative w-full pb-[56.25%] rounded-lg overflow-hidden bg-black">
      <iframe
        className="absolute inset-0 w-full h-full"
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}
