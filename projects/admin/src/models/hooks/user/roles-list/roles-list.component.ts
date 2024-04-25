import { Component } from '@angular/core';
import { Role } from '@prisma/client';
import { TableColumnComponent } from '../../../../core/components/table/table';

@Component({
  standalone: true,
  imports: [],
  template: `@for (role of data; track $index) {
    {{ role }}
  }`,
})
export class RolesListComponent extends TableColumnComponent<Role[]> {}
