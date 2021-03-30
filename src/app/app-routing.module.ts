import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlayersListComponent} from './players/components/players-list/players-list.component';
import {PlayerDetailsComponent} from './players/components/player-details/player-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/players',
    pathMatch: 'full'
  },
  {
    path: 'players',
    component: PlayersListComponent
  },
  {
    path: 'players/:id',
    component: PlayerDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
