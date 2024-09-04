import React from "react";
import { useGetCourseAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red"];

const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  }
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
  Z`;
};

const TriangleBar = (props:any) => {
  const { fill, x, y, width, height } = props;
  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const CourseAnalytics = () => {
  const { data } = useGetCourseAnalyticsQuery({});

  const chartData =
    data?.data?.last12Months?.map((item: any) => ({
      month: item.month,
      count: item.count,
    })) || [];

  return (
    <div className="min-h-screen w-full bg-[#F7F1FF] bg-no-repeat dark:bg-slate-950">
      <div className="space-y-4 mb-4">
        <h1 className="font-bold text-4xl dark:text-slate-100 text-slate-800">
          Course Analytics
        </h1>
        <h2 className="font-semibold text-2xl dark:text-slate-100 text-slate-700">
          Last 12 Months
        </h2>
      </div>
      <div style={{ width: "85%", height: "400px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Bar
              dataKey="count"
              fill="#8884d8"
              shape={<TriangleBar />}
              label={{ position: "top" }}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CourseAnalytics;
