import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { BasicRecord, TableColumnComponent } from '../../../../../core/components/table/table';
import { APIService } from '../../../../../core/services/api.service';
import { SchemaInfo } from '../../../model/json-schema';
import { schemaInfo } from '../../../model/schame';

@Component({
  selector: 'app-actions-data-table',
  standalone: true,
  imports: [MatButtonModule, RouterModule],
  templateUrl: './actions-data-table.component.html',
  styleUrl: './actions-data-table.component.scss',
})
export class ActionsDataTableComponent<T extends BasicRecord> extends TableColumnComponent<T> implements OnInit {
  apiService = inject(APIService);
  schemaInfo!: SchemaInfo;

  ngOnInit(): void {
    this.schemaInfo = schemaInfo(this.entityName, this.apiService);
  }

  removeRecord(): void {
    this.schemaInfo.api.delete(this.record.id).subscribe(() => this.onChange.next());
  }
}
