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

Generate schematic components<br />
`ng generate @angular/material:dashboard MaterialDashboard`<br />
`ng generate @angular/material:nav MaterialNavigation`

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
<app-material-navigation></app-material-navigation>

```

Install ElasticSearch client<br />
`npm i elasticsearch`<br />
