import React from 'react';
import { format } from 'date-fns';
import type { Bet } from '../../types/bet';

interface BetsTableProps {
  bets: Bet[];
  onRowClick?: (bet: Bet) => void;
}

export const BetsTable: React.FC<BetsTableProps> = ({ bets, onRowClick }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-300">
        <thead className="text-xs uppercase bg-gray-800">
          <tr>
            <th className="px-6 py-3">Registrada em</th>
            <th className="px-6 py-3">Evento</th>
            <th className="px-6 py-3">Bet 1</th>
            <th className="px-6 py-3">Bet 2</th>
            <th className="px-6 py-3">Aplicado</th>
            <th className="px-6 py-3">Retorno</th>
            <th className="px-6 py-3">Lucro</th>
            <th className="px-6 py-3">%</th>
          </tr>
        </thead>
        <tbody>
          {bets.map((bet) => {
            const totalStake = bet.bet1.stake + bet.bet2.stake;
            const return1 = bet.bet1.isWinner ? bet.bet1.stake * bet.bet1.odds : 0;
            const return2 = bet.bet2.isWinner ? bet.bet2.stake * bet.bet2.odds : 0;
            const totalReturn = return1 + return2;
            const profit = totalReturn - totalStake;
            const profitPercentage = ((profit / totalStake) * 100).toFixed(2);

            return (
              <tr
                key={bet.id}
                className="border-b border-gray-700 hover:bg-gray-700 cursor-pointer"
                onClick={() => onRowClick?.(bet)}
              >
                <td className="px-6 py-4">
                  {format(bet.registeredAt, 'dd/MM/yyyy HH:mm')}
                </td>
                <td className="px-6 py-4">
                  {bet.event.homeTeam} vs {bet.event.awayTeam}
                </td>
                <td className="px-6 py-4">
                  {bet.bet1.bookmaker} ({bet.bet1.odds})
                </td>
                <td className="px-6 py-4">
                  {bet.bet2.bookmaker} ({bet.bet2.odds})
                </td>
                <td className="px-6 py-4">R$ {totalStake.toFixed(2)}</td>
                <td className="px-6 py-4">R$ {totalReturn.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={profit >= 0 ? 'text-green-500' : 'text-red-500'}>
                    R$ {profit.toFixed(2)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={profit >= 0 ? 'text-green-500' : 'text-red-500'}>
                    {profitPercentage}%
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}