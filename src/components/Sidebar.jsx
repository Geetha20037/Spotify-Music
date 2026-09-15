
import {
  FiBookOpen,
  FiChevronLeft,
  FiChevronRight,
  FiHeart,
  FiHome,
  FiList,
  FiPlus,
  FiSearch,
  FiZap,
} from "react-icons/fi";

const Sidebar = ({
  collapsed,
  setCollapsed,
  activePage,
  onNavigate,
  onCreatePlaylist,
  onLikedSongs,
  onUpgradePlan,
}) => {
  const mainItems = [
    {
      name: "Home",
      icon: FiHome,
      page: "home",
    },
    {
      name: "Search",
      icon: FiSearch,
      page: "search",
    },
    {
      name: "Your Library",
      icon: FiBookOpen,
      page: "library",
    },
  ];

  return (
    <aside
      className={`fixed bottom-0 left-0 top-0 z-[60] hidden border-r border-white/5 bg-[#050505] transition-all duration-300 lg:block ${
        collapsed ? "w-[82px]" : "w-[250px]"
      }`}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div
          className={`flex h-[72px] items-center border-b border-white/5 ${
            collapsed ? "justify-center" : "px-5"
          }`}
        >
          <button
            type="button"
            onClick={() => onNavigate?.("home")}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-600 text-black shadow-lg shadow-green-500/20">
              <span className="text-lg font-black">
                S
              </span>
            </div>

            {!collapsed && (
              <span className="text-xl font-black tracking-tight text-white">
                Sonicora
              </span>
            )}
          </button>
        </div>

        {/* Main Navigation */}
        <div className="px-3 py-5">
          {!collapsed && (
            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">
              Menu
            </p>
          )}

          <nav className="space-y-1">
            {mainItems.map((item) => {
              const Icon = item.icon;
              const active = activePage === item.page;

              return (
                <button
                  type="button"
                  key={item.name}
                  onClick={() =>
                    onNavigate?.(item.page)
                  }
                  title={collapsed ? item.name : ""}
                  className={`group flex w-full items-center rounded-xl py-3 text-sm font-medium transition-all ${
                    collapsed
                      ? "justify-center px-0"
                      : "gap-3 px-3"
                  } ${
                    active
                      ? "bg-green-500/10 text-green-400"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon
                    size={20}
                    className="shrink-0 transition-transform group-hover:scale-110"
                  />

                  {!collapsed && (
                    <span>{item.name}</span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Your Music */}
        <div className="min-h-0 flex-1 overflow-hidden px-3">
          <div
            className={`mb-3 flex items-center ${
              collapsed
                ? "justify-center"
                : "justify-between px-3"
            }`}
          >
            {!collapsed && (
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">
                Your Music
              </p>
            )}

            <button
              type="button"
              onClick={() => onCreatePlaylist?.()}
              title="Create Playlist"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-white/10 hover:text-white"
            >
              <FiPlus size={18} />
            </button>
          </div>

          <div className="space-y-1">
            {/* New Playlist */}
            <button
              type="button"
              onClick={() => onCreatePlaylist?.()}
              title={
                collapsed
                  ? "New Playlist"
                  : ""
              }
              className={`flex w-full items-center rounded-xl py-3 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white ${
                collapsed
                  ? "justify-center"
                  : "gap-3 px-3"
              }`}
            >
              <FiList
                size={19}
                className="shrink-0"
              />

              {!collapsed && (
                <span>New Playlist</span>
              )}
            </button>

            {/* Liked Songs */}
            <button
              type="button"
              onClick={() => onLikedSongs?.()}
              title={
                collapsed
                  ? "Liked Songs"
                  : ""
              }
              className={`flex w-full items-center rounded-xl py-3 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white ${
                collapsed
                  ? "justify-center"
                  : "gap-3 px-3"
              }`}
            >
              <FiHeart
                size={19}
                className="shrink-0"
              />

              {!collapsed && (
                <span>Liked Songs</span>
              )}
            </button>
          </div>
        </div>

        {/* Upgrade Plan */}
        {!collapsed && (
          <div className="px-3 pb-3">
            <button
              type="button"
              onClick={() => onUpgradePlan?.()}
              className="group w-full overflow-hidden rounded-2xl border border-green-500/20 bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-transparent p-4 text-left transition-all duration-300 hover:border-green-500/40 hover:bg-green-500/15 hover:shadow-lg hover:shadow-green-500/5"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-500/15 text-green-400 transition-transform duration-300 group-hover:scale-110">
                  <FiZap size={18} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Upgrade Plan
                  </p>

                  <p className="text-[11px] text-gray-500">
                    Unlock Premium
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-green-500 px-3 py-2 text-center text-xs font-bold text-black transition group-hover:bg-green-400">
                View Premium Plans
              </div>
            </button>
          </div>
        )}

        {/* Collapsed Upgrade */}
        {collapsed && (
          <div className="px-3 pb-3">
            <button
              type="button"
              onClick={() => onUpgradePlan?.()}
              title="Upgrade Plan"
              className="flex h-11 w-full items-center justify-center rounded-xl bg-green-500 text-black transition hover:bg-green-400"
            >
              <FiZap size={19} />
            </button>
          </div>
        )}

        {/* Collapse Button */}
        <div className="border-t border-white/5 p-3">
          <button
            type="button"
            onClick={() =>
              setCollapsed?.(!collapsed)
            }
            className="flex w-full items-center justify-center rounded-xl py-3 text-gray-400 transition hover:bg-white/5 hover:text-white"
            title={
              collapsed
                ? "Expand sidebar"
                : "Collapse sidebar"
            }
          >
            {collapsed ? (
              <FiChevronRight size={19} />
            ) : (
              <FiChevronLeft size={19} />
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;