import React from 'react';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import type { Bet } from '../../types/bet';

interface FullTableProps {
  bets: Bet[];
  onBack: () => void;
  onDeleteBet: (betId: string) => void;
}

export const FullTable: React.FC<FullTableProps> = ({
  bets,
  onBack,
  onDeleteBet,
}) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-gray-300 hover:text-white"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Painel
        </button>
        <button
          onClick={() => {
            // Implement delete selected functionality
          }}
          className="flex items-center text-red-500 hover:text-red-400"
        >
          <Trash2 className="w-5 h-5 mr-2" />
          Excluir Linha Selecionada
        </button>
      </div>

      <div className="overflow-x-auto bg-gray-800 rounded-lg">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs uppercase bg-gray-700">
            <tr>
              <th className="px-6 py-3">Registrada em</th>
              <th className="px-6 py-3">Hora</th>
              <th className="px-6 py-3">Time Casa</th>
              <th className="px-6 py-3">Time Visitante</th>
              <th className="px-6 py-3">Esporte</th>
              <th className="px-6 py-3">Liga</th>
              <th className="px-6 py-3">Casa (Bet 1)</th>
              <th className="px-6 py-3">Casa (Bet 2)</th>
              <th className="px-6 py-3">Odd (Bet 1)</th>
              <th className="px-6 py-3">Odd (Bet 2)</th>
              <th className="px-6 py-3">Aposta (Bet 1)</th>
              <th className="px-6 py-3">Aposta (Bet 2)</th>
              <th className="px-6 py-3">Retorno</th>
              <th className="px-6 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {bets.map((bet) => (
              <tr key={bet.id} className="border-b border-gray-700">
                <td className="px-6 py-4">
                  {format(bet.registeredAt, 'dd/MM/yyyy')}
                </td>
                <td className="px-6 py-4">
                  {format(bet.registeredAt, 'HH:mm')}
                </td>
                <td className="px-6 py-4">{bet.event.homeTeam}</td>
                <td className="px-6 py-4">{bet.event.awayTeam}</td>
                <td className="px-6 py-4">{bet.event.sport}</td>
                <td className="px-6 py-4">{bet.event.league}</td>
                <td className="px-6 py-4">{bet.bet1.bookmaker}</td>
                <td className="px-6 py-4">{bet.bet2.bookmaker}</td>
                <td className="px-6 py-4">{bet.bet1.odds}</td>
                <td className="px-6 py-4">{bet.bet2.odds}</td>
                <td className="px-6 py-4">R$ {bet.bet1.stake.toFixed(2)}</td>
                <td className="px-6 py-4">R$ {bet.bet2.stake.toFixed(2)}</td>
                <td className="px-6 py-4">
                  R$ {(bet.bet1.isWinner
                    ? bet.bet1.stake * bet.bet1.odds
                    : bet.bet2.stake * bet.bet2.odds
                  ).toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onDeleteBet(bet.id)}
                    className="text-red-500 hover:text-red-400"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}