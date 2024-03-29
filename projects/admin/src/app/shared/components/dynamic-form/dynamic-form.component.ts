import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { APIService } from '../../../../core/services/api.service';
import { JSONSchema, SchemaInfo } from '../../model/json-schema';
import { getFirstType, schemaInfo } from '../../model/schame';

interface PropertyInformation {
  name: string;
  property: JSONSchema;
}

@Component({
  standalone: true,
  selector: 'app-dynamic-form',
  imports: [MatInputModule, ReactiveFormsModule, MatSlideToggleModule, MatButtonModule, CommonModule],
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
      const type = Array.isArray(property.type) ? property.type[0] : property.type;
      if (propertyName !== 'id' && type !== 'array') {
        this.propertiesInfo.push({
          name: propertyName,
          property: property,
        });
        const control = new FormControl(property.default, this.collectValidators(propertyName, property));
        formGroup.addControl(propertyName, control);
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
