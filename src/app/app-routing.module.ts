import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview/components/overview/overview.component';
import { PlayUIComponent } from './play/components/play-ui/play-ui.component';
import { TestComponent } from './test/test/test.component';

const routes: Routes = [
  {
    path: 'play',
    component: PlayUIComponent
  },
  {
    path: 'overview',
    component: OverviewComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'play'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
