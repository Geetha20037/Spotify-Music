import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";

export default function PlaylistCard({ playlist, onPlay }) {
  return (
    <motion.div
      whileHover={{ y: -7 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group min-w-[170px] rounded-2xl bg-[#111111] p-3 transition hover:bg-[#181818] sm:min-w-0"
    >
      <div className="relative overflow-hidden rounded-xl">
        <motion.img
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4 }}
          src={playlist.image}
          alt={playlist.title}
          className="aspect-square w-full object-cover"
        />

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ scale: 1.08 }}
          className="absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#1ed760] text-black opacity-0 shadow-xl transition group-hover:opacity-100"
          onClick={() => onPlay(playlist)}
        >
          <FaPlay className="ml-0.5" />
        </motion.button>
      </div>

      <h3 className="mt-4 truncate text-sm font-bold">{playlist.title}</h3>
      <p className="mt-1 line-clamp-2 text-xs leading-5 text-zinc-500">
        {playlist.subtitle}
      </p>
    </motion.div>
  );
}