import { motion } from "framer-motion";
import { FaCheckCircle, FaPlay, FaPlus } from "react-icons/fa";
import { artists, songs } from "../data/musicData";
import SongRow from "../components/SongRow";

export default function Artist({
  currentSong,
  isPlaying,
  onPlay,
}) {
  const artist = artists[0];

  return (
    <div className="pb-36">
      <section className="relative min-h-[390px] overflow-hidden">
        <img
          src={artist.image}
          alt={artist.name}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />

        <div className="relative flex min-h-[390px] items-end px-4 pb-10 sm:px-6 lg:px-8">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <FaCheckCircle className="text-[#1ed760]" />
              Verified artist
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 text-5xl font-black sm:text-7xl"
            >
              {artist.name}
            </motion.h1>

            <p className="mt-3 text-sm text-zinc-300">
              {artist.followers} monthly listeners
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-7 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onPlay(songs[0])}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1ed760] text-black"
          >
            <FaPlay className="ml-1" />
          </button>

          <button className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-sm font-bold hover:bg-white/10">
            <FaPlus />
            Follow
          </button>
        </div>

        <h2 className="mt-10 text-2xl font-black">Popular</h2>

        <div className="mt-4">
          {songs.slice(0, 5).map((song, index) => (
            <SongRow
              key={song.id}
              song={{
                ...song,
                artist: artist.name,
              }}
              index={index}
              currentSong={currentSong}
              isPlaying={isPlaying}
              onPlay={onPlay}
            />
          ))}
        </div>

        <h2 className="mt-12 text-2xl font-black">Albums & Singles</h2>

        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {songs.slice(0, 4).map((song) => (
            <motion.button
              whileHover={{ y: -5 }}
              key={song.id}
              onClick={() => onPlay(song)}
              className="rounded-2xl bg-[#111111] p-3 text-left hover:bg-[#181818]"
            >
              <img
                src={song.image}
                alt={song.album}
                className="aspect-square w-full rounded-xl object-cover"
              />

              <p className="mt-3 truncate text-sm font-bold">{song.album}</p>

              <p className="mt-1 text-xs text-zinc-500">Album • 2026</p>
            </motion.button>
          ))}
        </div>
      </section>
    </div>
  );
}