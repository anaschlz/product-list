import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudComponent } from './crud.component';
import { CrudRoutingModule } from './crud-routing.module';
import { DialogComponent } from './dialog/dialog.component';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrudService } from '../services/crud.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    CrudComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    CrudRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
		ReactiveFormsModule,
    MatProgressSpinnerModule,
    HttpClientModule
  ],
  providers: [CrudService]
})
export class CrudModule { }
