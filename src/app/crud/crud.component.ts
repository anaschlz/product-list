import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.scss'
})
export class CrudComponent {
  loading = false;
  cols = ['name', 'description', 'price', 'actions'];
  data = [
    {
      id: '0000-0000-0000-0001',
      name: 'Produto teste',
      description: 'Descrição de teste do produto',
      price: 250.50
    }
  ];

  constructor(public dialog: MatDialog, private crudService: CrudService) {}

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.loading = true;
    this.crudService.getAll().subscribe({
      next: (result:any) => {
        this.loading = false;
        console.log('Result: ', result);
        this.data = result;
      },
      error: (error) => {
        this.loading = false;
        console.log('Error: ', error);
      }
    })
  }

  delete(id:string) {
    this.loading = true;
    this.crudService.delete(id).subscribe({
      next: (result) => {
        this.loading = false;
        this.getAll();
      },
      error: (error) => {
        this.loading = false;
        console.log('Error: ', error);
      }
    })
  }

  openDialog(id?: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      data: {id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAll();
      }
    });
  }

}
