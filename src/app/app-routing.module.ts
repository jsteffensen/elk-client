import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialDashboardComponent } from './material-dashboard/material-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
	{ path: '', component: DashboardComponent },
	{ path: 'app', component: MaterialDashboardComponent },
	{ path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
