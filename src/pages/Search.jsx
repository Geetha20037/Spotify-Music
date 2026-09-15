import { useMemo, useState } from "react";
import {
  FaPlay,
  FaSearch,
} from "react-icons/fa";

import {
  songs,
  artists,
  playlists,
} from "../data/musicData";

function Search({
  searchValue,
  onSearch,
  onPlaySong,
  onNavigate,
}) {
  const [category, setCategory] = useState("all");

  const query = (searchValue || "").trim().toLowerCase();

  const filteredSongs = useMemo(() => {
    if (!query) return songs;

    return songs.filter(
      (song) =>
        song.title.toLowerCase().includes(query) ||
        song.artist.toLowerCase().includes(query) ||
        song.album.toLowerCase().includes(query) ||
        song.genre.toLowerCase().includes(query),
    );
  }, [query]);

  const filteredArtists = useMemo(() => {
    if (!query) return artists;

    return artists.filter((artist) =>
      artist.name.toLowerCase().includes(query),
    );
  }, [query]);

  const filteredPlaylists = useMemo(() => {
    if (!query) return playlists;

    return playlists.filter(
      (playlist) =>
        playlist.title
          .toLowerCase()
          .includes(query) ||
        playlist.description
          .toLowerCase()
          .includes(query),
    );
  }, [query]);

  const categories = [
    ["all", "All"],
    ["songs", "Songs"],
    ["artists", "Artists"],
    ["albums", "Albums"],
    ["playlists", "Playlists"],
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black">
          Search
        </h1>

        <p className="mt-2 text-gray-500">
          Find your favorite music and artists.
        </p>
      </div>

      <div className="relative">
        <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />

        <input
          autoFocus
          value={searchValue || ""}
          onChange={(event) =>
            onSearch(event.target.value)
          }
          placeholder="Search songs, artists, albums, playlists..."
          className="h-14 w-full rounded-2xl border border-white/10 bg-[#151515] pl-12 pr-5 text-white outline-none focus:border-[#1ed760]"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto">
        {categories.map(([id, label]) => (
          <button
            key={id}
            onClick={() => setCategory(id)}
            className={`shrink-0 rounded-full px-5 py-2 text-sm font-semibold ${
              category === id
                ? "bg-[#1ed760] text-black"
                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* SONGS */}
      {(category === "all" || category === "songs") && (
        <section>
          <h2 className="mb-4 text-2xl font-bold">
            Songs
          </h2>

          {filteredSongs.length === 0 ? (
            <p className="text-gray-500">
              No songs found.
            </p>
          ) : (
            <div className="space-y-2">
              {filteredSongs.map((song, index) => (
                <div
                  key={song.id}
                  className="flex items-center gap-4 rounded-2xl bg-[#111] p-3 hover:bg-[#181818]"
                >
                  <span className="w-6 text-center text-gray-500">
                    {index + 1}
                  </span>

                  <img
                    src={song.image}
                    alt={song.title}
                    className="h-14 w-14 rounded-xl object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">
                      {song.title}
                    </p>

                    <p className="truncate text-sm text-gray-500">
                      {song.artist} • {song.album}
                    </p>
                  </div>

                  <span className="hidden text-sm text-gray-500 sm:block">
                    {song.duration}
                  </span>

                  <button
                    onClick={() => onPlaySong(song)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1ed760] text-black hover:scale-105"
                  >
                    <FaPlay />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ARTISTS */}
      {(category === "all" ||
        category === "artists") && (
        <section>
          <h2 className="mb-4 text-2xl font-bold">
            Artists
          </h2>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {filteredArtists.map((artist) => (
              <button
                key={artist.id}
                onClick={() => onNavigate("artist")}
                className="rounded-2xl bg-[#111] p-4 text-center transition hover:-translate-y-1 hover:bg-[#181818]"
              >
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="mx-auto mb-3 aspect-square w-full rounded-full object-cover"
                />

                <p className="font-semibold">
                  {artist.name}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Artist
                </p>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* PLAYLISTS */}
      {(category === "all" ||
        category === "playlists") && (
        <section className="pb-10">
          <h2 className="mb-4 text-2xl font-bold">
            Playlists
          </h2>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {filteredPlaylists.map((playlist) => (
              <button
                key={playlist.id}
                onClick={() => onNavigate("playlist")}
                className="rounded-2xl bg-[#111] p-3 text-left transition hover:-translate-y-1 hover:bg-[#181818]"
              >
                <img
                  src={playlist.image}
                  alt={playlist.title}
                  className="aspect-square w-full rounded-xl object-cover"
                />

                <p className="mt-3 font-semibold">
                  {playlist.title}
                </p>

                <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                  {playlist.description}
                </p>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Search;