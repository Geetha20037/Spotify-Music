import { useEffect, useRef, useState } from "react";
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaVolumeUp,
  FaVolumeMute,
  FaRandom,
  FaRedo,
  FaHeart,
} from "react-icons/fa";

function MusicPlayer({
  currentSong,
  isPlaying,
  setIsPlaying,
  onNext,
  onPrevious,
  likedSongs = [],
  onLike,
}) {
  const audioRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const liked =
    currentSong &&
    likedSongs.some((song) => song.id === currentSong.id);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !currentSong) return;

    audio.src = currentSong.audio;
    audio.load();

    setProgress(0);
    setDuration(0);
  }, [currentSong]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !currentSong) return;

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("Audio error:", error);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, currentSong, setIsPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const loaded = () => {
      setDuration(audio.duration || 0);
    };

    const update = () => {
      setProgress(audio.currentTime || 0);
    };

    const ended = () => {
      if (repeat) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } else {
        onNext();
      }
    };

    audio.addEventListener("loadedmetadata", loaded);
    audio.addEventListener("timeupdate", update);
    audio.addEventListener("ended", ended);

    return () => {
      audio.removeEventListener(
        "loadedmetadata",
        loaded,
      );
      audio.removeEventListener(
        "timeupdate",
        update,
      );
      audio.removeEventListener("ended", ended);
    };
  }, [onNext, repeat]);

  if (!currentSong) {
    return null;
  }

  const togglePlay = () => {
    setIsPlaying((value) => !value);
  };

  const seek = (event) => {
    const value = Number(event.target.value);

    setProgress(value);

    if (audioRef.current) {
      audioRef.current.currentTime = value;
    }
  };

  const formatTime = (value) => {
    if (!value || Number.isNaN(value)) {
      return "0:00";
    }

    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60);

    return `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <>
      <audio
        ref={audioRef}
        preload="metadata"
      />

      <div className="fixed bottom-0 left-0 right-0 z-[70] border-t border-white/10 bg-[#111]/95 px-3 py-2 backdrop-blur-xl lg:pl-[250px]">
        <div className="mx-auto max-w-[1800px]">
          <div className="flex items-center gap-3">
            <img
              src={currentSong.image}
              alt={currentSong.title}
              className="h-12 w-12 rounded-lg object-cover"
            />

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">
                {currentSong.title}
              </p>

              <p className="truncate text-xs text-gray-500">
                {currentSong.artist}
              </p>
            </div>

            <button
              onClick={() =>
                onLike?.(currentSong)
              }
              className={`hidden sm:block ${
                liked
                  ? "text-[#1ed760]"
                  : "text-gray-500"
              }`}
            >
              <FaHeart />
            </button>

            <button
              onClick={() => setShuffle(!shuffle)}
              className={`hidden md:block ${
                shuffle
                  ? "text-[#1ed760]"
                  : "text-gray-500"
              }`}
            >
              <FaRandom />
            </button>

            <button
              onClick={onPrevious}
              className="hidden text-gray-300 hover:text-white sm:block"
            >
              <FaStepBackward />
            </button>

            <button
              onClick={togglePlay}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-black hover:scale-105"
            >
              {isPlaying ? (
                <FaPause />
              ) : (
                <FaPlay className="ml-0.5" />
              )}
            </button>

            <button
              onClick={onNext}
              className="hidden text-gray-300 hover:text-white sm:block"
            >
              <FaStepForward />
            </button>

            <button
              onClick={() => setRepeat(!repeat)}
              className={`hidden md:block ${
                repeat
                  ? "text-[#1ed760]"
                  : "text-gray-500"
              }`}
            >
              <FaRedo />
            </button>

            <div className="hidden items-center gap-2 lg:flex">
              {volume === 0 ? (
                <FaVolumeMute />
              ) : (
                <FaVolumeUp />
              )}

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(event) =>
                  setVolume(
                    Number(event.target.value),
                  )
                }
                className="w-20 accent-[#1ed760]"
              />
            </div>
          </div>

          <div className="mt-1 flex items-center gap-2">
            <span className="w-8 text-[10px] text-gray-500">
              {formatTime(progress)}
            </span>

            <input
              type="range"
              min="0"
              max={duration || 0}
              step="0.1"
              value={progress}
              onChange={seek}
              className="h-1 flex-1 accent-[#1ed760]"
            />

            <span className="w-8 text-right text-[10px] text-gray-500">
              {formatTime(duration)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default MusicPlayer;