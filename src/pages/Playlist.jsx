import { motion } from "framer-motion";
import { FaPlay, FaHeart, FaArrowLeft } from "react-icons/fa";
import { songs } from "../data/musicData";
import SongRow from "../components/SongRow";

export default function Playlist({
  currentSong,
  isPlaying,
  onPlay,
  setActivePage,
}) {
  return (
    <div className="pb-36">
      <section className="relative overflow-hidden bg-gradient-to-b from-[#173b25] to-[#050505] px-4 pb-8 pt-5 sm:px-6 lg:px-8">
        <button
          onClick={() => setActivePage("home")}
          className="mb-8 flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
        >
          <FaArrowLeft />
          Back
        </button>

        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end">
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            src={songs[0].image}
            alt="Today's Top Hits"
            className="h-52 w-52 rounded-2xl object-cover shadow-2xl sm:h-60 sm:w-60"
          />

          <div>
            <p className="text-xs font-bold uppercase tracking-widest">
              Playlist
            </p>

            <h1 className="mt-3 text-4xl font-black sm:text-6xl">
              Today's Top Hits
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-400">
              The biggest songs, hottest artists and sounds everyone is
              listening to right now.
            </p>

            <p className="mt-4 text-xs text-zinc-500">
              Sonicora • 50 songs • 3 hr 12 min
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-7 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPlay(songs[0])}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1ed760] text-black shadow-xl"
          >
            <FaPlay className="ml-1" />
          </motion.button>

          <button className="text-xl text-zinc-400 hover:text-white">
            <FaHeart />
          </button>
        </div>

        <div className="hidden grid-cols-[40px_1fr_180px_70px] px-3 pb-3 text-xs uppercase tracking-widest text-zinc-600 sm:grid">
          <span>#</span>
          <span>Title</span>
          <span>Album</span>
          <span>Time</span>
        </div>

        <div>
          {songs.map((song, index) => (
            <SongRow
              key={song.id}
              song={song}
              index={index}
              currentSong={currentSong}
              isPlaying={isPlaying}
              onPlay={onPlay}
            />
          ))}
        </div>
      </section>
    </div>
  );
}