export interface Bet {
  id: string;
  registeredAt: Date;
  event: {
    homeTeam: string;
    awayTeam: string;
    sport: string;
    league: string;
    date: Date;
    time: string;
  };
  bet1: {
    bookmaker: string;
    stake: number;
    odds: number;
    isWinner: boolean;
  };
  bet2: {
    bookmaker: string;
    stake: number;
    odds: number;
    isWinner: boolean;
  };
}