import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DBService } from '../../../../../../../src/app/core/services/db.service';
import { APIService } from '../../../../core/services/api.service';
import { JSONSchema, SchemaInfo } from '../../model/json-schema';
import { getFirstType, getPropertyType, schemaInfo } from '../../model/schame';
import { RelationComponent } from './relation/relation.component';

interface PropertyInformation {
  name: string;
  property: JSONSchema;
  propertyName: string;
  ref: keyof DBService | undefined;
}

@Component({
  standalone: true,
  selector: 'app-dynamic-form',
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatButtonModule,
    CommonModule,
    MatCardModule,
    RelationComponent,
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  apiService = inject(APIService);
  @Input() entityName: string = '';
  @Input() value: unknown;
  @Output() formResult = new EventEmitter<typeof this.value | null>();

  dynamicForm: FormGroup = new FormGroup({});
  schemaInfo!: SchemaInfo;
  propertiesInfo: PropertyInformation[] = [];

  getFirstType = getFirstType;
  createFormGroup() {
    const formGroup = new FormGroup({});
    for (const [propertyName, property] of Object.entries(this.schemaInfo.schema.properties)) {
      const type = getPropertyType(property);
      const refs = property.$ref?.split('/');
      const ref = refs ? (refs[refs.length - 1] as keyof DBService) : undefined;
      const controlName = propertyName + (ref ? 'Id' : '');
      if (propertyName !== 'id' && type !== 'array') {
        this.propertiesInfo.push({
          name: controlName,
          propertyName: propertyName,
          property: property,
          ref: ref,
        });
        const control = new FormControl(property.default, this.collectValidators(propertyName, property));
        formGroup.addControl(controlName, control);
      }
    }

    this.dynamicForm = formGroup;
  }

  ngOnInit(): void {
    this.schemaInfo = schemaInfo(this.entityName, this.apiService);
    this.createFormGroup();
    if (this.value) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.dynamicForm.patchValue(this.value as any);
    }
  }

  save() {
    if (!this.dynamicForm.valid) {
      this.dynamicForm.markAllAsTouched();
      return;
    }

    const obs = this.value
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.schemaInfo.api.update((this.value as unknown as any).id, this.dynamicForm.value as never)
      : this.schemaInfo.api.create(this.dynamicForm.value as never);
    obs.subscribe((t) => {
      this.formResult.emit(t);
    });
  }

  cancel() {
    this.formResult.emit(null);
  }

  fillRelationName($event: string, property: PropertyInformation) {
    this.dynamicForm.get(property.propertyName + 'Name')?.setValue($event);
  }

  private collectValidators(propertyName: string, property: JSONSchema): ValidatorFn[] {
    const validators: ValidatorFn[] = [];

    if (property.minimum) {
      validators.push(Validators.min(property.minimum));
    }

    if (property.maximum) {
      validators.push(Validators.min(property.maximum));
    }

    if (this.schemaInfo.schema.required?.includes(propertyName)) {
      validators.push(Validators.required);
    }

    if (propertyName.includes('email')) {
      validators.push(Validators.email);
    }

    return validators;
  }
}
