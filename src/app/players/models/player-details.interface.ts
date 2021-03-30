import {Penalty} from './penalty.interface';

export interface PlayerDetails {
  id: number;
  firstName: string;
  lastName: string;
  penalties: Penalty[];
}
