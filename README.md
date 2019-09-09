# elk-client

Generate new Angular app in CLI: `ng new elk-client`<br />
(select yes to Angular routing and choose CSS).

Test that it can be run in browser:
`ng s -o`

Add Angular Material: `ng add @angular/material`<br />
(select indigo/pink theme, include HammerJS for gesture support and select yes to browser animations).

Generate Material wrapper module: `ng g m MaterialWrapper`.

set content of \src\app\material-wrapper\material-wrapper.module.ts to:

```
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';

@NgModule({
  exports: [
			MatGridListModule, 
			MatCardModule, 
			MatMenuModule, 
			MatIconModule, 
			MatButtonModule, 
			MatFormFieldModule,
			MatInputModule,
			MatRippleModule,
			MatToolbarModule, 
			MatTreeModule, 
			MatSidenavModule, 
			MatListModule,
			MatDialogModule,
			MatProgressBarModule,
			MatStepperModule
			],
})

export class MaterialWrapperModule { }

```

Set \src\app\app.module.ts to:

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialWrapperModule } from './material-wrapper/material-wrapper.module';
import { MaterialDashboardComponent } from './material-dashboard/material-dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialNavigationComponent } from './material-navigation/material-navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    MaterialDashboardComponent,
    MaterialNavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialWrapperModule,
    LayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

Set \src\app\app-routing.module.ts to:

```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialDashboardComponent } from './material-dashboard/material-dashboard.component';

const routes: Routes = [
	{ path: '', component: MaterialDashboardComponent },
	{ path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

```

Set \src\app\appcomponent.html to:

```
<mat-sidenav-container class="sidenav-container">
  <mat-sidenav #drawer class="sidenav" fixedInViewport="true"
      [attr.role]="(isHandset$ | async) ? 'dialog' : 'navigation'"
      mode="over"
      [opened]="false">
    <mat-toolbar>Organization</mat-toolbar>
  </mat-sidenav>
  <mat-sidenav-content>
    <mat-toolbar color="primary" class="mat-elevation-z4">
      <button
        type="button"
        aria-label="Toggle sidenav"
        mat-icon-button
        (click)="drawer.toggle()">
        <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
      </button>
	  <button mat-button routerLink="/">Home</button>
	  <button mat-button routerLink="lists">Lists</button>
      <!-- <span>realtime-grid</span> -->
	  <span class="mat-spacer"></span>
	  
		<button mat-icon-button [matMenuTriggerFor]="menu">
		  <mat-icon>more_vert</mat-icon>
		</button>
		<mat-menu #menu="matMenu">
		  <button mat-menu-item disabled>
			<mat-icon>voicemail</mat-icon>
			<span>Check voicemail</span>
		  </button>
		  <button mat-menu-item>
			<mat-icon>notifications_off</mat-icon>
			<span>Disable alerts</span>
		  </button>
		</mat-menu>
    </mat-toolbar>
	<!-- <mat-progress-bar mode="indeterminate" color="warn" *ngIf="isLoading"></mat-progress-bar> -->
	<router-outlet></router-outlet>
	
  </mat-sidenav-content>
</mat-sidenav-container>

```

Set \src\app\app.component.css to:

```
.sidenav-container {
  height: 100%;
}

.sidenav {
  width: 400px;
}

.sidenav .mat-toolbar {
  background: inherit;
}

.mat-toolbar.mat-primary {
  position: sticky;
  top: 0;
  z-index: 1;
}

.mat-spacer {
  flex: 1 1 auto;
}

```

Install ElasticSearch client<br />
`npm i elasticsearch`<br />
