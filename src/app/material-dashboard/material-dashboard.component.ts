import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ElasticSearchService } from '../elastic-search.service';

@Component({
  selector: 'app-material-dashboard',
  templateUrl: './material-dashboard.component.html',
  styleUrls: ['./material-dashboard.component.css']
})
export class MaterialDashboardComponent implements OnInit {
	
  isConnected = false;
  status: string;
  
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, 
              private es: ElasticSearchService, 
			  private cd: ChangeDetectorRef) {
				  this.isConnected = false;
			  }
			  
    ngOnInit() {
		this.es.isAvailable().then(() => {
		  this.status = 'OK';
		  this.isConnected = true;
		  this.getIndices();
		}, error => {
		  this.status = 'ERROR';
		  this.isConnected = false;
		  console.error('Server is down', error);
		}).then(() => {
		  this.cd.detectChanges();
		});
	}
	
	getIndices() {
		this.es.getIndices().then((i)=>{
			console.log(i);
		}, (error) => {
			console.error('No index available.', error);
		});
	}
}
