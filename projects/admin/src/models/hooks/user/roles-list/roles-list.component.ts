import { Component } from '@angular/core';
import { Role } from '@prisma/client';
import { translations } from '../../../../app/translations';
import { TableColumnComponent } from '../../../../core/components/table/table';

@Component({
  standalone: true,
  imports: [],
  template: `@for (role of data; track $index) {
    {{ translations[role] }},
  }`,
})
export class RolesListComponent extends TableColumnComponent<Role[]> {
  translations = translations.role;
}
