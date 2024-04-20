import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProductModel } from '../../product.model';
import { MasterService } from '../../service/master.service';
@Component({
  selector: 'app-dashboared',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    CurrencyPipe,
    CommonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  durationInSeconds = 5;
  FormStatus = FormStatus;
  formStatus = FormStatus.Normal;
  productlist?: ProductModel[];
  editdata?: ProductModel;
  displayedColums: string[] = ['id', 'name', 'description', 'action'];
  datasource = new MatTableDataSource<ProductModel>([]);

  constructor(
    private service: MasterService,
    private builder: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
    this.loadproductlist();
  }

  loadproductlist(): void {
    this.service.getallproducts().subscribe((item) => {
      this.productlist = item;
      this.datasource = new MatTableDataSource(this.productlist);
    });
  }

  productform = this.builder.group({
    id: this.builder.control({ value: 0, disabled: true }),
    name: this.builder.control('', Validators.required),
    description: this.builder.control(''),
    price: this.builder.control(0),
  });

  saveproduct(): void {
    if (this.productform.valid) {
      const obj: ProductModel = {
        id: this.productform.value.id as number,
        name: this.productform.value.name as string,
        description: this.productform.value.description as string,
        price: this.productform.value.price as number,
      };

      if (this.formStatus === FormStatus.Add) {
        this.service.createproduct(obj).subscribe(() => {
          this.loadproductlist();
          this.formStatus = FormStatus.Normal;
          this.productform.reset();
          this.snackBarOpen();
        });
      } else if (this.formStatus === FormStatus.Edit) {
        obj.id = this.productform.getRawValue().id as number;
        this.service.updateproduct(obj).subscribe(() => {
          this.loadproductlist();
          this.formStatus = FormStatus.Normal;
          this.productform.reset();
          this.snackBarOpen();
        });
      }
    }
  }

  editproduct(id: number): void {
    this.service.getproduct(id).subscribe((item) => {
      this.editdata = item;
      this.productform.setValue({
        id: this.editdata.id,
        name: this.editdata.name,
        description: this.editdata.description,
        price: this.editdata.price,
      });
      this.formStatus = FormStatus.Edit;
    });
  }

  removeproduct(id: number): void {
    this.service.deleteproduct(id).subscribe(() => {
      this.loadproductlist();
    });
  }

  addproduct(): void {
    this.productform.reset();
    this.formStatus = FormStatus.Add;
  }

  backtolist(): void {
    this.formStatus = FormStatus.Normal;
    this.productform.reset();
  }

  snackBarOpen(): void {
    this.snackBar.open(' Updated successfully', 'OK', {
      duration: this.durationInSeconds * 1000,
    });
  }

  snackBarRemove(): void {
    this.snackBar.open('Remove successfully', 'OK', {
      duration: this.durationInSeconds * 1000,
    });
  }

  isFormValid(): boolean {
    return this.productform.valid;
  }
}
enum FormStatus {
  Normal,
  Add,
  Edit,
}
