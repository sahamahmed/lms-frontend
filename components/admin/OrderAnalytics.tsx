import React, { useEffect } from 'react';
import { useGetOrderAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const OrderAnalytics = () => {
  const { data } = useGetOrderAnalyticsQuery({});

  const chartData = data?.data?.last12Months?.map((item: any) => ({
    month: item.month,
    count: item.count,
  })) || [];

  return (
    <div>
      <div className='space-y-4 mb-4' >
        <h1 className='font-bold text-4xl dark:text-slate-100 text-slate-800'>Order Analytics</h1>
        <h2 className='font-semibold text-2xl dark:text-slate-100 text-slate-700'>Last 12 Months</h2>
      </div>
      <div style={{ width: '90%', height: '400px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={chartData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OrderAnalytics;
