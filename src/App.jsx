import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiBookOpen,
  FiCheck,
  FiHeart,
  FiHome,
  FiMusic,
  FiPlay,
  FiSearch,
  FiSettings,
  FiUser,
  FiZap,
} from "react-icons/fi";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import MusicPlayer from "./components/MusicPlayer";
import LoadingScreen from "./components/LoadingScreen";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Playlist from "./pages/Playlist";
import Artist from "./pages/Artist";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";

import { songs, playlists } from "./data/musicData";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const [activePage, setActivePage] = useState("home");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [likedSongs, setLikedSongs] = useState([]);

  const [userPlaylists, setUserPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState(null);

  const [profileSection, setProfileSection] = useState("account");

  // Authentication
  const [authPage, setAuthPage] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  const navigate = (page) => {
    setActivePage(page);
  };

  const playSong = (song) => {
    if (!song) return;

    if (currentSong?.id === song.id) {
      setIsPlaying((prev) => !prev);
      return;
    }

    setCurrentSong(song);
    setIsPlaying(true);
  };

  const handleNext = () => {
    if (!currentSong || songs.length === 0) return;

    const currentIndex = songs.findIndex(
      (song) => song.id === currentSong.id
    );

    const nextIndex =
      currentIndex === -1 ? 0 : (currentIndex + 1) % songs.length;

    setCurrentSong(songs[nextIndex]);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    if (!currentSong || songs.length === 0) return;

    const currentIndex = songs.findIndex(
      (song) => song.id === currentSong.id
    );

    const previousIndex =
      currentIndex <= 0 ? songs.length - 1 : currentIndex - 1;

    setCurrentSong(songs[previousIndex]);
    setIsPlaying(true);
  };

  const handleSearch = (value) => {
    setSearchValue(value);
    setActivePage("search");
  };

  const startListening = () => {
    if (songs.length > 0) {
      setCurrentSong(songs[0]);
      setIsPlaying(true);
    }
  };

  const exploreMusic = () => {
    setActivePage("search");
  };

  const toggleLike = (song) => {
    if (!song) return;

    setLikedSongs((prev) => {
      const alreadyLiked = prev.some((item) => item.id === song.id);

      if (alreadyLiked) {
        return prev.filter((item) => item.id !== song.id);
      }

      return [...prev, song];
    });
  };

  const createPlaylist = () => {
    const name = window.prompt("Enter playlist name:");

    if (!name?.trim()) return;

    const newPlaylist = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      description: "Your new playlist",
      image:
        songs[0]?.image ||
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80",
      songs: [],
    };

    setUserPlaylists((prev) => [...prev, newPlaylist]);
    setSelectedPlaylist(newPlaylist);
    setActivePage("playlist");
  };

  const openProfile = (section) => {
    if (section === "signin") {
      setAuthPage("signin");
      return;
    }

    if (section === "signup") {
      setAuthPage("signup");
      return;
    }

    setProfileSection(section);
    setActivePage("profile");
  };

  const openUpgradePlans = () => {
    setProfileSection("premium");
    setActivePage("profile");
  };

  const openPlaylist = (playlist) => {
    if (!playlist) return;

    setSelectedPlaylist(playlist);
    setActivePage("playlist");
  };

  const openArtist = (artist) => {
    if (!artist) return;

    setSelectedArtist(artist);
    setActivePage("artist");
  };

  // Sign In
  const handleLogin = (userData) => {
    setUser(userData);
    setAuthPage(null);
    setProfileSection("account");
    setActivePage("profile");
  };

  // Sign Up
  const handleCreateAccount = (userData) => {
    setUser(userData);
    setAuthPage(null);
    setProfileSection("account");
    setActivePage("profile");
  };

  // Logout
  const handleLogout = () => {
    setUser(null);
    setAuthPage("signin");
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  // Sign In screen
  if (authPage === "signin") {
    return (
      <SignIn
        onBack={() => setAuthPage(null)}
        onSignUp={() => setAuthPage("signup")}
        onLogin={handleLogin}
      />
    );
  }

  // Sign Up screen
  if (authPage === "signup") {
    return (
      <SignUp
        onBack={() => setAuthPage(null)}
        onSignIn={() => setAuthPage("signin")}
        onCreateAccount={handleCreateAccount}
      />
    );
  }

  const allPlaylists = [...playlists, ...userPlaylists];

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Sidebar
        activePage={activePage}
        onNavigate={navigate}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        onCreatePlaylist={createPlaylist}
        onUpgradePlan={openUpgradePlans}
      />

      <div
        className={`min-h-screen transition-all duration-300 ${
          sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
        }`}
      >
        <Navbar
          searchValue={searchValue}
          onSearch={handleSearch}
          onProfile={openProfile}
        />

        <main className="pb-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              {activePage === "home" && (
                <Home
                  onPlaySong={playSong}
                  onStartListening={startListening}
                  onExploreMusic={exploreMusic}
                  onOpenPlaylist={openPlaylist}
                  onOpenArtist={openArtist}
                  likedSongs={likedSongs}
                  onLike={toggleLike}
                />
              )}

              {activePage === "search" && (
                <Search
                  searchValue={searchValue}
                  onSearch={handleSearch}
                  onPlaySong={playSong}
                  onOpenPlaylist={openPlaylist}
                  onOpenArtist={openArtist}
                  likedSongs={likedSongs}
                  onLike={toggleLike}
                />
              )}

              {activePage === "playlist" && (
                <Playlist
                  playlist={selectedPlaylist}
                  onPlaySong={playSong}
                  onOpenArtist={openArtist}
                  likedSongs={likedSongs}
                  onLike={toggleLike}
                />
              )}

              {activePage === "artist" && (
                <Artist
                  artist={selectedArtist}
                  onPlaySong={playSong}
                  likedSongs={likedSongs}
                  onLike={toggleLike}
                />
              )}

              {activePage === "library" && (
                <LibraryPage
                  playlists={allPlaylists}
                  likedSongs={likedSongs}
                  onPlaySong={playSong}
                  onOpenPlaylist={openPlaylist}
                  onCreatePlaylist={createPlaylist}
                />
              )}

              {activePage === "liked" && (
                <LikedSongsPage
                  likedSongs={likedSongs}
                  onPlaySong={playSong}
                  onLike={toggleLike}
                />
              )}

              {activePage === "profile" && (
                <Profile
                  user={user}
                  onBack={() => setActivePage("home")}
                  onSettings={() => setProfileSection("settings")}
                  onLogout={handleLogout}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        <MusicPlayer
          currentSong={currentSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          onNext={handleNext}
          onPrevious={handlePrevious}
          likedSongs={likedSongs}
          onLike={toggleLike}
        />
      </div>

      <MobileBottomNav
        activePage={activePage}
        onNavigate={navigate}
        onSearch={() => setActivePage("search")}
      />
    </div>
  );
}

/* =========================
   LIBRARY PAGE
========================= */

function LibraryPage({
  playlists,
  likedSongs,
  onPlaySong,
  onOpenPlaylist,
  onCreatePlaylist,
}) {
  return (
    <section className="px-4 sm:px-6 lg:px-10 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-[#1db954] text-sm font-semibold uppercase tracking-wider">
              Your Music
            </p>

            <h1 className="text-3xl sm:text-4xl font-bold mt-1">
              Your Library
            </h1>

            <p className="text-gray-400 mt-2">
              Your playlists and saved music
            </p>
          </div>

          <button
            onClick={onCreatePlaylist}
            className="flex items-center justify-center gap-2 bg-[#1db954] text-black font-bold rounded-full px-5 py-3 hover:bg-[#1ed760] transition"
          >
            <FiMusic />
            New Playlist
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {playlists.map((playlist) => (
            <motion.button
              key={playlist.id}
              whileHover={{ y: -5 }}
              onClick={() => onOpenPlaylist(playlist)}
              className="text-left rounded-2xl bg-[#111] p-4 border border-white/5 hover:bg-[#181818] transition"
            >
              <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
                <img
                  src={playlist.image}
                  alt={playlist.name}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition flex items-end justify-end p-3">
                  <span className="w-11 h-11 rounded-full bg-[#1db954] text-black flex items-center justify-center shadow-lg">
                    <FiPlay fill="currentColor" />
                  </span>
                </div>
              </div>

              <h3 className="font-semibold truncate">
                {playlist.name}
              </h3>

              <p className="text-gray-500 text-sm mt-1 truncate">
                {playlist.description || "Your playlist"}
              </p>
            </motion.button>
          ))}

          {likedSongs.length > 0 && (
            <motion.button
              whileHover={{ y: -5 }}
              onClick={() => {}}
              className="text-left rounded-2xl bg-gradient-to-br from-[#1db954]/30 to-[#121212] p-4 border border-white/5 hover:bg-[#181818] transition"
            >
              <div className="aspect-square rounded-xl mb-4 flex items-center justify-center bg-gradient-to-br from-[#1db954] to-[#14532d]">
                <FiHeart className="text-black text-5xl" fill="currentColor" />
              </div>

              <h3 className="font-semibold">Liked Songs</h3>

              <p className="text-gray-500 text-sm mt-1">
                {likedSongs.length} saved songs
              </p>
            </motion.button>
          )}
        </div>

        {playlists.length === 0 && likedSongs.length === 0 && (
          <div className="py-20 text-center">
            <FiBookOpen className="mx-auto text-5xl text-gray-600 mb-4" />

            <h2 className="text-xl font-semibold">
              Your library is empty
            </h2>

            <p className="text-gray-500 mt-2">
              Create a playlist or start listening to music.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

/* =========================
   LIKED SONGS PAGE
========================= */

function LikedSongsPage({
  likedSongs,
  onPlaySong,
  onLike,
}) {
  return (
    <section className="px-4 sm:px-6 lg:px-10 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-br from-[#1db954] via-[#147a3a] to-[#071b0e] p-6 sm:p-10 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end gap-6">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-white/20 flex items-center justify-center">
              <FiHeart
                className="text-white text-6xl sm:text-7xl"
                fill="currentColor"
              />
            </div>

            <div>
              <p className="uppercase text-sm font-semibold tracking-wider">
                Playlist
              </p>

              <h1 className="text-4xl sm:text-6xl font-black mt-2">
                Liked Songs
              </h1>

              <p className="mt-3 text-white/80">
                {likedSongs.length} saved songs
              </p>
            </div>
          </div>
        </div>

        {likedSongs.length > 0 ? (
          <div className="space-y-1">
            {likedSongs.map((song, index) => (
              <LikedSongRow
                key={song.id}
                song={song}
                index={index}
                onPlay={() => onPlaySong(song)}
                onLike={() => onLike(song)}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <FiHeart className="mx-auto text-5xl text-gray-600 mb-4" />

            <h2 className="text-xl font-semibold">
              No liked songs yet
            </h2>

            <p className="text-gray-500 mt-2">
              Tap the heart icon on any song to save it here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function LikedSongRow({
  song,
  index,
  onPlay,
  onLike,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="group grid grid-cols-[32px_1fr_auto] sm:grid-cols-[40px_1fr_120px_70px_50px] items-center gap-3 sm:gap-4 rounded-xl px-3 py-2 hover:bg-white/10 transition"
    >
      <button
        onClick={onPlay}
        className="text-gray-500 group-hover:text-white transition"
      >
        <span className="group-hover:hidden">
          {index + 1}
        </span>

        <FiPlay className="hidden group-hover:block" fill="currentColor" />
      </button>

      <button
        onClick={onPlay}
        className="flex items-center gap-3 min-w-0 text-left"
      >
        <img
          src={song.image}
          alt={song.title}
          className="w-11 h-11 rounded-lg object-cover shrink-0"
        />

        <div className="min-w-0">
          <p className="font-medium truncate">
            {song.title}
          </p>

          <p className="text-sm text-gray-500 truncate">
            {song.artist}
          </p>
        </div>
      </button>

      <p className="hidden sm:block text-gray-500 text-sm truncate">
        {song.album}
      </p>

      <p className="hidden sm:block text-gray-500 text-sm">
        {song.duration}
      </p>

      <button
        onClick={onLike}
        className="text-[#1db954] hover:scale-110 transition"
      >
        <FiHeart fill="currentColor" />
      </button>
    </motion.div>
  );
}

/* =========================
   MOBILE NAVIGATION
========================= */

function MobileBottomNav({
  activePage,
  onNavigate,
  onSearch,
}) {
  const items = [
    {
      id: "home",
      label: "Home",
      icon: FiHome,
    },
    {
      id: "search",
      label: "Search",
      icon: FiSearch,
    },
    {
      id: "library",
      label: "Library",
      icon: FiBookOpen,
    },
    {
      id: "profile",
      label: "Profile",
      icon: FiUser,
    },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0b0b0b]/95 backdrop-blur-xl border-t border-white/10">
      <div className="grid grid-cols-4 max-w-lg mx-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const active = activePage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === "search") {
                  onSearch();
                } else {
                  onNavigate(item.id);
                }
              }}
              className={`py-3 flex flex-col items-center gap-1 transition ${
                active
                  ? "text-[#1db954]"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              <Icon className="text-xl" />
              <span className="text-[11px]">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;