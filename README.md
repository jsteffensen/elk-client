# elk-client



## Create an Angular Material Application

Generate new Angular app in CLI: `ng new elk-client`<br />
(select yes to Angular routing and choose CSS).

Test that it can be run in browser:
`ng s -o`.

Add Angular Material: `ng add @angular/material`<br />
(select indigo/pink theme, include HammerJS for gesture support and select yes to browser animations).

Generate schematic components:

`ng g @angular/material:dashboard MaterialDashboard`.

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

Set \src\app\app.module.ts to use the MaterialWrapper:

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialWrapperModule } from './material-wrapper/material-wrapper.module';
import { MaterialDashboardComponent } from './material-dashboard/material-dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [
    AppComponent,
    MaterialDashboardComponent
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

Move routing to seperate module in \src\app\app-routing.module.ts:

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

Create a dashboard wireframe with a router outlet in \src\app\app.component.html:

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
	<mat-progress-bar mode="indeterminate" color="warn" *ngIf="isLoading"></mat-progress-bar>
	<router-outlet></router-outlet>
	
  </mat-sidenav-content>
</mat-sidenav-container>

```

Add some styling to \src\app\app.component.css to:

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


## Create an ElasticSearch client service

Install the official ElasticSearch client<br />
`npm i elasticsearch-browser`.

Generate service to hold the ElasticSearch client:

`ng g s ElasticSearch`.

Edit contents of elastic-search.service.ts to:

```
import { Injectable } from '@angular/core';
import { Client } from 'elasticsearch-browser';
import * as elasticsearch from 'elasticsearch-browser';

@Injectable({
  providedIn: 'root'
})

export class ElasticSearchService {

  private client: Client;
 
  constructor() {
    if (!this.client) {
      this._connect();
    }
  }
 
  private connect() {
    this.client = new Client({
      host: 'http://localhost:9200',
      log: 'trace'
    });
  }
 
  private _connect() {
    this.client = new elasticsearch.Client({
      host: 'localhost:9200',
      log: 'trace'
    });
  }
 
  isAvailable(): Promise<any> {
    return this.client.ping({
      requestTimeout: Infinity,
      body: 'hello world!'
    });
  }
}
```

Import the service for use in a component like so:

```
import ...
import { ElasticSearchService } from '../elastic-search.service';

@Component({
  ...
})

export class MyComponent implements OnInit {
	
  isConnected = false;
  status: string;
  
  ...

  constructor(private es: ElasticSearchService, 
			  private cd: ChangeDetectorRef) {
				  this.isConnected = false;
			  }
			  
    ngOnInit() {
		this.es.isAvailable().then(() => {
		  this.status = 'OK';
		  this.isConnected = true;
		}, error => {
		  this.status = 'ERROR';
		  this.isConnected = false;
		  console.error('Server is down', error);
		}).then(() => {
		  this.cd.detectChanges();
		});
	}
}

```

To use in an html view:

`<div *ngIf="card.title=='Card 1'">Elasticsearch server status: {{status}}</div>`

![screen shot](screenshot.png?raw=true)

## ElasticSearch configuration

For ElasticSearch server to accept calls from localhost:4200 edit ../elasticsearch/config/elasticsearch.yml to include:

```
#
# ----------------------------------- CORS -------------------------------------
http.cors.enabled : true
http.cors.allow-origin : "http://localhost:4200"
http.cors.allow-methods : OPTIONS, HEAD, GET, POST, PUT, DELETE
http.cors.allow-headers : X-Requested-With,X-Auth-Token,Content-Type, Content-Length

```

## Self hosting icons and fonts (https://google.github.io/material-design-icons/)

`npm install material-design-icons --save`

Copy \node_modules\material-design-icons\iconfont\ to assets.

Remove `<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">` from src\index.html-

Add to src\styles.css

```
@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: url(https://example.com/MaterialIcons-Regular.eot); /* For IE6-8 */
  src: local('Material Icons'),
    local('MaterialIcons-Regular'),
    url(https://example.com/MaterialIcons-Regular.woff2) format('woff2'),
    url(https://example.com/MaterialIcons-Regular.woff) format('woff'),
    url(https://example.com/MaterialIcons-Regular.ttf) format('truetype');
}

.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;  /* Preferred icon size */
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: 'liga';
}

```
