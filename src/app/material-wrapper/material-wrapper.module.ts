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