import { useEffect, useMemo, useState } from "react";
import {
  FaLink,
  FaMousePointer,
  FaChartLine,
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
import { FaChevronDown, FaCheck } from "react-icons/fa";
import { AnimatePresence, motion } from "motion/react";


function Analytics() {
  const { data, isLoading } = useMyLinks();

  const links = data?.links || [];

const [selectedLink, setSelectedLink] =
  useState("all");


  const [linkDropdownOpen, setLinkDropdownOpen] =
  useState(false);

const selectedLinkData =
  selectedLink === "all"
    ? null
    : links.find(
        (link) => link._id === selectedLink
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
      <div className="space-y-8 text-white">
        <div>
          <div className="h-10 w-48 animate-pulse rounded-xl bg-zinc-900" />

          <div className="mt-3 h-5 w-72 animate-pulse rounded-lg bg-zinc-900" />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[...Array(3)].map(
            (_, index) => (
              <div
                key={index}
                className="h-40 animate-pulse rounded-3xl bg-zinc-900"
              />
            )
          )}
        </div>

        <div className="h-[450px] animate-pulse rounded-3xl bg-zinc-900" />
      </div>
    );
  }

  return (
    <div className="space-y-8 text-white">

      {/* -------------------------------- */}
      {/* Header                           */}
      {/* -------------------------------- */}

      <div>
        <h1 className="text-4xl font-black tracking-tight">
          Analytics
        </h1>

        <p className="mt-2 text-zinc-500">
          Insights about your links
          and profile performance.
        </p>
      </div>

      {/* -------------------------------- */}
      {/* Stats                            */}
      {/* -------------------------------- */}

      <div className="grid gap-4 md:grid-cols-3">

        {/* Total Links */}

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="flex items-center justify-between">
            <span className="text-zinc-500">
              Total Links
            </span>

            <FaLink className="text-lime-400" />
          </div>

          <h2 className="mt-4 text-5xl font-black text-white">
            {totalLinks}
          </h2>

          <p className="mt-2 text-sm text-zinc-600">
            Links on your profile
          </p>
        </div>

        {/* Total Clicks */}

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="flex items-center justify-between">
            <span className="text-zinc-500">
              Total Clicks
            </span>

            <FaMousePointer className="text-lime-400" />
          </div>

          <h2 className="mt-4 text-5xl font-black text-white">
            {totalClicks}
          </h2>

          <p className="mt-2 text-sm text-zinc-600">
            Across all your links
          </p>
        </div>

        {/* Average Clicks */}

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="flex items-center justify-between">
            <span className="text-zinc-500">
              Avg Clicks / Link
            </span>

            <FaChartLine className="text-lime-400" />
          </div>

          <h2 className="mt-4 text-5xl font-black text-white">
            {averageClicks}
          </h2>

          <p className="mt-2 text-sm text-zinc-600">
            Average performance
          </p>
        </div>

      </div>

      {/* -------------------------------- */}
      {/* Overall Performance              */}
      {/* -------------------------------- */}

      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">

        <div>
          <h2 className="text-2xl font-bold text-white">
            Overall Performance
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            A quick overview of your link performance.
          </p>
        </div>

        <div className="mt-8 grid gap-8 sm:grid-cols-3">

          {/* Total Clicks */}

          <div>
            <p className="text-sm text-zinc-500">
              Total clicks
            </p>

            <p className="mt-2 text-3xl font-black text-white">
              {totalClicks}
            </p>
          </div>

          {/* Most Clicked */}

          <div>
            <p className="text-sm text-zinc-500">
              Most clicked link
            </p>

            <p className="mt-2 truncate text-xl font-bold text-white">
              {mostClicked?.title ||
                "No links yet"}
            </p>
          </div>

          {/* Best Share */}

          <div>
            <p className="text-sm text-zinc-500">
              Best link share
            </p>

            <p className="mt-2 text-3xl font-black text-white">
              {bestLinkShare}%
            </p>
          </div>

        </div>
      </div>

      {/* -------------------------------- */}
      {/* Performance Over Time            */}
      {/* -------------------------------- */}

      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">

        {/* Chart Header */}

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="text-2xl font-bold text-white">
              Performance Over Time
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Track how your selected link performs over time.
            </p>
          </div>

          {/* Link Filter */}

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
      border-zinc-700
      bg-zinc-950
      px-4
      py-2.5
      text-sm
      text-white
      transition
      hover:border-zinc-500
      focus:border-zinc-400
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
      className={`shrink-0 text-xs text-zinc-500 transition-transform ${
        linkDropdownOpen
          ? "rotate-180"
          : ""
      }`}
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
          border-zinc-800
          bg-zinc-950
          p-1.5
          shadow-2xl
          shadow-black/50
        "
      >
        {/* All Links */}

        <button
          type="button"
          onClick={() => {
            setSelectedLink("all");
            setLinkDropdownOpen(false);
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
              selectedLink === "all"
                ? "bg-zinc-800 text-white"
                : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
            }
          `}
        >
          <span>All Links</span>

          {selectedLink === "all" && (
            <FaCheck className="text-xs text-lime-400" />
          )}
        </button>

        {/* Individual Links */}

        <div className="my-1 border-t border-zinc-800" />

        <div className="max-h-60 overflow-y-auto">
          {links.map((link) => {
            const isSelected =
              selectedLink === link._id;

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
                      ? "bg-zinc-800 text-white"
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                  }
                `}
              >
                <span className="truncate pr-3">
                  {link.title ||
                    "Untitled Link"}
                </span>

                {isSelected && (
                  <FaCheck className="shrink-0 text-xs text-lime-400" />
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

        {/* Chart */}

        <div className="mt-8 h-[320px] w-full sm:h-[400px]">

          {analyticsLoading ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-zinc-500">
                Loading analytics...
              </p>
            </div>
          ) : chartData.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">

                <FaChartLine
                  size={40}
                  className="mx-auto text-zinc-700"
                />

                <p className="mt-4 text-zinc-500">
                  No analytics data available yet.
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
                  stroke="#27272a"
                  vertical={false}
                />

                <XAxis
                  dataKey="date"
                  stroke="#71717a"
                  tick={{
                    fontSize: 12,
                  }}
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  stroke="#71717a"
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
                      "#09090b",
                    border:
                      "1px solid #27272a",
                    borderRadius:
                      "12px",
                    color: "#fff",
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="clicks"
                  stroke="#a3e635"
                  strokeWidth={3}
                  dot={{
                    r: 4,
                    fill: "#a3e635",
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

      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">

        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <h2 className="text-2xl font-bold text-white">
              Top Links
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Ranked by total clicks.
            </p>
          </div>

          <p className="text-sm text-zinc-600">
            {rankedLinks.length} link
            {rankedLinks.length !== 1 &&
              "s"}
          </p>

        </div>

        {/* Table */}

        <div className="mt-6 overflow-x-auto">

          <div className="min-w-[600px]">

            {/* Header */}

            <div className="grid grid-cols-[60px_1fr_120px_120px] gap-4 border-b border-zinc-800 px-4 pb-4 text-sm text-zinc-500">

              <span>#</span>

              <span>Link</span>

              <span className="text-right">
                Clicks
              </span>

              <span className="text-right">
                Share
              </span>

            </div>

            {/* Rows */}

            <div>

              {rankedLinks.length === 0 ? (
                <div className="py-12 text-center text-zinc-500">
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
                          border-zinc-800
                          px-4
                          py-5
                          last:border-b-0
                        "
                      >

                        {/* Rank */}

                        <span className="font-bold text-zinc-500">
                          {String(
                            index + 1
                          ).padStart(
                            2,
                            "0"
                          )}
                        </span>

                        {/* Link */}

                        <div className="min-w-0">

                          <p className="truncate font-semibold text-white">
                            {link.title ||
                              "Untitled Link"}
                          </p>

                          {link.url && (
                            <p className="mt-1 truncate text-xs text-zinc-600">
                              {link.url}
                            </p>
                          )}

                        </div>

                        {/* Clicks */}

                        <span className="text-right font-bold text-white">
                          {clicks}
                        </span>

                        {/* Share */}

                        <span className="text-right text-zinc-400">
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