import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { format } from 'date-fns';
import type { Bet } from '../../types/bet';

interface ProfitChartProps {
  bets: Bet[];
}

export const ProfitChart: React.FC<ProfitChartProps> = ({ bets }) => {
  const data = bets.map((bet) => {
    const return1 = bet.bet1.isWinner ? bet.bet1.stake * bet.bet1.odds : 0;
    const return2 = bet.bet2.isWinner ? bet.bet2.stake * bet.bet2.odds : 0;
    const totalStake = bet.bet1.stake + bet.bet2.stake;
    const profit = return1 + return2 - totalStake;

    return {
      date: format(bet.registeredAt, 'dd/MM'),
      profit: profit,
    };
  });

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="date"
            stroke="#9CA3AF"
            tick={{ fill: '#9CA3AF' }}
          />
          <YAxis
            stroke="#9CA3AF"
            tick={{ fill: '#9CA3AF' }}
            tickFormatter={(value) => `R$ ${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2937',
              border: 'none',
              borderRadius: '0.5rem',
              color: '#F3F4F6',
            }}
            formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Lucro']}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="profit"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={{ fill: '#3B82F6', r: 4 }}
            activeDot={{ r: 6 }}
            name="Lucro"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};