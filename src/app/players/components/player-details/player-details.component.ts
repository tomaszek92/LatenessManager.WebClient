import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {PlayerDetails} from '../../models/player-details.interface';
import {PlayersService} from '../../services/players.service';
import {ActivatedRoute} from '@angular/router';
import {finalize, map, takeUntil} from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerDetailsComponent implements OnInit, OnDestroy {

  private ngDestroy$ = new Subject<never>();

  isLoading$ = new BehaviorSubject<boolean>(false);
  player$ = new BehaviorSubject<PlayerDetails>({} as PlayerDetails);

  constructor(
    private activatedRoute: ActivatedRoute,
    private playersService: PlayersService) {
  }

  ngOnInit(): void {
    const playerId = this.activatedRoute.snapshot.params.id;
    this.isLoading$.next(true);

    this.playersService
      .getById(playerId)
      .pipe(
        map(player => this.getPlayerWithSortedPenalties(player)),
        takeUntil(this.ngDestroy$),
        finalize(() => this.isLoading$.next(false)))
      .subscribe(player => this.player$.next(player));
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
  }

  private getPlayerWithSortedPenalties(player: PlayerDetails): PlayerDetails {
    player.penalties.sort((a, b) => moment(a.date).valueOf() - moment(b.date).valueOf());
    return player;
  }
}
