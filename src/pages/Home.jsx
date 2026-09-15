
import {
  FiArrowRight,
  FiHeadphones,
  FiHeart,
  FiPlay,
  FiPlus,
  FiRadio,
} from "react-icons/fi";
import { motion } from "framer-motion";

import SongRow from "../components/SongRow";
import PlaylistCard from "../components/PlaylistCard";
import ArtistCard from "../components/ArtistCard";

import {
  songs,
  playlists,
  artists,
  podcasts,
} from "../data/musicData";

const Home = ({
  onPlaySong,
  onStartListening,
  onExploreMusic,
  onOpenPlaylist,
  onOpenArtist,
  likedSongs = [],
  onLike,
}) => {
  const recentlyPlayed = songs.slice(0, 4);
  const featuredSongs = songs.slice(0, 6);
  const trendingPlaylists = playlists.slice(0, 5);
  const popularArtists = artists.slice(0, 5);
  const featuredPodcasts = podcasts?.slice(0, 4) || [];

  const isLiked = (song) =>
    likedSongs.some((item) => item.id === song.id);

  return (
    <div className="w-full overflow-hidden">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden px-4 pb-10 pt-8 sm:px-6 lg:px-10">
        <div className="absolute left-[-120px] top-[-100px] h-[350px] w-[350px] rounded-full bg-green-500/10 blur-[100px]" />

        <div className="absolute right-[-100px] top-[50px] h-[300px] w-[300px] rounded-full bg-emerald-500/10 blur-[100px]" />

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[#17251d] via-[#101713] to-[#090909] p-6 sm:p-10 lg:p-14"
        >
          <div className="relative z-10 max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1.5 text-xs font-semibold text-green-400">
              <FiRadio size={13} />
              Your music. Your mood.
            </div>

            <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-7xl">
              Feel the
              <span className="block bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                Music.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
              Discover new artists, trending playlists and
              songs made for every moment of your day.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onStartListening}
                className="flex items-center gap-2 rounded-full bg-green-500 px-6 py-3.5 text-sm font-bold text-black transition hover:scale-105 hover:bg-green-400"
              >
                <FiPlay
                  size={17}
                  fill="currentColor"
                />
                Start Listening
              </button>

              <button
                type="button"
                onClick={onExploreMusic}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Explore Music
                <FiArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Hero visual */}

          <div className="absolute bottom-[-90px] right-[-40px] hidden h-[330px] w-[330px] rounded-full border border-green-400/10 bg-gradient-to-br from-green-400/20 to-transparent lg:block">
            <div className="absolute inset-8 rounded-full border border-green-400/10">
              <div className="absolute inset-8 rounded-full border border-green-400/10">
                <div className="absolute inset-8 rounded-full bg-green-400/5" />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* =====================================================
          RECENTLY PLAYED
      ===================================================== */}

      <section className="px-4 py-8 sm:px-6 lg:px-10">
        <SectionHeader
          title="Recently Played"
          subtitle="Jump back into your favorite music"
          actionText="See all"
          onAction={onExploreMusic}
        />

        <div className="mt-5 overflow-hidden rounded-2xl border border-white/5 bg-[#0d0d0d]">
          {recentlyPlayed.map((song, index) => (
            <SongRow
              key={song.id}
              song={song}
              index={index}
              onPlay={() => onPlaySong(song)}
              isLiked={isLiked(song)}
              onLike={() => onLike?.(song)}
            />
          ))}
        </div>
      </section>

      {/* =====================================================
          TRENDING PLAYLISTS
      ===================================================== */}

      <section className="px-4 py-8 sm:px-6 lg:px-10">
        <SectionHeader
          title="Trending Playlists"
          subtitle="What's hot right now"
          actionText="Show all"
          onAction={onExploreMusic}
        />

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {trendingPlaylists.map((playlist, index) => (
            <InteractivePlaylistCard
              key={playlist.id || index}
              playlist={playlist}
              onOpen={() => onOpenPlaylist?.(playlist)}
            />
          ))}
        </div>
      </section>

      {/* =====================================================
          POPULAR ARTISTS
      ===================================================== */}

      <section className="px-4 py-8 sm:px-6 lg:px-10">
        <SectionHeader
          title="Popular Artists"
          subtitle="Artists you might love"
          actionText="Explore artists"
          onAction={onExploreMusic}
        />

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {popularArtists.map((artist, index) => (
            <InteractiveArtistCard
              key={artist.id || index}
              artist={artist}
              onOpen={() => onOpenArtist?.(artist)}
            />
          ))}
        </div>
      </section>

      {/* =====================================================
          FEATURED MUSIC
      ===================================================== */}

      <section className="px-4 py-8 sm:px-6 lg:px-10">
        <SectionHeader
          title="Featured Music"
          subtitle="Fresh sounds picked for you"
          actionText="Browse music"
          onAction={onExploreMusic}
        />

        <div className="mt-5 overflow-hidden rounded-2xl border border-white/5 bg-[#0d0d0d]">
          {featuredSongs.map((song, index) => (
            <SongRow
              key={song.id}
              song={song}
              index={index}
              onPlay={() => onPlaySong(song)}
              isLiked={isLiked(song)}
              onLike={() => onLike?.(song)}
            />
          ))}
        </div>
      </section>

      {/* =====================================================
          FEATURED PODCASTS
      ===================================================== */}

      <section className="px-4 py-8 sm:px-6 lg:px-10">
        <SectionHeader
          title="Featured Podcasts"
          subtitle="Listen, learn and discover something new"
          actionText="Explore podcasts"
          onAction={onExploreMusic}
        />

        {featuredPodcasts.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredPodcasts.map((podcast, index) => (
              <InteractivePodcastCard
                key={podcast.id || index}
                podcast={podcast}
                onPlay={() => {
                  if (podcast.audio) {
                    onPlaySong?.(podcast);
                  } else if (songs[index]) {
                    onPlaySong?.(songs[index]);
                  }
                }}
              />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-white/5 bg-[#101010] p-8 text-center">
            <FiHeadphones
              size={30}
              className="mx-auto text-green-400"
            />

            <p className="mt-3 font-semibold text-white">
              Podcasts coming soon
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Discover podcasts and audio shows here.
            </p>
          </div>
        )}
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="px-4 pb-12 pt-8 sm:px-6 lg:px-10">
        <div className="rounded-3xl border border-white/5 bg-gradient-to-r from-green-500/10 to-transparent p-7 sm:p-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-medium text-green-400">
                KEEP EXPLORING
              </p>

              <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                Find your next favorite song.
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Search thousands of songs, artists and playlists.
              </p>
            </div>

            <button
              type="button"
              onClick={onExploreMusic}
              className="flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-black transition hover:scale-105"
            >
              Search Music
              <FiArrowRight size={17} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

/* =====================================================
   SECTION HEADER
===================================================== */

const SectionHeader = ({
  title,
  subtitle,
  actionText,
  onAction,
}) => {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-black text-white sm:text-3xl">
          {title}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {subtitle}
        </p>
      </div>

      {actionText && (
        <button
          type="button"
          onClick={onAction}
          className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-gray-400 transition hover:text-white sm:flex"
        >
          {actionText}
          <FiArrowRight size={15} />
        </button>
      )}
    </div>
  );
};

/* =====================================================
   PLAYLIST CARD
===================================================== */

const InteractivePlaylistCard = ({
  playlist,
  onOpen,
}) => {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="group min-w-0 rounded-2xl bg-[#101010] p-3 text-left transition hover:bg-[#181818]"
    >
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={playlist.image}
          alt={playlist.name}
          className="aspect-square w-full object-cover transition duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />

        <div className="absolute bottom-3 right-3 flex h-11 w-11 translate-y-3 items-center justify-center rounded-full bg-green-500 text-black opacity-0 shadow-xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <FiPlay
            size={18}
            fill="currentColor"
          />
        </div>
      </div>

      <h3 className="mt-3 truncate text-sm font-bold text-white">
        {playlist.name}
      </h3>

      <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-500">
        {playlist.description ||
          "Discover a collection of great music."}
      </p>
    </motion.button>
  );
};

/* =====================================================
   ARTIST CARD
===================================================== */

const InteractiveArtistCard = ({
  artist,
  onOpen,
}) => {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="group rounded-2xl bg-[#101010] p-4 text-center transition hover:bg-[#181818]"
    >
      <div className="relative mx-auto aspect-square max-w-[190px] overflow-hidden rounded-full">
        <img
          src={artist.image}
          alt={artist.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/30">
          <div className="flex h-11 w-11 translate-y-3 items-center justify-center rounded-full bg-green-500 text-black opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <FiPlay
              size={17}
              fill="currentColor"
            />
          </div>
        </div>
      </div>

      <h3 className="mt-4 truncate font-bold text-white">
        {artist.name}
      </h3>

      <p className="mt-1 text-xs text-gray-500">
        Artist
      </p>
    </motion.button>
  );
};

/* =====================================================
   PODCAST CARD
===================================================== */

const InteractivePodcastCard = ({
  podcast,
  onPlay,
}) => {
  return (
    <motion.button
      type="button"
      onClick={onPlay}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="group overflow-hidden rounded-2xl border border-white/5 bg-[#101010] text-left transition hover:bg-[#181818]"
    >
      <div className="relative overflow-hidden">
        <img
          src={podcast.image}
          alt={podcast.title || podcast.name}
          className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <div className="absolute bottom-3 right-3 flex h-10 w-10 translate-y-3 items-center justify-center rounded-full bg-green-500 text-black opacity-0 shadow-xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <FiPlay
            size={17}
            fill="currentColor"
          />
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-green-400">
          <FiHeadphones size={12} />
          Podcast
        </div>

        <h3 className="mt-2 line-clamp-1 font-bold text-white">
          {podcast.title || podcast.name}
        </h3>

        <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-500">
          {podcast.description ||
            podcast.host ||
            "Listen to this featured podcast."}
        </p>
      </div>
    </motion.button>
  );
};

export default Home;