/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../../../../core/services/api.service';
import { SchemaInfo } from '../../model/json-schema';
import { apiService, assertSchemaInfo } from '../../model/schame';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-form-page',
  standalone: true,
  imports: [DynamicFormComponent],
  templateUrl: './form-page.component.html',
  styleUrl: './form-page.component.scss',
})
export class FormPageComponent implements OnInit {
  apiService = inject(APIService);
  router = inject(Router);

  @Input() entityName: string = '';
  @Input({ required: true }) id: number;
  value: any = null;

  schemaInfo!: SchemaInfo;

  ngOnInit(): void {
    this.schemaInfo = assertSchemaInfo(this.entityName);
    if (this.id) {
      apiService(this.schemaInfo.api, this.apiService)
        .findOne(this.id)
        .subscribe((value: any) => (this.value = value));
    }
  }

  goToListing() {
    this.router.navigate(['../../', 'list', this.entityName]);
  }
}
