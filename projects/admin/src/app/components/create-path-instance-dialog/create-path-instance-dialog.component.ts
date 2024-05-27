import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Path, Prisma, Role, User } from '@prisma/client';
import { APIService } from '../../../core/services/api.service';
import { AuthService } from '../../auth-service.service';
import { DynamicFieldsComponent } from '../../shared/components/dynamic-fields/dynamic-fields.component';
import { GuiPropInformation } from '../../shared/model/json-schema';
import { translations } from '../../translations';
import { pathInstanceGuiInfo } from './../../../models/gui-info/path-instance.gui-info';

const fieldName = (x: GuiPropInformation) => x.propInformation.basic.name;

@Component({
  selector: 'app-create-path-instance-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    DynamicFieldsComponent,
  ],
  templateUrl: './create-path-instance-dialog.component.html',
  styleUrl: './create-path-instance-dialog.component.scss',
})
export class CreatePathInstanceDialogComponent {
  dialogRef = inject(MatDialogRef<CreatePathInstanceDialogComponent>);
  path: Path = inject(MAT_DIALOG_DATA);
  pathInstanceApi = inject(APIService).pathInstance;
  pathInstanceName = this.pathInstanceApi.apiName.replace('-', '');
  userApi = inject(APIService).user;
  authService = inject(AuthService);
  translations = translations.general;
  formValue = new FormControl<Prisma.PathInstanceCreateInput>({} as Prisma.PathInstanceCreateInput, {
    nonNullable: true,
    validators: [Validators.required],
  });
  teachers: User[] = [];
  excludeFields = [
    fieldName(pathInstanceGuiInfo.pathId),
    fieldName(pathInstanceGuiInfo.numberOfRegisteredStudents),
    fieldName(pathInstanceGuiInfo.stilOpen),
  ];

  constructor() {
    this.userApi.findAll({ where: { roles: { hasSome: [Role.TEACHER] } } }).subscribe((teachers) => {
      this.teachers = teachers.items;
    });

    const pathInstance: Prisma.PathInstanceCreateInput = {
      name: this.path.name,
      description: this.path.description,
      dateFrom: new Date(),
      dateTo: new Date(),
      numberOfStudents: 0,
      numberOfRegisteredStudents: 0,
      stilOpen: true,
      pathId: this.path.id,
      pathName: this.path.name,
      createdDate: new Date(),
      updatedDate: new Date(),
      createdUserName: this.authService.getUserName(),
      createdUserId: this.authService.getUserId(),
      updatedUserName: this.authService.getUserName(),
      updatedUserId: this.authService.getUserId(),
    } as unknown as Prisma.PathInstanceCreateInput;
    this.formValue.setValue(pathInstance);
  }

  createPathInstance() {
    const formValue = this.formValue.getRawValue();
    this.pathInstanceApi.create(formValue).subscribe(() => {
      this.dialogRef.close();
    });
  }

  static openDialog(dialog: MatDialog, data: CreatePathInstanceDialogComponent['path']): void {
    dialog.open(CreatePathInstanceDialogComponent, { data });
  }
}
