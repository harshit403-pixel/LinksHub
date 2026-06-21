import { useEffect, useState } from "react";
import {
  FaLink,
  FaMousePointer,
  FaTrophy,
} from "react-icons/fa";

import { useMyLinks } from "../links/useMyLinks";
import { useLinkAnalytics } from "../analytics/useLinkAnalytics";

function Analytics() {
  const { data, isLoading } =
    useMyLinks();

  const links = data?.links || [];

  const [selectedLink, setSelectedLink] =
    useState("");

  useEffect(() => {
    if (
      links.length > 0 &&
      !selectedLink
    ) {
      setSelectedLink(links[0]._id);
    }
  }, [links, selectedLink]);

  const {
    data: analyticsData,
  } = useLinkAnalytics(
    selectedLink
  );

  const analytics =
    analyticsData?.analytics || [];

  const totalLinks = links.length;

  const totalClicks = links.reduce(
    (sum, link) => sum + link.clicks,
    0
  );

  const averageClicks =
    links.length > 0
      ? (
          totalClicks / links.length
        ).toFixed(1)
      : 0;

  const rankedLinks = [...links].sort(
    (a, b) => b.clicks - a.clicks
  );

  const mostClicked =
    rankedLinks[0] || null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-zinc-500">
          Loading analytics...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-5xl font-black text-white">
            Analytics
          </h1>

          <p className="text-zinc-500 mt-2">
            Insights about your links
            and profile performance.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <div className="flex justify-between">
              <span className="text-zinc-500">
                Total Links
              </span>

              <FaLink className="text-lime-400" />
            </div>

            <h2 className="text-white text-5xl font-black mt-4">
              {totalLinks}
            </h2>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <div className="flex justify-between">
              <span className="text-zinc-500">
                Total Clicks
              </span>

              <FaMousePointer className="text-lime-400" />
            </div>

            <h2 className="text-white text-5xl font-black mt-4">
              {totalClicks}
            </h2>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <div className="flex justify-between">
              <span className="text-zinc-500">
                Avg Clicks
              </span>

              <FaMousePointer className="text-lime-400" />
            </div>

            <h2 className="text-white text-5xl font-black mt-4">
              {averageClicks}
            </h2>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <div className="flex justify-between">
              <span className="text-zinc-500">
                Top Link
              </span>

              <FaTrophy className="text-lime-400" />
            </div>

            <h2 className="text-white text-xl font-bold mt-4">
              {mostClicked?.title ||
                "None"}
            </h2>

            <p className="text-zinc-500 mt-2">
              {mostClicked?.clicks || 0}{" "}
              clicks
            </p>
          </div>
        </div>

       {/* Leaderboard */}
<div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-4 sm:p-6">
  <h2 className="text-white text-xl sm:text-2xl font-bold mb-6">
    Top Performing Links
  </h2>

  <div className="space-y-4">
    {rankedLinks.map(
      (link, index) => (
        <div
          key={link._id}
          className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-3
            border-b
            border-zinc-800
            pb-4
          "
        >
          <div className="flex gap-3 min-w-0">
            <span className="text-lime-400 font-bold shrink-0">
              #{index + 1}
            </span>

            <div className="min-w-0">
              <p className="text-white font-medium truncate">
                {link.title}
              </p>

              <p className="text-zinc-500 text-sm truncate">
                {link.url}
              </p>
            </div>
          </div>

          <span className="text-lime-400 font-bold text-sm sm:text-base self-start sm:self-center">
            {link.clicks} clicks
          </span>
        </div>
      )
    )}
  </div>
</div>

        {/* 7 Day Analytics */}
        <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <h2 className="text-white text-2xl font-bold">
              Last 7 Days
            </h2>

            <select
              value={selectedLink}
              onChange={(e) =>
                setSelectedLink(
                  e.target.value
                )
              }
              className="
                bg-zinc-800
                border
                border-zinc-700
                rounded-xl
                px-4
                py-2
                text-white
                outline-none
              "
            >
              {links.map((link) => (
                <option
                  key={link._id}
                  value={link._id}
                >
                  {link.title}
                </option>
              ))}
            </select>
          </div>

          {analytics.length === 0 ? (
            <p className="text-zinc-500">
              No analytics available yet.
            </p>
          ) : (
            <div className="space-y-5">
              {analytics.map((day) => (
                <div
                  key={day._id}
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-zinc-400">
                      {day._id}
                    </span>

                    <span className="text-white font-medium">
                      {day.clicks} clicks
                    </span>
                  </div>

                  <div className="h-3 rounded-full bg-zinc-800 overflow-hidden">
                    <div
                      className="h-full bg-lime-400 rounded-full"
                      style={{
                        width: `${Math.min(
                          day.clicks * 20,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Analytics;