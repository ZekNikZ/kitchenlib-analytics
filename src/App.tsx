import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type Data = {
  date: string;
  totalUsers: number;
  klUsers: Record<string, number>;
  plateUpUsers: Record<string, number>;
}[];

type ChartColor = {
  stroke: string;
  fill: string;
}

const colors: ChartColor[] = [
  { stroke: "#8884d8", fill: "#8884d8" },
  { stroke: "#82ca9d", fill: "#82ca9d" },
  { stroke: "#ffc658", fill: "#ffc658" },
];

// Load this from an API call
const data: Data = [
  {
    date: "2023-04-26",
    totalUsers: 1000,
    klUsers: {
      "0.6.5": 300,
      "0.6.6": 500
    },
    plateUpUsers: {
      "1.0": 100,
      "2.0": 200,
      "3.0": 300,
    }
  },
  {
    date: "2023-04-27",
    totalUsers: 1200,
    klUsers: {
      "0.6.5": 200,
      "0.6.6": 475
    },
    plateUpUsers: {
      "1.0": 300,
      "2.0": 250,
      "3.0": 100,
    }
  },
  {
    date: "2023-04-28",
    totalUsers: 800,
    klUsers: {
      "0.6.5": 150,
      "0.6.6": 300
    },
    plateUpUsers: {
      "1.0": 200,
      "2.0": 200,
      "3.0": 200,
    }
  }
];

function App() {
  const totalData = [];

  const klData = [];
  const klKeys: string[] = [];

  const plateUpData = [];
  const plateUpKeys: string[] = [];

  for (const entry of data) {
    totalData.push({
      date: entry.date,
      "Total Users": entry.totalUsers
    });
    
    for (const key of Object.keys(entry.klUsers)) {
      if (!klKeys.includes(key)) {
        klKeys.push(key);
      }
    }
    
    for (const key of Object.keys(entry.plateUpUsers)) {
      if (!plateUpKeys.includes(key)) {
        plateUpKeys.push(key);
      }
    }
  }

  const klBase: Record<string, number> = {};
  for (const key of klKeys) {
    klBase[key] = 0;
  }
  for (const entry of data) {
    klData.push({
      date: entry.date,
      ...klBase,
      ...entry.klUsers
    });
  }

  const plateUpBase: Record<string, number> = {};
  for (const key of klKeys) {
    plateUpBase[key] = 0;
  }
  for (const entry of data) {
    plateUpData.push({
      date: entry.date,
      ...plateUpBase,
      ...entry.plateUpUsers
    });
  }

  return (
    <div className="App">
      {/* Total Users */}
      <h2>Total Users</h2>
      <div className="chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={totalData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="Total Users" stackId="1" stroke={colors[0].stroke} fill={colors[0].fill} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* KL Users */}
      <h2>KitchenLib Users</h2>
      <div className="chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={klData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            {klKeys.map((key, i) => <Area key={i} type="monotone" dataKey={key} stackId="1" stroke={colors[i]?.stroke} fill={colors[i]?.fill} />)}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* PlateUp! Users */}
      <h2>PlateUp! Users</h2>
      <div className="chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={plateUpData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            {plateUpKeys.map((key, i) => <Area key={i} type="monotone" dataKey={key} stackId="1" stroke={colors[i]?.stroke} fill={colors[i]?.fill} />)}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default App;
