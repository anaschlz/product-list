import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  form!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private crudService: CrudService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(200)]],
      price: [0, [Validators.required, Validators.min(.01)]]
    });
  }

  ngOnInit() {
    if (this.data.id) {
      console.log('ID a ser recuperado', this.data.id);
      this.getById(this.data.id);
    }
  }

  getById(id: string) {
    this.loading = true;
    this.crudService.getById(id).subscribe({
      next: (result) => {
        this.loading = false;
        console.log('Resultado do GetById:', result);
        this.form.patchValue(result);
      },
      error: (error) => {
        this.loading = false;
        console.log('Erro no GetById:', error);
      }
    });
  }

  save() {
    this.loading = true;
    const payload = this.form.value;
    console.log('Payload:', payload);

    if (this.data.id) {
      this.crudService.put(this.data.id, payload).subscribe({
        next: (result) => {
          this.loading = false;
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.loading = false;
          console.log('Erro ao salvar:', error);
        }
      });
    } else {
      this.crudService.post(payload).subscribe({
        next: (result) => {
          this.loading = false;
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.loading = false;
          console.log('Erro ao criar:', error);
        }
      });
    }
  }
}
