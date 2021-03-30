import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Player} from '../models/player.interface';
import {environment} from '../../../environments/environment';
import {PlayerDetails} from '../models/player-details.interface';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Player[]> {
    return this.httpClient.get<Player[]>('players');
  }

  getById(playerId: number): Observable<PlayerDetails> {
    return this.httpClient.get<PlayerDetails>(`players/${playerId}`);
  }

  private getApiUrl(url: string): string {
    return `${environment.apiUrl}/${url}`;
  }
}
