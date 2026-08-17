import { useEffect, useMemo, useState } from "react";

import {
  FaLink,
  FaMousePointer,
  FaChartLine,
  FaChevronDown,
  FaCheck,
} from "react-icons/fa";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { useMyLinks } from "../links/useMyLinks";
import { useLinkAnalytics } from "../analytics/useLinkAnalytics";

import {
  AnimatePresence,
  motion,
} from "motion/react";

function Analytics() {
  const { data, isLoading } =
    useMyLinks();

  const links = data?.links || [];

  const [selectedLink, setSelectedLink] =
    useState("all");

  const [
    linkDropdownOpen,
    setLinkDropdownOpen,
  ] = useState(false);

  const selectedLinkData =
    selectedLink === "all"
      ? null
      : links.find(
          (link) =>
            link._id === selectedLink
        );

  const {
    data: analyticsData,
    isLoading: analyticsLoading,
  } = useLinkAnalytics(selectedLink);

  const analytics =
    analyticsData?.analytics || [];

  /* ---------------------------------- */
  /* Statistics                         */
  /* ---------------------------------- */

  const totalLinks = links.length;

  const totalClicks = links.reduce(
    (sum, link) =>
      sum + (link.clicks || 0),
    0
  );

  const averageClicks =
    totalLinks > 0
      ? (
          totalClicks / totalLinks
        ).toFixed(1)
      : "0.0";

  /* ---------------------------------- */
  /* Ranked Links                       */
  /* ---------------------------------- */

  const rankedLinks = useMemo(() => {
    return [...links].sort(
      (a, b) =>
        (b.clicks || 0) -
        (a.clicks || 0)
    );
  }, [links]);

  const mostClicked =
    rankedLinks[0] || null;

  const bestLinkShare =
    totalClicks > 0 &&
    mostClicked
      ? (
          ((mostClicked.clicks || 0) /
            totalClicks) *
          100
        ).toFixed(1)
      : "0.0";

  /* ---------------------------------- */
  /* Chart Data                         */
  /* ---------------------------------- */

  const chartData = useMemo(() => {
    return analytics.map((item) => ({
      date:
        item.date ||
        item._id ||
        item.createdAt ||
        "",

      clicks:
        item.clicks ||
        item.count ||
        0,
    }));
  }, [analytics]);

  /* ---------------------------------- */
  /* Loading                            */
  /* ---------------------------------- */

  if (isLoading) {
    return (
      <div
        className="
          space-y-8
          theme-text
        "
      >
        <div>
          <div
            className="
              h-10
              w-48
              animate-pulse
              rounded-xl
              theme-surface
            "
          />

          <div
            className="
              mt-3
              h-5
              w-72
              animate-pulse
              rounded-lg
              theme-surface
            "
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[...Array(3)].map(
            (_, index) => (
              <div
                key={index}
                className="
                  h-40
                  animate-pulse
                  rounded-3xl
                  theme-surface
                "
              />
            )
          )}
        </div>

        <div
          className="
            h-[450px]
            animate-pulse
            rounded-3xl
            theme-surface
          "
        />
      </div>
    );
  }

  return (
    <div
      className="
      mt-8
        space-y-8
        theme-text
      "
    >

      {/* -------------------------------- */}
      {/* Stats                            */}
      {/* -------------------------------- */}

      <div className="grid gap-4 md:grid-cols-3">

        {/* TOTAL LINKS */}

        <div
          className="
            rounded-3xl
            border
            theme-border
            theme-surface
            p-6
            transition-colors
            duration-250
          "
        >
          <div className="flex items-center justify-between">
            <span className="theme-muted">
              Total Links
            </span>

            <FaLink
              className="
                theme-accent
              "
            />
          </div>

          <h2
            className="
              mt-4
              text-5xl
              font-black
              theme-text
            "
          >
            {totalLinks}
          </h2>

          <p
            className="
              mt-2
              text-sm
              theme-muted
            "
          >
            Links on your profile
          </p>
        </div>

        {/* TOTAL CLICKS */}

        <div
          className="
            rounded-3xl
            border
            theme-border
            theme-surface
            p-6
            transition-colors
            duration-250
          "
        >
          <div className="flex items-center justify-between">
            <span className="theme-muted">
              Total Clicks
            </span>

            <FaMousePointer
              className="
                theme-accent
              "
            />
          </div>

          <h2
            className="
              mt-4
              text-5xl
              font-black
              theme-text
            "
          >
            {totalClicks}
          </h2>

          <p
            className="
              mt-2
              text-sm
              theme-muted
            "
          >
            Across all your links
          </p>
        </div>

        {/* AVERAGE CLICKS */}

        <div
          className="
            rounded-3xl
            border
            theme-border
            theme-surface
            p-6
            transition-colors
            duration-250
          "
        >
          <div className="flex items-center justify-between">
            <span className="theme-muted">
              Avg Clicks / Link
            </span>

            <FaChartLine
              className="
                theme-accent
              "
            />
          </div>

          <h2
            className="
              mt-4
              text-5xl
              font-black
              theme-text
            "
          >
            {averageClicks}
          </h2>

          <p
            className="
              mt-2
              text-sm
              theme-muted
            "
          >
            Average performance
          </p>
        </div>
      </div>

      {/* -------------------------------- */}
      {/* Overall Performance              */}
      {/* -------------------------------- */}

      <div
        className="
          rounded-3xl
          border
          theme-border
          theme-surface
          p-6
          transition-colors
          duration-250
          sm:p-8
        "
      >
        <div>
          <h2
            className="
              text-2xl
              font-bold
              theme-text
            "
          >
            Overall Performance
          </h2>

          <p
            className="
              mt-1
              text-sm
              theme-muted
            "
          >
            A quick overview of your link
            performance.
          </p>
        </div>

        <div className="mt-8 grid gap-8 sm:grid-cols-3">

          <div>
            <p className="text-sm theme-muted">
              Total clicks
            </p>

            <p
              className="
                mt-2
                text-3xl
                font-black
                theme-text
              "
            >
              {totalClicks}
            </p>
          </div>

          <div>
            <p className="text-sm theme-muted">
              Most clicked link
            </p>

            <p
              className="
                mt-2
                truncate
                text-xl
                font-bold
                theme-text
              "
            >
              {mostClicked?.title ||
                "No links yet"}
            </p>
          </div>

          <div>
            <p className="text-sm theme-muted">
              Best link share
            </p>

            <p
              className="
                mt-2
                text-3xl
                font-black
                theme-accent
              "
            >
              {bestLinkShare}%
            </p>
          </div>

        </div>
      </div>

      {/* -------------------------------- */}
      {/* Performance Over Time            */}
      {/* -------------------------------- */}

      <div
        className="
          rounded-3xl
          border
          theme-border
          theme-surface
          p-6
          transition-colors
          duration-250
          sm:p-8
        "
      >

        {/* CHART HEADER */}

        <div
          className="
            flex
            flex-col
            gap-5
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div>
            <h2
              className="
                text-2xl
                font-bold
                theme-text
              "
            >
              Performance Over Time
            </h2>

            <p
              className="
                mt-1
                text-sm
                theme-muted
              "
            >
              Track how your selected link
              performs over time.
            </p>
          </div>

          {/* LINK FILTER */}

          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setLinkDropdownOpen(
                  (prev) => !prev
                )
              }
              className="
                flex
                min-w-[190px]
                items-center
                justify-between
                gap-4
                rounded-xl
                border
                theme-border
                theme-surface-secondary
                px-4
                py-2.5
                text-sm
                theme-text
                transition
                hover:border-[var(--border-hover)]
                focus:border-[var(--accent)]
                focus:outline-none
              "
            >
              <span className="truncate">
                {selectedLink === "all"
                  ? "All Links"
                  : selectedLinkData?.title ||
                    "Untitled Link"}
              </span>

              <FaChevronDown
                className={`
                  shrink-0
                  text-xs
                  theme-muted
                  transition-transform

                  ${
                    linkDropdownOpen
                      ? "rotate-180"
                      : ""
                  }
                `}
              />
            </button>

            <AnimatePresence>
              {linkDropdownOpen && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -6,
                    scale: 0.98,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: -6,
                    scale: 0.98,
                  }}
                  transition={{
                    duration: 0.15,
                  }}
                  className="
                    absolute
                    right-0
                    top-full
                    z-50
                    mt-2
                    w-[240px]
                    overflow-hidden
                    rounded-2xl
                    border
                    theme-border
                    theme-surface
                    p-1.5
                    shadow-2xl
                    shadow-black/10
                    dark:shadow-black/50
                  "
                >

                  {/* ALL LINKS */}

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedLink(
                        "all"
                      );

                      setLinkDropdownOpen(
                        false
                      );
                    }}
                    className={`
                      flex
                      w-full
                      items-center
                      justify-between
                      rounded-xl
                      px-3
                      py-3
                      text-left
                      text-sm
                      transition

                      ${
                        selectedLink ===
                        "all"
                          ? `
                            bg-[color-mix(in_srgb,var(--accent)_10%,transparent)]
                            text-[var(--accent)]
                          `
                          : `
                            theme-muted
                            hover:bg-[var(--surface-secondary)]
                            hover:text-[var(--foreground)]
                          `
                      }
                    `}
                  >
                    <span>
                      All Links
                    </span>

                    {selectedLink ===
                      "all" && (
                      <FaCheck
                        className="
                          text-xs
                          theme-accent
                        "
                      />
                    )}
                  </button>

                  <div
                    className="
                      my-1
                      border-t
                      theme-border
                    "
                  />

                  {/* INDIVIDUAL LINKS */}

                  <div className="max-h-60 overflow-y-auto">
                    {links.map((link) => {
                      const isSelected =
                        selectedLink ===
                        link._id;

                      return (
                        <button
                          key={link._id}
                          type="button"
                          onClick={() => {
                            setSelectedLink(
                              link._id
                            );

                            setLinkDropdownOpen(
                              false
                            );
                          }}
                          className={`
                            flex
                            w-full
                            items-center
                            justify-between
                            rounded-xl
                            px-3
                            py-3
                            text-left
                            text-sm
                            transition

                            ${
                              isSelected
                                ? `
                                  bg-[color-mix(in_srgb,var(--accent)_10%,transparent)]
                                  text-[var(--accent)]
                                `
                                : `
                                  theme-muted
                                  hover:bg-[var(--surface-secondary)]
                                  hover:text-[var(--foreground)]
                                `
                            }
                          `}
                        >
                          <span className="truncate pr-3">
                            {link.title ||
                              "Untitled Link"}
                          </span>

                          {isSelected && (
                            <FaCheck
                              className="
                                shrink-0
                                text-xs
                                theme-accent
                              "
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* CHART */}

        <div
          className="
            mt-8
            h-[320px]
            w-full
            sm:h-[400px]
          "
        >
          {analyticsLoading ? (
            <div className="flex h-full items-center justify-center">
              <p className="theme-muted">
                Loading analytics...
              </p>
            </div>
          ) : chartData.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">

                <FaChartLine
                  size={40}
                  className="
                    mx-auto
                    theme-muted
                  "
                />

                <p
                  className="
                    mt-4
                    theme-muted
                  "
                >
                  No analytics data available
                  yet.
                </p>

              </div>
            </div>
          ) : (
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -20,
                  bottom: 10,
                }}
              >

                <CartesianGrid
                  stroke="var(--chart-grid)"
                  vertical={false}
                />

                <XAxis
                  dataKey="date"
                  stroke="var(--chart-axis)"
                  tick={{
                    fontSize: 12,
                  }}
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  stroke="var(--chart-axis)"
                  tick={{
                    fontSize: 12,
                  }}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor:
                      "var(--chart-tooltip-bg)",
                    border:
                      "1px solid var(--chart-tooltip-border)",
                    borderRadius:
                      "12px",
                    color:
                      "var(--chart-tooltip-text)",
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="clicks"
                  stroke="var(--chart-accent)"
                  strokeWidth={3}
                  dot={{
                    r: 4,
                    fill:
                      "var(--chart-accent)",
                  }}
                  activeDot={{
                    r: 6,
                  }}
                />

              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* -------------------------------- */}
      {/* Top Links                        */}
      {/* -------------------------------- */}

      <div
        className="
          rounded-3xl
          border
          theme-border
          theme-surface
          p-6
          transition-colors
          duration-250
          sm:p-8
        "
      >
        <div
          className="
            flex
            flex-col
            gap-2
            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >
          <div>
            <h2
              className="
                text-2xl
                font-bold
                theme-text
              "
            >
              Top Links
            </h2>

            <p className="mt-1 text-sm theme-muted">
              Ranked by total clicks.
            </p>
          </div>

          <p
            className="
              text-sm
              theme-muted
            "
          >
            {rankedLinks.length} link
            {rankedLinks.length !== 1 &&
              "s"}
          </p>
        </div>

        {/* TABLE */}

        <div className="mt-6 overflow-x-auto">
          <div className="min-w-[600px]">

            {/* HEADER */}

            <div
              className="
                grid
                grid-cols-[60px_1fr_120px_120px]
                gap-4
                border-b
                theme-border
                px-4
                pb-4
                text-sm
                theme-muted
              "
            >
              <span>#</span>

              <span>Link</span>

              <span className="text-right">
                Clicks
              </span>

              <span className="text-right">
                Share
              </span>
            </div>

            {/* ROWS */}

            <div>
              {rankedLinks.length === 0 ? (
                <div
                  className="
                    py-12
                    text-center
                    theme-muted
                  "
                >
                  No links available.
                </div>
              ) : (
                rankedLinks.map(
                  (link, index) => {
                    const clicks =
                      link.clicks || 0;

                    const percentage =
                      totalClicks > 0
                        ? (
                            (clicks /
                              totalClicks) *
                            100
                          ).toFixed(1)
                        : "0.0";

                    return (
                      <div
                        key={link._id}
                        className="
                          grid
                          grid-cols-[60px_1fr_120px_120px]
                          items-center
                          gap-4
                          border-b
                          theme-border
                          px-4
                          py-5
                          last:border-b-0
                        "
                      >

                        {/* RANK */}

                        <span
                          className="
                            font-bold
                            theme-muted
                          "
                        >
                          {String(
                            index + 1
                          ).padStart(
                            2,
                            "0"
                          )}
                        </span>

                        {/* LINK */}

                        <div className="min-w-0">
                          <p
                            className="
                              truncate
                              font-semibold
                              theme-text
                            "
                          >
                            {link.title ||
                              "Untitled Link"}
                          </p>

                          {link.url && (
                            <p
                              className="
                                mt-1
                                truncate
                                text-xs
                                theme-muted
                              "
                            >
                              {link.url}
                            </p>
                          )}
                        </div>

                        {/* CLICKS */}

                        <span
                          className="
                            text-right
                            font-bold
                            theme-text
                          "
                        >
                          {clicks}
                        </span>

                        {/* SHARE */}

                        <span
                          className="
                            text-right
                            font-medium
                            theme-accent
                          "
                        >
                          {percentage}%
                        </span>

                      </div>
                    );
                  }
                )
              )}
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}

export default Analytics;