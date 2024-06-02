/* eslint-disable @typescript-eslint/no-explicit-any */
import { JsonPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { debounceTime } from 'rxjs/operators';
import { FormComponent, NoopValueAccessorDirective } from '../../../../../../core/components/table/table';
import { APIService } from '../../../../../../core/services/api.service';
import { Result } from '../../../../../../shared/models/result';
import { RestApiService } from '../../../../../../shared/services/rest-api.service';

type realtionType = { id: number; name: string };
type resultType = Result<realtionType>;

function toLowerCaseFirstLetter(str: string): string {
  return str[0].toLowerCase() + str.slice(1);
}

@Component({
  selector: 'app-relation',
  standalone: true,
  hostDirectives: [NoopValueAccessorDirective],
  imports: [JsonPipe, FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule],
  templateUrl: './relation.component.html',
  styleUrl: './relation.component.scss',
})
export class RelationComponent extends FormComponent<number> implements OnInit {
  apiService = inject(APIService);
  inputForm = new FormControl<string | realtionType | null>(null);
  service: RestApiService<realtionType, unknown, unknown, unknown>;
  result: resultType = {
    items: [],
    pages: 0,
  };

  constructor() {
    super();
    this.inputForm.valueChanges.pipe(debounceTime(300)).subscribe(() => this.filterByName());
  }

  ngOnInit(): void {
    const key = toLowerCaseFirstLetter(this.propInfo.propInformation.basic.ref!) as keyof APIService;
    this.service = this.apiService[key] as never;
    setTimeout(() => {
      this.inputForm.setValue(this.getNameControl()?.value, { emitEvent: false });
    }, 300);
  }

  filterByName(): void {
    const value = this.inputForm.value;
    if (typeof value === 'string') {
      const where = this.inputForm.value ? { name: { contains: this.inputForm.value } } : undefined;
      this.service.findAll({ where }).subscribe((result: resultType) => {
        this.result = result;
      });
    } else if (value) {
      this.formControl.setValue(value.id);
      this.getNameControl()?.setValue(value.name);
    }
  }

  displayFn(relation: realtionType | string): string {
    return typeof relation === 'string' ? relation : relation?.name;
  }

  private getNameControl(): AbstractControl<any, any> | null | undefined {
    const nameKey = this.propInfo.propInformation.basic.name.replace('Id', 'Name');
    return this.parentFormGroup?.get(nameKey);
  }
}
