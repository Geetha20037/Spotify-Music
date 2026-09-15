
import { useEffect, useRef, useState } from "react";
import {
  FiBell,
  FiChevronDown,
  FiLogOut,
  FiSearch,
  FiSettings,
  FiUser,
  FiZap,
} from "react-icons/fi";

const Navbar = ({
  searchValue = "",
  onSearch,
  onNavigate,
  onProfile,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New playlist available",
      message: "Discover fresh music made for you.",
      read: false,
    },
    {
      id: 2,
      title: "Daily Mix updated",
      message: "Your personalized music mix is ready.",
      read: false,
    },
    {
      id: 3,
      title: "New releases",
      message: "Check out the latest tracks.",
      read: true,
    },
  ]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const submitSearch = (event) => {
    event.preventDefault();

    if (onNavigate) {
      onNavigate("search");
    }
  };

  const markAllRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const markNotificationRead = (id) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const handleProfile = (section) => {
    setShowProfile(false);

    if (onProfile) {
      onProfile(section);
    } else if (onNavigate) {
      onNavigate("profile");
    }
  };

  const handleLogout = () => {
    setShowProfile(false);
    alert("Logout functionality is ready for backend integration.");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#080808]/95 backdrop-blur-xl">
      <div className="flex min-h-[72px] w-full items-center gap-3 px-3 sm:px-5 lg:px-7">
        {/* Mobile Logo */}
        <button
          type="button"
          onClick={() => onNavigate?.("home")}
          className="flex shrink-0 items-center gap-2 lg:hidden"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-600 text-black shadow-lg shadow-green-500/20">
            <FiZap size={18} />
          </div>

          <span className="hidden text-lg font-black tracking-tight text-white sm:block">
            Sonicora
          </span>
        </button>

        {/* Search */}
        <form
          onSubmit={submitSearch}
          className="relative min-w-0 flex-1 sm:max-w-xl lg:ml-2"
        >
          <FiSearch
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={19}
          />

          <input
            type="text"
            value={searchValue}
            onChange={(event) => onSearch?.(event.target.value)}
            onFocus={() => onNavigate?.("search")}
            placeholder="What do you want to play?"
            className="h-11 w-full rounded-full border border-white/10 bg-[#181818] pl-11 pr-4 text-sm text-white outline-none transition-all placeholder:text-gray-500 hover:bg-[#202020] focus:border-green-500/50 focus:bg-[#222] focus:ring-2 focus:ring-green-500/10"
          />
        </form>

        {/* RIGHT SIDE - Notifications + Profile */}
        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              type="button"
              onClick={() => {
                setShowNotifications((value) => !value);
                setShowProfile(false);
              }}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-300 transition-all hover:bg-white/10 hover:text-white"
              aria-label="Notifications"
            >
              <FiBell size={19} />

              {unreadCount > 0 && (
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-green-500 px-1 text-[9px] font-bold text-black">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-14 z-[100] w-[310px] overflow-hidden rounded-2xl border border-white/10 bg-[#181818] shadow-2xl shadow-black/50">
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
                  <div>
                    <h3 className="font-semibold text-white">
                      Notifications
                    </h3>

                    <p className="mt-0.5 text-xs text-gray-500">
                      {unreadCount} unread
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={markAllRead}
                    className="text-xs font-medium text-green-400 transition hover:text-green-300"
                  >
                    Mark all read
                  </button>
                </div>

                <div className="max-h-[330px] overflow-y-auto">
                  {notifications.map((notification) => (
                    <button
                      type="button"
                      key={notification.id}
                      onClick={() =>
                        markNotificationRead(notification.id)
                      }
                      className={`flex w-full gap-3 border-b border-white/5 px-4 py-4 text-left transition hover:bg-white/5 ${
                        !notification.read ? "bg-green-500/5" : ""
                      }`}
                    >
                      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-400">
                        <FiBell size={15} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-medium text-white">
                            {notification.title}
                          </p>

                          {!notification.read && (
                            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-400" />
                          )}
                        </div>

                        <p className="mt-1 text-xs leading-5 text-gray-500">
                          {notification.message}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => {
                setShowProfile((value) => !value);
                setShowNotifications(false);
              }}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1.5 pl-1.5 pr-2.5 transition-all hover:bg-white/10"
              aria-label="Account profile"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-700 text-sm font-bold text-black">
                G
              </div>

              <span className="hidden max-w-[90px] truncate text-sm font-medium text-white md:block">
                Geetha
              </span>

              <FiChevronDown
                size={15}
                className={`hidden text-gray-400 transition-transform md:block ${
                  showProfile ? "rotate-180" : ""
                }`}
              />
            </button>

            {showProfile && (
              <div className="absolute right-0 top-14 z-[100] w-[230px] overflow-hidden rounded-2xl border border-white/10 bg-[#181818] p-2 shadow-2xl shadow-black/50">
                <div className="mb-2 border-b border-white/10 px-3 py-3">
                  <p className="font-semibold text-white">Geetha Priya</p>
                  <p className="mt-0.5 truncate text-xs text-gray-500">
                    Music lover
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleProfile("account")}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-300 transition hover:bg-white/10 hover:text-white"
                >
                  <FiUser size={17} />
                  <span>Account</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleProfile("settings")}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-300 transition hover:bg-white/10 hover:text-white"
                >
                  <FiSettings size={17} />
                  <span>Settings</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleProfile("premium")}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-green-400 transition hover:bg-green-500/10"
                >
                  <FiZap size={17} />
                  <span>Premium</span>
                </button>

                <div className="my-1 border-t border-white/10" />

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-400 transition hover:bg-red-500/10"
                >
                  <FiLogOut size={17} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;