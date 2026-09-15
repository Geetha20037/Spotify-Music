import { FaPlay, FaPause, FaHeart } from "react-icons/fa";

function SongRow({
  song,
  index,
  onPlay,
  isPlaying = false,
  isCurrent = false,
  liked = false,
  onLike,
}) {
  return (
    <div className="group flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-white/5">
      <div className="w-7 text-center text-sm text-gray-500">
        {index + 1}
      </div>

      <button
        onClick={onPlay}
        className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg"
      >
        <img
          src={song.image}
          alt={song.title}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition group-hover:opacity-100">
          {isCurrent && isPlaying ? (
            <FaPause className="text-white" />
          ) : (
            <FaPlay className="text-white" />
          )}
        </div>
      </button>

      <button
        onClick={onPlay}
        className="min-w-0 flex-1 text-left"
      >
        <p
          className={`truncate font-medium ${
            isCurrent
              ? "text-[#1ed760]"
              : "text-white"
          }`}
        >
          {song.title}
        </p>

        <p className="truncate text-sm text-gray-500">
          {song.artist}
        </p>
      </button>

      <p className="hidden w-36 truncate text-sm text-gray-500 md:block">
        {song.album}
      </p>

      {onLike && (
        <button
          onClick={() => onLike(song)}
          className={`p-2 ${
            liked
              ? "text-[#1ed760]"
              : "text-gray-500"
          }`}
        >
          <FaHeart />
        </button>
      )}

      <span className="w-12 text-right text-xs text-gray-500">
        {song.duration}
      </span>
    </div>
  );
}

export default SongRow;