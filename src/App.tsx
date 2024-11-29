import React, { useState } from 'react';
import {
  Wallet as BanknoteIcon,
  Filter as FunnelIcon,
  Dice6 as DicesIcon,
  BarChart3,
  Plus as PlusIcon,
  ExternalLink as ExternalLinkIcon,
} from 'lucide-react';
import { Toaster } from 'sonner';
import { StatsCard } from './components/Dashboard/StatsCard';
import { BetsTable } from './components/Dashboard/BetsTable';
import { BetForm } from './components/BetForm/BetForm';
import { FullTable } from './components/FullTable/FullTable';
import { ProfitChart } from './components/Dashboard/ProfitChart';
import { showSuccess } from './utils/toast';
import type { Bet } from './types/bet';

function App() {
  const [showBetForm, setShowBetForm] = useState(false);
  const [showFullTable, setShowFullTable] = useState(false);
  const [bets, setBets] = useState<Bet[]>([]);
  const [editingBet, setEditingBet] = useState<Bet | null>(null);

  const totalInvested = bets.reduce(
    (sum, bet) => sum + bet.bet1.stake + bet.bet2.stake,
    0
  );

  const totalProfit = bets.reduce((sum, bet) => {
    const return1 = bet.bet1.isWinner ? bet.bet1.stake * bet.bet1.odds : 0;
    const return2 = bet.bet2.isWinner ? bet.bet2.stake * bet.bet2.odds : 0;
    return sum + (return1 + return2 - (bet.bet1.stake + bet.bet2.stake));
  }, 0);

  const successRate =
    bets.length > 0
      ? (bets.filter((bet) => bet.bet1.isWinner || bet.bet2.isWinner).length /
          bets.length) *
        100
      : 0;

  const handleAddBet = (newBet: Omit<Bet, 'id'>) => {
    if (editingBet) {
      setBets((prev) =>
        prev.map((bet) => (bet.id === editingBet.id ? { ...newBet, id: bet.id } : bet))
      );
      showSuccess('Aposta atualizada com sucesso!');
    } else {
      const bet: Bet = {
        ...newBet,
        id: Math.random().toString(36).substr(2, 9),
      };
      setBets((prev) => [...prev, bet]);
      showSuccess('Nova aposta registrada com sucesso!');
    }
    setShowBetForm(false);
    setEditingBet(null);
  };

  const handleEditBet = (bet: Bet) => {
    setEditingBet(bet);
    setShowBetForm(true);
  };

  const handleDeleteBet = (betId: string) => {
    setBets((prev) => prev.filter((bet) => bet.id !== betId));
    showSuccess('Aposta removida com sucesso!');
  };

  if (showFullTable) {
    return (
      <FullTable
        bets={bets}
        onBack={() => setShowFullTable(false)}
        onDeleteBet={handleDeleteBet}
        onEditBet={handleEditBet}
      />
    );
  }

  return (
    <div className="min-h-screen bg-dark-200 text-white p-6">
      <Toaster position="top-right" theme="dark" />
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-primary-300">Entradas</h1>
          <button
            onClick={() => setShowBetForm(true)}
            className="flex items-center px-4 py-2 bg-primary-600 rounded-lg hover:bg-primary-500 transition-colors"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Entrada
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Aplicado"
            value={`R$ ${totalInvested.toFixed(2)}`}
            icon={BanknoteIcon}
          />
          <StatsCard
            title="Lucro"
            value={`R$ ${totalProfit.toFixed(2)}`}
            icon={FunnelIcon}
            trend={totalProfit > 0 ? 8.2 : -8.2}
          />
          <StatsCard
            title="Entradas"
            value={bets.length}
            icon={DicesIcon}
          />
          <StatsCard
            title="Entradas Assertivas"
            value={`${successRate.toFixed(1)}%`}
            icon={BarChart3}
            progressValue={successRate}
          />
        </div>

        <div className="bg-dark-100 rounded-lg p-6 mb-8">
          <BetsTable 
            bets={bets} 
            onEditBet={handleEditBet}
            onDeleteBet={handleDeleteBet}
          />
        </div>

        <div className="bg-dark-100 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-primary-300">Lucros/Prejuízos</h2>
          <ProfitChart bets={bets} />
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={() => setShowFullTable(true)}
            className="text-primary-400 hover:text-primary-300 transition-colors"
          >
            Tabela Completa
          </button>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-primary-400 hover:text-primary-300 transition-colors"
          >
            Acesse o Site
            <ExternalLinkIcon className="w-4 h-4 ml-2" />
          </a>
        </div>
      </div>

      {showBetForm && (
        <BetForm 
          onClose={() => {
            setShowBetForm(false);
            setEditingBet(null);
          }} 
          onSubmit={handleAddBet}
          editingBet={editingBet}
        />
      )}
    </div>
  );
}

export default App;