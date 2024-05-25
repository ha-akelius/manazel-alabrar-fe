import { Component, EnvironmentInjector, OnInit, inject, runInInjectionContext } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { BasicRecord, TableColumnComponent } from '../../../../../core/components/table/table';
import { APIService } from '../../../../../core/services/api.service';
import { Action, SchemaInfo } from '../../../model/json-schema';
import { apiService, assertSchemaInfo } from '../../../model/schame';

@Component({
  selector: 'app-actions-data-table',
  standalone: true,
  imports: [MatButtonModule, RouterModule],
  templateUrl: './actions-data-table.component.html',
  styleUrl: './actions-data-table.component.scss',
})
export class ActionsDataTableComponent<T extends BasicRecord> extends TableColumnComponent<void, T> implements OnInit {
  apiService = inject(APIService);
  private environmentInjector = inject(EnvironmentInjector);
  schemaInfo!: SchemaInfo;
  actions: Action<T>[];

  ngOnInit(): void {
    this.schemaInfo = assertSchemaInfo(this.entityName);
    this.actions = this.schemaInfo.actions?.map((a) => ({ ...a })) || [];
  }

  removeRecord(): void {
    const api = apiService(this.schemaInfo.api, this.apiService);
    api.delete(this.record.id).subscribe(() => this.onChange.next());
  }

  doAction<T extends BasicRecord>(action: Action<T>, record: T) {
    runInInjectionContext(this.environmentInjector, () => action.actionFactory()(record));
  }
}
