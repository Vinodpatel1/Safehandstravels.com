function VideoCard({ video }) {
  // Extract YouTube video ID from URL or use direct ID
  const getYouTubeId = (urlOrId) => {
    if (!urlOrId) return null;
    
    // If it's already just an ID, return it
    if (!urlOrId.includes('youtube.com') && !urlOrId.includes('youtu.be')) {
      return urlOrId;
    }
    
    // Extract ID from YouTube URL
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = urlOrId.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const youtubeId = getYouTubeId(video.youtubeId || video.youtubeUrl);
  const embedUrl = youtubeId ? `https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1` : null;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className="relative h-48 md:h-56 overflow-hidden rounded-t-2xl">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            className="w-full h-full object-cover"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={video.title || 'YouTube video'}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500 text-sm">No video available</p>
          </div>
        )}

        {/* Video Title Overlay */}
        {video.title && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <h3 className="text-white font-semibold text-sm md:text-base">
              {video.title}
            </h3>
          </div>
        )}
      </div>
    </div>
  )
}

export default VideoCard

