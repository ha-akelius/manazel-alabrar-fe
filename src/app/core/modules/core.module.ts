import { NgModule } from '@angular/core';
import { ColumnDefinitionDirective, TableComponent } from '../components/table/table.component';
import { SharedModule } from './shared.module';

const modules = [SharedModule, TableComponent, ColumnDefinitionDirective];

@NgModule({
  imports: modules,
  exports: modules,
})
export class CoreModule {}
