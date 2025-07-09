import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const data = [
  { year: 2000, euETS: 0, finlandTax: 16.39 },
  { year: 2001, euETS: 0, finlandTax: 15.15 },
  { year: 2002, euETS: 0, finlandTax: 14.97 },
  { year: 2003, euETS: 0, finlandTax: 19.65 },
  { year: 2004, euETS: 0, finlandTax: 22.24 },
  { year: 2005, euETS: 19.05, finlandTax: 23.39 },
  { year: 2006, euETS: 32.35, finlandTax: 21.85 },
  { year: 2007, euETS: 1.25, finlandTax: 24.04 },
  { year: 2008, euETS: 34.48, finlandTax: 31.02 },
  { year: 2009, euETS: 15.58, finlandTax: 27.05 },
  { year: 2010, euETS: 17.57, finlandTax: 27.49 },
  { year: 2011, euETS: 23.76, finlandTax: 70.70 },
  { year: 2012, euETS: 9.32, finlandTax: 80.14 },
  { year: 2013, euETS: 6.04, finlandTax: 64.02 },
  { year: 2014, euETS: 6.75, finlandTax: 79.98 },
  { year: 2015, euETS: 7.69, finlandTax: 62.38 },
  { year: 2016, euETS: 5.92, finlandTax: 66.31 },
  { year: 2017, euETS: 5.64, finlandTax: 62.01 },
  { year: 2018, euETS: 16.28, finlandTax: 89.94 },
  { year: 2019, euETS: 24.50, finlandTax: 86.51 },
  { year: 2020, euETS: 18.53, finlandTax: 84.20 },
  { year: 2021, euETS: 49.77, finlandTax: 90.44 },
  { year: 2022, euETS: 86.52, finlandTax: 85.10 },
  { year: 2023, euETS: 96.29, finlandTax: 83.74 },
  { year: 2024, euETS: 61.30, finlandTax: 99.98 },
  { year: 2025, euETS: 70.30, finlandTax: 66.89 }
];

function LineGraph() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 30, right: 30, left: 0, bottom: 5 }}>
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis
          dataKey="year"
          stroke="#666666"
          tick={{ fill: "#FFFFFF" }}
        />
        <YAxis
          stroke="#666666"
          tick={{ fill: "#FFFFFF" }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "transparent",
            border: "none",
            boxShadow: "none",
            color: "#FFD700",
            fontWeight: "bold"
          }}
          itemStyle={{
            color: "#FFD700",
            backgroundColor: "transparent"
          }}
          labelStyle={{
            color: "#FFD700",
            backgroundColor: "transparent"
          }}
          cursor={{ stroke: "#FFD700", strokeWidth: 2 }}
        />
        <Legend />
        <Line
          dataKey="euETS"
          stroke="#0EE818"
          strokeWidth={1}
          dot={{ fill: "#0A6B53", r: 3 }}
          activeDot={{ r: 8 }}
          animationBegin={0}
          animationDuration={1500}
          animationEasing="ease-out"
        />
           <Line
          dataKey="finlandTax"
          stroke="#F60002"
          strokeWidth={1}
          dot={{ fill: "##D82A39", r: 3 }}
          activeDot={{ r: 8 }}
          animationBegin={0}
          animationDuration={1500}
          animationEasing="ease-out"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
export default LineGraph;