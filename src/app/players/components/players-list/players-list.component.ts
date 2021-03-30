import {AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PlayersService} from '../../services/players.service';
import {Subject} from 'rxjs';
import {Player} from '../../models/player.interface';
import {takeUntil} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersListComponent implements OnInit, AfterViewInit, OnDestroy {

  ngDestroy$ = new Subject<never>();
  displayedColumns: string[] = ['firstName', 'lastName', 'penaltiesCount'];
  dataSource = new MatTableDataSource<Player>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private playersService: PlayersService) { }

  ngOnInit(): void {
    this.playersService
      .getAll()
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe(players => this.dataSource.data = players);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
  }
}
