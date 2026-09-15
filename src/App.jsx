
import { useEffect, useState } from "react";
import {
  FiBookOpen,
  FiCheck,
  FiHeart,
  FiMusic,
  FiPlay,
  FiSearch,
  FiSettings,
  FiUser,
  FiZap,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import MusicPlayer from "./components/MusicPlayer";
import LoadingScreen from "./components/LoadingScreen";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Playlist from "./pages/Playlist";
import Artist from "./pages/Artist";

import {
  songs,
  playlists,
} from "./data/musicData";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [activePage, setActivePage] = useState("home");

  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false);

  const [searchValue, setSearchValue] = useState("");

  const [currentSong, setCurrentSong] = useState(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const [likedSongs, setLikedSongs] = useState([]);

  const [userPlaylists, setUserPlaylists] =
    useState([]);

  const [profileSection, setProfileSection] =
    useState("account");

  const [selectedPlaylist, setSelectedPlaylist] =
    useState(null);

  const [selectedArtist, setSelectedArtist] =
    useState(null);

  /* =========================
     LOADING
  ========================= */

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  /* =========================
     NAVIGATION
  ========================= */

  const navigate = (page) => {
    setActivePage(page);
  };

  /* =========================
     PLAY SONG
  ========================= */

  const playSong = (song) => {
    if (!song) return;

    if (currentSong?.id === song.id) {
      setIsPlaying((previous) => !previous);
      return;
    }

    setCurrentSong(song);
    setIsPlaying(true);
  };

  /* =========================
     NEXT SONG
  ========================= */

  const handleNextSong = () => {
    if (!currentSong || songs.length === 0) return;

    const currentIndex = songs.findIndex(
      (song) => song.id === currentSong.id
    );

    const nextIndex =
      currentIndex === -1
        ? 0
        : (currentIndex + 1) % songs.length;

    setCurrentSong(songs[nextIndex]);
    setIsPlaying(true);
  };

  /* =========================
     PREVIOUS SONG
  ========================= */

  const handlePreviousSong = () => {
    if (!currentSong || songs.length === 0) return;

    const currentIndex = songs.findIndex(
      (song) => song.id === currentSong.id
    );

    const previousIndex =
      currentIndex <= 0
        ? songs.length - 1
        : currentIndex - 1;

    setCurrentSong(songs[previousIndex]);
    setIsPlaying(true);
  };

  /* =========================
     SEARCH
  ========================= */

  const handleSearch = (value) => {
    setSearchValue(value);

    if (value.trim()) {
      setActivePage("search");
    }
  };

  /* =========================
     HOME BUTTONS
  ========================= */

  const startListening = () => {
    if (!songs.length) return;

    setCurrentSong(songs[0]);
    setIsPlaying(true);
  };

  const exploreMusic = () => {
    setActivePage("search");
  };

  /* =========================
     LIKE SONG
  ========================= */

  const toggleLike = (song) => {
    if (!song) return;

    setLikedSongs((current) => {
      const alreadyLiked = current.some(
        (item) => item.id === song.id
      );

      if (alreadyLiked) {
        return current.filter(
          (item) => item.id !== song.id
        );
      }

      return [...current, song];
    });
  };

  /* =========================
     CREATE PLAYLIST
  ========================= */

  const createPlaylist = () => {
    const playlistName = window.prompt(
      "Enter playlist name:"
    );

    if (!playlistName?.trim()) return;

    const newPlaylist = {
      id: `user-${Date.now()}`,
      name: playlistName.trim(),
      description: "Your personal playlist",
      image:
        songs[0]?.image ||
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
      songs: [],
      isUserPlaylist: true,
    };

    setUserPlaylists((current) => [
      ...current,
      newPlaylist,
    ]);

    setSelectedPlaylist(newPlaylist);
    setActivePage("playlist");

    alert(
      `"${playlistName.trim()}" playlist created successfully!`
    );
  };

  /* =========================
     PROFILE
  ========================= */

  const openProfile = (section = "account") => {
    setProfileSection(section);
    setActivePage("profile");
  };

  /* =========================
     UPGRADE PLAN
  ========================= */

  const openUpgradePlans = () => {
    setProfileSection("premium");
    setActivePage("profile");
  };

  /* =========================
     PLAYLIST
  ========================= */

  const openPlaylist = (playlist) => {
    setSelectedPlaylist(playlist);
    setActivePage("playlist");
  };

  /* =========================
     ARTIST
  ========================= */

  const openArtist = (artist) => {
    setSelectedArtist(artist);
    setActivePage("artist");
  };

  /* =========================
     LOADING SCREEN
  ========================= */

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* SIDEBAR */}

      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        activePage={activePage}
        onNavigate={navigate}
        onCreatePlaylist={createPlaylist}
        onLikedSongs={() => navigate("liked")}
        onUpgradePlan={openUpgradePlans}
      />

      {/* MAIN */}

      <main
        className={`min-h-screen transition-all duration-300 ${
          sidebarCollapsed
            ? "lg:pl-[82px]"
            : "lg:pl-[250px]"
        }`}
      >
        {/* NAVBAR */}

        <Navbar
          searchValue={searchValue}
          onSearch={handleSearch}
          onNavigate={navigate}
          onProfile={openProfile}
        />

        {/* PAGE CONTENT */}

        <div className="pb-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -8,
              }}
              transition={{
                duration: 0.25,
              }}
            >
              {/* HOME */}

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

              {/* SEARCH */}

              {activePage === "search" && (
                <Search
                  searchValue={searchValue}
                  onSearch={handleSearch}
                  onPlaySong={playSong}
                  onOpenPlaylist={openPlaylist}
                  onOpenArtist={openArtist}
                />
              )}

              {/* PLAYLIST */}

              {activePage === "playlist" && (
                <Playlist
                  playlist={selectedPlaylist}
                  onPlaySong={playSong}
                  onOpenArtist={openArtist}
                  likedSongs={likedSongs}
                  onLike={toggleLike}
                />
              )}

              {/* ARTIST */}

              {activePage === "artist" && (
                <Artist
                  artist={selectedArtist}
                  onPlaySong={playSong}
                  likedSongs={likedSongs}
                  onLike={toggleLike}
                />
              )}

              {/* LIBRARY */}

              {activePage === "library" && (
                <LibraryPage
                  userPlaylists={userPlaylists}
                  playlists={playlists}
                  onOpenPlaylist={openPlaylist}
                  onCreatePlaylist={createPlaylist}
                />
              )}

              {/* LIKED */}

              {activePage === "liked" && (
                <LikedSongsPage
                  likedSongs={likedSongs}
                  onPlaySong={playSong}
                  onLike={toggleLike}
                />
              )}

              {/* PROFILE */}

              {activePage === "profile" && (
                <ProfilePage
                  section={profileSection}
                  onSectionChange={setProfileSection}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* MUSIC PLAYER */}

      <MusicPlayer
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        onNext={handleNextSong}
        onPrevious={handlePreviousSong}
        likedSongs={likedSongs}
        onLike={toggleLike}
      />

      {/* MOBILE NAV */}

      <MobileBottomNav
        activePage={activePage}
        onNavigate={navigate}
        onSearch={() => navigate("search")}
      />
    </div>
  );
};

/* =====================================================
   LIBRARY
===================================================== */

const LibraryPage = ({
  userPlaylists,
  playlists,
  onOpenPlaylist,
  onCreatePlaylist,
}) => {
  const allPlaylists = [
    ...userPlaylists,
    ...playlists,
  ];

  return (
    <section className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="mb-2 text-sm font-medium text-green-400">
          YOUR MUSIC
        </p>

        <h1 className="text-3xl font-black sm:text-4xl">
          Your Library
        </h1>

        <p className="mt-2 text-gray-500">
          Your playlists and saved music in one place.
        </p>
      </div>

      <button
        type="button"
        onClick={onCreatePlaylist}
        className="mb-8 flex items-center gap-2 rounded-full bg-green-500 px-5 py-3 text-sm font-bold text-black transition hover:scale-105 hover:bg-green-400"
      >
        <FiMusic size={17} />
        Create New Playlist
      </button>

      {allPlaylists.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {allPlaylists.map((playlist) => (
            <motion.button
              type="button"
              key={playlist.id}
              onClick={() => onOpenPlaylist(playlist)}
              whileHover={{ y: -5 }}
              className="group rounded-2xl bg-[#121212] p-3 text-left transition hover:bg-[#1b1b1b]"
            >
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={playlist.image}
                  alt={playlist.name}
                  className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute bottom-3 right-3 flex h-10 w-10 translate-y-3 items-center justify-center rounded-full bg-green-500 text-black opacity-0 shadow-xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <FiPlay
                    size={17}
                    fill="currentColor"
                  />
                </div>
              </div>

              <h3 className="mt-3 truncate font-semibold text-white">
                {playlist.name}
              </h3>

              <p className="mt-1 truncate text-xs text-gray-500">
                {playlist.description ||
                  "Your playlist"}
              </p>
            </motion.button>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<FiBookOpen size={32} />}
          title="Your library is empty"
          text="Create a playlist and start adding your favorite music."
          buttonText="Create Playlist"
          onClick={onCreatePlaylist}
        />
      )}
    </section>
  );
};

/* =====================================================
   LIKED SONGS
===================================================== */

const LikedSongsPage = ({
  likedSongs,
  onPlaySong,
  onLike,
}) => {
  return (
    <section className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end gap-5">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-700 to-blue-500 shadow-xl sm:h-32 sm:w-32">
          <FiHeart
            size={45}
            fill="white"
            className="text-white"
          />
        </div>

        <div>
          <p className="text-sm text-gray-400">
            PLAYLIST
          </p>

          <h1 className="mt-1 text-3xl font-black sm:text-5xl">
            Liked Songs
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {likedSongs.length} saved songs
          </p>
        </div>
      </div>

      {likedSongs.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-white/5 bg-[#0c0c0c]">
          {likedSongs.map((song, index) => (
            <div
              key={song.id}
              className="group flex items-center gap-3 border-b border-white/5 px-3 py-3 transition hover:bg-white/5 sm:px-5"
            >
              <span className="w-6 text-center text-sm text-gray-600">
                {index + 1}
              </span>

              <img
                src={song.image}
                alt={song.title}
                className="h-11 w-11 rounded-lg object-cover"
              />

              <button
                type="button"
                onClick={() => onPlaySong(song)}
                className="min-w-0 flex-1 text-left"
              >
                <p className="truncate text-sm font-medium text-white">
                  {song.title}
                </p>

                <p className="truncate text-xs text-gray-500">
                  {song.artist}
                </p>
              </button>

              <span className="hidden text-xs text-gray-500 sm:block">
                {song.album}
              </span>

              <button
                type="button"
                onClick={() => onLike(song)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-green-400 transition hover:bg-white/10"
              >
                <FiHeart
                  size={17}
                  fill="currentColor"
                />
              </button>

              <span className="w-12 text-right text-xs text-gray-500">
                {song.duration}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<FiHeart size={32} />}
          title="No liked songs yet"
          text="Tap the heart icon on any song to save it here."
        />
      )}
    </section>
  );
};

/* =====================================================
   PROFILE
===================================================== */

const ProfilePage = ({
  section,
  onSectionChange,
}) => {
  const sections = [
    {
      id: "account",
      label: "Account",
      icon: FiUser,
    },
    {
      id: "settings",
      label: "Settings",
      icon: FiSettings,
    },
    {
      id: "premium",
      label: "Premium",
      icon: FiZap,
    },
  ];

  return (
    <section className="mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mb-8">
        <p className="text-sm font-medium text-green-400">
          SONICORA
        </p>

        <h1 className="mt-1 text-3xl font-black sm:text-4xl">
          Your Profile
        </h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <div className="h-fit rounded-2xl border border-white/5 bg-[#101010] p-2">
          {sections.map((item) => {
            const Icon = item.icon;
            const active = section === item.id;

            return (
              <button
                type="button"
                key={item.id}
                onClick={() =>
                  onSectionChange(item.id)
                }
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                  active
                    ? "bg-green-500 text-black"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </div>

        <div>
          {section === "account" && (
            <AccountSection />
          )}

          {section === "settings" && (
            <SettingsSection />
          )}

          {section === "premium" && (
            <PremiumSection />
          )}
        </div>
      </div>
    </section>
  );
};

/* =====================================================
   ACCOUNT
===================================================== */

const AccountSection = () => {
  return (
    <div className="rounded-3xl border border-white/5 bg-[#101010] p-6 sm:p-8">
      <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-700 text-3xl font-black text-black">
          G
        </div>

        <div>
          <p className="text-sm text-gray-500">
            PROFILE
          </p>

          <h2 className="mt-1 text-2xl font-bold">
            Geetha Priya
          </h2>

          <p className="mt-1 text-gray-500">
            Music lover • Sonicora member
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <ProfileStat
          number="24"
          label="Playlists"
        />

        <ProfileStat
          number="128"
          label="Liked Songs"
        />

        <ProfileStat
          number="36"
          label="Artists"
        />
      </div>
    </div>
  );
};

/* =====================================================
   SETTINGS
===================================================== */

const SettingsSection = () => {
  return (
    <div className="rounded-3xl border border-white/5 bg-[#101010] p-6 sm:p-8">
      <h2 className="text-2xl font-bold">
        Settings
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        Manage your Sonicora preferences.
      </p>

      <div className="mt-8 space-y-3">
        <SettingRow
          title="Private Session"
          description="Hide your listening activity."
        />

        <SettingRow
          title="Autoplay"
          description="Automatically play similar music."
          enabled
        />

        <SettingRow
          title="High Quality Audio"
          description="Use higher quality streaming."
          enabled
        />

        <SettingRow
          title="Desktop Notifications"
          description="Receive notifications about new music."
        />
      </div>
    </div>
  );
};

/* =====================================================
   PREMIUM
===================================================== */

const PremiumSection = () => {
  const plans = [
    {
      name: "Individual",
      price: "₹119",
      period: "/ month",
      description:
        "Perfect for one music lover.",
      popular: true,
      features: [
        "Ad-free music",
        "Unlimited skips",
        "Offline listening",
        "High quality audio",
      ],
    },
    {
      name: "Student",
      price: "₹59",
      period: "/ month",
      description:
        "Premium music at a student-friendly price.",
      popular: false,
      features: [
        "Ad-free music",
        "Unlimited skips",
        "Offline listening",
        "High quality audio",
      ],
    },
    {
      name: "Family",
      price: "₹179",
      period: "/ month",
      description:
        "Premium music for your family.",
      popular: false,
      features: [
        "Up to 6 accounts",
        "Ad-free music",
        "Offline listening",
        "High quality audio",
      ],
    },
  ];

  const choosePlan = (plan) => {
    alert(
      `${plan.name} Premium selected! Payment integration can be connected later.`
    );
  };

  return (
    <div>
      <div className="relative mb-8 overflow-hidden rounded-3xl border border-green-500/20 bg-gradient-to-br from-green-500/15 via-[#101010] to-[#101010] p-6 sm:p-10">
        <div className="relative z-10 max-w-2xl">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500 text-black">
            <FiZap size={24} />
          </div>

          <p className="text-sm font-semibold uppercase tracking-widest text-green-400">
            Sonicora Premium
          </p>

          <h2 className="mt-2 text-3xl font-black sm:text-5xl">
            Music without limits.
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-6 text-gray-400 sm:text-base">
            Enjoy your favorite music without ads,
            download songs for offline listening and
            experience high-quality audio.
          </p>
        </div>

        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-green-500/10 blur-3xl" />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {plans.map((plan) => (
          <motion.div
            key={plan.name}
            whileHover={{ y: -6 }}
            className={`relative overflow-hidden rounded-3xl border p-6 ${
              plan.popular
                ? "border-green-500/50 bg-gradient-to-b from-green-500/10 to-[#101010]"
                : "border-white/10 bg-[#101010]"
            }`}
          >
            {plan.popular && (
              <div className="absolute right-4 top-4 rounded-full bg-green-500 px-3 py-1 text-[10px] font-black uppercase text-black">
                Popular
              </div>
            )}

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-green-400">
              <FiZap size={21} />
            </div>

            <h3 className="mt-5 text-xl font-bold">
              {plan.name}
            </h3>

            <p className="mt-2 min-h-[40px] text-sm text-gray-500">
              {plan.description}
            </p>

            <div className="mt-6">
              <span className="text-4xl font-black">
                {plan.price}
              </span>

              <span className="text-sm text-gray-500">
                {plan.period}
              </span>
            </div>

            <div className="my-6 h-px bg-white/10" />

            <div className="space-y-3">
              {plan.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 text-sm text-gray-300"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-400">
                    <FiCheck size={13} />
                  </span>

                  {feature}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => choosePlan(plan)}
              className={`mt-7 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-bold transition hover:scale-[1.02] ${
                plan.popular
                  ? "bg-green-500 text-black hover:bg-green-400"
                  : "bg-white text-black hover:bg-gray-200"
              }`}
            >
              <FiZap size={16} />
              Choose {plan.name}
            </button>
          </motion.div>
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-gray-600">
        Cancel anytime. Payment integration can be
        connected later.
      </p>
    </div>
  );
};

/* =====================================================
   PROFILE STAT
===================================================== */

const ProfileStat = ({
  number,
  label,
}) => {
  return (
    <div className="rounded-2xl bg-white/5 p-5">
      <p className="text-2xl font-black text-white">
        {number}
      </p>

      <p className="mt-1 text-sm text-gray-500">
        {label}
      </p>
    </div>
  );
};

/* =====================================================
   SETTING ROW
===================================================== */

const SettingRow = ({
  title,
  description,
  enabled = false,
}) => {
  const [active, setActive] =
    useState(enabled);

  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4">
      <div>
        <p className="text-sm font-medium text-white">
          {title}
        </p>

        <p className="mt-1 text-xs text-gray-500">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={() =>
          setActive((value) => !value)
        }
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          active
            ? "bg-green-500"
            : "bg-gray-700"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${
            active
              ? "left-6"
              : "left-1"
          }`}
        />
      </button>
    </div>
  );
};

/* =====================================================
   EMPTY STATE
===================================================== */

const EmptyState = ({
  icon,
  title,
  text,
  buttonText,
  onClick,
}) => {
  return (
    <div className="flex min-h-[350px] flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-[#0c0c0c] px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-gray-500">
        {icon}
      </div>

      <h2 className="mt-5 text-xl font-bold text-white">
        {title}
      </h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
        {text}
      </p>

      {buttonText && onClick && (
        <button
          type="button"
          onClick={onClick}
          className="mt-5 rounded-full bg-green-500 px-5 py-3 text-sm font-bold text-black transition hover:scale-105 hover:bg-green-400"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

/* =====================================================
   MOBILE BOTTOM NAV
===================================================== */

const MobileBottomNav = ({
  activePage,
  onNavigate,
  onSearch,
}) => {
  const items = [
    {
      label: "Home",
      page: "home",
      icon: FiMusic,
    },
    {
      label: "Search",
      page: "search",
      icon: FiSearch,
    },
    {
      label: "Library",
      page: "library",
      icon: FiBookOpen,
    },
    {
      label: "Liked",
      page: "liked",
      icon: FiHeart,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[80] border-t border-white/10 bg-[#080808]/95 px-2 backdrop-blur-xl lg:hidden">
      <div className="mx-auto flex max-w-lg items-center justify-around py-2">
        {items.map((item) => {
          const Icon = item.icon;
          const active =
            activePage === item.page;

          return (
            <button
              type="button"
              key={item.page}
              onClick={() => {
                if (item.page === "search") {
                  onSearch();
                } else {
                  onNavigate(item.page);
                }
              }}
              className={`flex min-w-[65px] flex-col items-center gap-1 rounded-xl px-3 py-2 text-[10px] transition ${
                active
                  ? "text-green-400"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              <Icon
                size={19}
                className={
                  active
                    ? "scale-110"
                    : ""
                }
              />

              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default App;