import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import clsx from 'clsx';
import type { Bet } from '../../types/bet';

interface BetFormProps {
  onClose: () => void;
  onSubmit: (bet: Omit<Bet, 'id'>) => void;
  editingBet?: Bet | null;
}

export const BetForm: React.FC<BetFormProps> = ({ onClose, onSubmit, editingBet }) => {
  const [formData, setFormData] = useState({
    event: {
      date: '',
      time: '',
      sport: '',
      homeTeam: '',
      awayTeam: '',
      league: '',
    },
    bet1: {
      bookmaker: '',
      stake: '',
      odds: '',
      isWinner: false,
    },
    bet2: {
      bookmaker: '',
      stake: '',
      odds: '',
      isWinner: false,
    },
  });

  useEffect(() => {
    if (editingBet) {
      setFormData({
        event: {
          ...editingBet.event,
          date: new Date(editingBet.event.date).toISOString().split('T')[0],
        },
        bet1: {
          ...editingBet.bet1,
          stake: editingBet.bet1.stake.toString(),
          odds: editingBet.bet1.odds.toString(),
        },
        bet2: {
          ...editingBet.bet2,
          stake: editingBet.bet2.stake.toString(),
          odds: editingBet.bet2.odds.toString(),
        },
      });
    }
  }, [editingBet]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bet: Omit<Bet, 'id'> = {
      registeredAt: new Date(),
      event: {
        ...formData.event,
        date: new Date(formData.event.date),
      },
      bet1: {
        ...formData.bet1,
        stake: Number(formData.bet1.stake),
        odds: Number(formData.bet1.odds),
      },
      bet2: {
        ...formData.bet2,
        stake: Number(formData.bet2.stake),
        odds: Number(formData.bet2.odds),
      },
    };
    onSubmit(bet);
  };

  const getBetSectionClass = (isWinner: boolean) => 
    clsx('p-4 rounded-lg mb-4 transition-colors', {
      'bg-green-900/20': isWinner,
      'bg-red-900/20': !isWinner && (formData.bet1.isWinner || formData.bet2.isWinner),
      'bg-dark-100': !formData.bet1.isWinner && !formData.bet2.isWinner,
    });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-dark-200 rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-primary-300">
            {editingBet ? 'Editar Aposta' : 'Nova Aposta'}
          </h2>
          <button onClick={onClose} className="text-primary-400 hover:text-primary-300">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-primary-300 mb-1">
                Data
              </label>
              <input
                type="date"
                className="w-full bg-dark-100 border-dark-300 rounded-md p-2 text-white"
                value={formData.event.date}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    event: { ...prev.event, date: e.target.value },
                  }))
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-300 mb-1">
                Hora
              </label>
              <input
                type="time"
                className="w-full bg-dark-100 border-dark-300 rounded-md p-2 text-white"
                value={formData.event.time}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    event: { ...prev.event, time: e.target.value },
                  }))
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-primary-300 mb-1">
                Time da Casa
              </label>
              <input
                type="text"
                className="w-full bg-dark-100 border-dark-300 rounded-md p-2 text-white"
                value={formData.event.homeTeam}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    event: { ...prev.event, homeTeam: e.target.value },
                  }))
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-300 mb-1">
                Time Visitante
              </label>
              <input
                type="text"
                className="w-full bg-dark-100 border-dark-300 rounded-md p-2 text-white"
                value={formData.event.awayTeam}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    event: { ...prev.event, awayTeam: e.target.value },
                  }))
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-primary-300 mb-1">
                Esporte
              </label>
              <input
                type="text"
                className="w-full bg-dark-100 border-dark-300 rounded-md p-2 text-white"
                value={formData.event.sport}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    event: { ...prev.event, sport: e.target.value },
                  }))
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-300 mb-1">
                Liga
              </label>
              <input
                type="text"
                className="w-full bg-dark-100 border-dark-300 rounded-md p-2 text-white"
                value={formData.event.league}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    event: { ...prev.event, league: e.target.value },
                  }))
                }
              />
            </div>
          </div>

          <div className={getBetSectionClass(formData.bet1.isWinner)}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium text-primary-300">Bet 1</h3>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.bet1.isWinner}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      bet1: { ...prev.bet1, isWinner: e.target.checked },
                      bet2: { ...prev.bet2, isWinner: false },
                    }))
                  }
                  className="form-checkbox h-5 w-5 text-primary-600 rounded"
                />
                <span className="ml-2 text-sm text-primary-300">Vencedora</span>
              </label>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary-300 mb-1">
                  Casa
                </label>
                <input
                  type="text"
                  className="w-full bg-dark-100 border-dark-300 rounded-md p-2 text-white"
                  value={formData.bet1.bookmaker}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      bet1: { ...prev.bet1, bookmaker: e.target.value },
                    }))
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-300 mb-1">
                  Aposta
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full bg-dark-100 border-dark-300 rounded-md p-2 text-white"
                  value={formData.bet1.stake}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      bet1: { ...prev.bet1, stake: e.target.value },
                    }))
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-300 mb-1">
                  Odd
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full bg-dark-100 border-dark-300 rounded-md p-2 text-white"
                  value={formData.bet1.odds}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      bet1: { ...prev.bet1, odds: e.target.value },
                    }))
                  }
                />
              </div>
            </div>
          </div>

          <div className={getBetSectionClass(formData.bet2.isWinner)}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium text-primary-300">Bet 2</h3>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.bet2.isWinner}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      bet1: { ...prev.bet1, isWinner: false },
                      bet2: { ...prev.bet2, isWinner: e.target.checked },
                    }))
                  }
                  className="form-checkbox h-5 w-5 text-primary-600 rounded"
                />
                <span className="ml-2 text-sm text-primary-300">Vencedora</span>
              </label>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary-300 mb-1">
                  Casa
                </label>
                <input
                  type="text"
                  className="w-full bg-dark-100 border-dark-300 rounded-md p-2 text-white"
                  value={formData.bet2.bookmaker}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      bet2: { ...prev.bet2, bookmaker: e.target.value },
                    }))
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-300 mb-1">
                  Aposta
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full bg-dark-100 border-dark-300 rounded-md p-2 text-white"
                  value={formData.bet2.stake}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      bet2: { ...prev.bet2, stake: e.target.value },
                    }))
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-300 mb-1">
                  Odd
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full bg-dark-100 border-dark-300 rounded-md p-2 text-white"
                  value={formData.bet2.odds}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      bet2: { ...prev.bet2, odds: e.target.value },
                    }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-primary-300 bg-dark-100 rounded-md hover:bg-dark-300 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-500 transition-colors"
            >
              {editingBet ? 'Atualizar' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};