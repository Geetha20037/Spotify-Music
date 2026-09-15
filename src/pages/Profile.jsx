import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiEdit3,
  FiMail,
  FiMusic,
  FiSettings,
  FiUser,
  FiLogOut,
} from "react-icons/fi";

export default function Profile({
  user,
  onBack,
  onSettings,
  onLogout,
}) {
  const profileUser = user || {
    name: "Music Lover",
    email: "listener@example.com",
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white px-4 sm:px-6 lg:px-10 py-6">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition mb-7"
        >
          <FiArrowLeft />
          Back to Music
        </button>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl overflow-hidden border border-white/10 bg-[#111]"
        >
          <div className="h-44 sm:h-56 bg-gradient-to-r from-[#1db954]/40 via-[#14532d] to-[#050505]" />

          <div className="px-6 sm:px-10 pb-8">
            <div className="flex flex-col sm:flex-row sm:items-end gap-5 -mt-14">
              <div className="w-28 h-28 rounded-full bg-[#1db954] border-8 border-[#111] flex items-center justify-center shadow-xl">
                <FiUser className="text-black text-5xl" />
              </div>

              <div className="flex-1">
                <p className="text-gray-400 text-sm">PROFILE</p>

                <h1 className="text-3xl sm:text-4xl font-bold mt-1">
                  {profileUser.name}
                </h1>

                <p className="text-gray-400 mt-1">
                  {profileUser.email}
                </p>
              </div>

              <button
                onClick={() => alert("Edit profile feature is ready for integration.")}
                className="flex items-center justify-center gap-2 border border-white/20 rounded-full px-5 py-2.5 hover:bg-white/10 transition"
              >
                <FiEdit3 />
                Edit Profile
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
              <div className="rounded-2xl bg-[#181818] p-5">
                <FiMusic className="text-[#1db954] text-xl mb-3" />
                <p className="text-2xl font-bold">24</p>
                <p className="text-gray-400 text-sm">Songs Played</p>
              </div>

              <div className="rounded-2xl bg-[#181818] p-5">
                <FiMusic className="text-[#1db954] text-xl mb-3" />
                <p className="text-2xl font-bold">8</p>
                <p className="text-gray-400 text-sm">Playlists</p>
              </div>

              <div className="rounded-2xl bg-[#181818] p-5">
                <FiUser className="text-[#1db954] text-xl mb-3" />
                <p className="text-2xl font-bold">12</p>
                <p className="text-gray-400 text-sm">Artists Followed</p>
              </div>

              <div className="rounded-2xl bg-[#181818] p-5">
                <FiMusic className="text-[#1db954] text-xl mb-3" />
                <p className="text-2xl font-bold">6h</p>
                <p className="text-gray-400 text-sm">Listening Time</p>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <button
                onClick={onSettings}
                className="w-full flex items-center gap-4 rounded-2xl bg-[#181818] p-5 hover:bg-[#222] transition text-left"
              >
                <FiSettings className="text-[#1db954] text-xl" />

                <div className="flex-1">
                  <p className="font-semibold">Settings</p>
                  <p className="text-sm text-gray-500">
                    Manage your account preferences
                  </p>
                </div>

                <span className="text-gray-500">›</span>
              </button>

              <div className="w-full flex items-center gap-4 rounded-2xl bg-[#181818] p-5">
                <FiMail className="text-[#1db954] text-xl" />

                <div>
                  <p className="font-semibold">Email Address</p>
                  <p className="text-sm text-gray-500">
                    {profileUser.email}
                  </p>
                </div>
              </div>

              <button
                onClick={onLogout}
                className="w-full flex items-center gap-4 rounded-2xl bg-red-500/10 p-5 hover:bg-red-500/20 transition text-left text-red-400"
              >
                <FiLogOut className="text-xl" />

                <div>
                  <p className="font-semibold">Log Out</p>
                  <p className="text-sm text-red-400/60">
                    Sign out of your account
                  </p>
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}