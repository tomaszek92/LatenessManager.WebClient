import {AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PlayersService} from '../../services/players.service';
import {BehaviorSubject, noop, Subject} from 'rxjs';
import {Player} from '../../models/player.interface';
import {finalize, takeUntil} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersListComponent implements OnInit, AfterViewInit, OnDestroy {

  private ngDestroy$ = new Subject<never>();

  isLoading$ = new BehaviorSubject<boolean>(false);
  displayedColumns: string[] = ['firstName', 'lastName', 'penaltiesCount'];
  dataSource = new MatTableDataSource<Player>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private playersService: PlayersService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.isLoading$.next(true);

    this.playersService
      .getAll()
      .pipe(
        takeUntil(this.ngDestroy$),
        finalize(() => this.isLoading$.next(false))
      )
      .subscribe(players => this.dataSource.data = players);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
  }

  onRowClick(playerId: number): void {
    this.router.navigateByUrl(`/players/${playerId}`).then(noop);
  }
}
