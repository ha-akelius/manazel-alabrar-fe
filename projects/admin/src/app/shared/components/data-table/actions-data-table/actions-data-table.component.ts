import { Component, EnvironmentInjector, OnInit, inject, runInInjectionContext } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { BasicRecord, TableColumnComponent } from '../../../../../core/components/table/table';
import { APIService } from '../../../../../core/services/api.service';
import { SnackBarComponent } from '../../../../components/snack-bar/snack-bar.component';
import { translations } from '../../../../translations';
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
  snackBar = inject(MatSnackBar);
  schemaInfo!: SchemaInfo;
  durationInSeconds = 3;
  actions: Action<T>[];
  translations = translations.general;
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
  openSnackBar(): void {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
}
