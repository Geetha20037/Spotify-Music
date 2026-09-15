import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiMusic,
} from "react-icons/fi";

export default function SignIn({ onBack, onSignUp, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    onLogin?.({
      name: email.split("@")[0],
      email,
    });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition"
        >
          <FiArrowLeft />
          Back
        </button>

        <div className="rounded-3xl border border-white/10 bg-[#111] p-7 sm:p-9 shadow-2xl">
          <div className="flex justify-center mb-5">
            <div className="w-14 h-14 rounded-full bg-[#1db954] flex items-center justify-center">
              <FiMusic className="text-black text-2xl" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center">
            Welcome back
          </h1>

          <p className="text-gray-400 text-center mt-2 mb-8">
            Sign in to continue listening
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Email
              </label>

              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl bg-[#1b1b1b] border border-white/10 py-3.5 pl-11 pr-4 outline-none focus:border-[#1db954] transition"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Password
              </label>

              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-xl bg-[#1b1b1b] border border-white/10 py-3.5 pl-11 pr-12 outline-none focus:border-[#1db954] transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-400">
                <input type="checkbox" className="accent-[#1db954]" />
                Remember me
              </label>

              <button
                type="button"
                onClick={() => alert("Password reset link sent!")}
                className="text-[#1db954] hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#1db954] py-3.5 font-bold text-black hover:bg-[#1ed760] hover:scale-[1.01] transition"
            >
              Sign In
            </button>
          </form>

          <div className="my-7 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-gray-500 text-sm">OR</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <p className="text-center text-gray-400 text-sm">
            Don't have an account?{" "}
            <button
              onClick={onSignUp}
              className="text-[#1db954] font-semibold hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}