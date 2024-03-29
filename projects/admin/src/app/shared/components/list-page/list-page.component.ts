import { Component, Input } from '@angular/core';
import { DataTableComponent } from '../data-table/data-table.component';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [DataTableComponent],
  templateUrl: './list-page.component.html',
})
export class ListPageComponent {
  @Input() entityName: string = '';
}
