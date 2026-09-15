import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";

export default function ArtistCard({ artist, onClick }) {
  return (
    <motion.button
      whileHover={{ y: -6 }}
      onClick={() => onClick(artist)}
      className="group min-w-[145px] text-left sm:min-w-0"
    >
      <div className="relative mx-auto aspect-square overflow-hidden rounded-full">
        <motion.img
          whileHover={{ scale: 1.08 }}
          src={artist.image}
          alt={artist.name}
          className="h-full w-full object-cover"
        />

        <span className="absolute bottom-3 right-3 flex h-10 w-10 translate-y-3 items-center justify-center rounded-full bg-[#1ed760] text-black opacity-0 shadow-lg transition-all group-hover:translate-y-0 group-hover:opacity-100">
          <FaPlay className="ml-0.5" />
        </span>
      </div>

      <h3 className="mt-4 truncate text-center text-sm font-bold">
        {artist.name}
      </h3>

      <p className="mt-1 text-center text-xs text-zinc-500">Artist</p>
    </motion.button>
  );
}