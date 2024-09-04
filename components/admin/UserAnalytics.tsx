import React, { useEffect } from 'react';
import { useGetUserAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const UserAnalytics = () => {
    const { data } = useGetUserAnalyticsQuery({});

    const chartData = data?.data?.last12Months?.map((item: any) => ({
        month: item.month,
        count: item.count,
    })) || [];

    return (
        <div className='bg-[#F7F1FF] bg-no-repeat dark:bg-slate-950'>
            <div className='space-y-4 mb-4  ' >
                <h1 className='font-bold text-4xl dark:text-slate-100 text-slate-800'>User Analytics</h1>
                <h2 className='font-semibold text-2xl dark:text-slate-100 text-slate-700'>Last 12 Months</h2>
            </div>
            <div style={{ width: '90%', height: '400px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={chartData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default UserAnalytics;
