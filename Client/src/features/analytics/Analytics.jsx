import { useEffect, useState } from "react";
import {
  FaLink,
  FaMousePointer,
  FaTrophy,
} from "react-icons/fa";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import {
  Area,
  AreaChart,
} from "recharts";

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

    const topLinkPercentage =
  totalClicks > 0
    ? (
        ((mostClicked?.clicks || 0) /
          totalClicks) *
        100
      ).toFixed(1)
    : 0;

const pieData = links.map(
  (link) => ({
    name: link.title,
    value: link.clicks,
  })
);

const COLORS = [
  "#a3e635",
  "#3b82f6",
  "#8b5cf6",
  "#f43f5e",
  "#f59e0b",
];

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
        <div className="grid md:grid-cols-3 gap-4">
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

          
        </div>

        <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
  <div className="flex items-center gap-3 mb-4">
    <FaTrophy className="text-lime-400 text-2xl" />

    <h2 className="text-white text-2xl font-bold">
      Champion Link
    </h2>
  </div>

  <h3 className="text-white text-4xl font-black">
    {mostClicked?.title || "None"}
  </h3>

  <p className="text-zinc-400 mt-3">
    {mostClicked?.clicks || 0} clicks •{" "}
    {topLinkPercentage}% of total traffic
  </p>
</div>



<div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
  <div className="flex items-center justify-between mb-8">
    <h2 className="text-white text-2xl font-bold">
      Traffic Distribution
    </h2>

    <span className="text-zinc-500">
      {totalClicks} Total Clicks
    </span>
  </div>

  <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
    
    {/* Chart */}
    <div className="w-full lg:w-auto">
      <ResponsiveContainer
        width={300}
        height={300}
      >
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            innerRadius={80}
            outerRadius={120}
            paddingAngle={3}
          >
            {pieData.map(
              (_, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index %
                        COLORS.length
                    ]
                  }
                />
              )
            )}
          </Pie>

          <Tooltip />

          <text
            x="50%"
            y="48%"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize="28"
            fontWeight="700"
          >
            {totalClicks}
          </text>

          <text
            x="50%"
            y="58%"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#71717a"
            fontSize="14"
          >
            Clicks
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>

    {/* Legend */}
    <div className="w-full max-w-md space-y-4">
      {pieData
        .sort(
          (a, b) =>
            b.value - a.value
        )
        .map(
          (item, index) => {
            const percentage =
              totalClicks > 0
                ? (
                    (item.value /
                      totalClicks) *
                    100
                  ).toFixed(1)
                : 0;

            return (
              <div
                key={`${item.name || "untitled"}-${index}`}
                className="
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  border
                  border-zinc-800
                  p-4
                "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor:
                        COLORS[
                          index %
                            COLORS.length
                        ],
                    }}
                  />

                  <span className="text-white font-medium">
                    {item.name}
                  </span>
                </div>

                <div className="text-right">
                  <p className="text-white font-bold">
                    {item.value}
                  </p>

                  <p className="text-zinc-500 text-sm">
                    {percentage}%
                  </p>
                </div>
              </div>
            );
          }
        )}
    </div>
  </div>
</div>
       

        {/* 7 Day Analytics */}
<div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
  <div className="flex items-center justify-between mb-8">
    <div>
      <h2 className="text-white text-2xl font-bold">
        Link Performance
      </h2>

      <p className="text-zinc-500 mt-1">
        Ranked by total clicks
      </p>
    </div>

    <div className="text-right">
      <p className="text-zinc-500 text-sm">
        Best Performer
      </p>

      <p className="text-white font-bold">
        {mostClicked?.title}
      </p>
    </div>
  </div>

  {/* chart here */}
       <ResponsiveContainer
  width="100%"
  height={400}
>
  <BarChart
    data={rankedLinks}
    layout="vertical"
  >
    <CartesianGrid
      stroke="#27272a"
      horizontal={false}
    />

    <XAxis
      type="number"
      stroke="#71717a"
    />

    <YAxis
      dataKey="title"
      type="category"
      stroke="#71717a"
      width={100}
    />

    <Tooltip />

    <Bar
      dataKey="clicks"
      fill="#a3e635"
      radius={[0, 8, 8, 0]}
    />
  </BarChart>
</ResponsiveContainer>
</div>
      </div>
    </div>
  );
}

export default Analytics;