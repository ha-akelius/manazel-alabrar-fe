import { JsonPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormComponent } from '../../../../../../core/components/table/table';
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
  imports: [JsonPipe, FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule],
  templateUrl: './relation.component.html',
  styleUrl: './relation.component.scss',
})
export class RelationComponent extends FormComponent<number, realtionType | string> implements OnInit {
  selectedValue: realtionType = { id: -1, name: '' };
  apiService = inject(APIService);
  service: RestApiService<realtionType, unknown, unknown, unknown>;
  result: resultType = {
    items: [],
    pages: 0,
  };

  ngOnInit(): void {
    const key = toLowerCaseFirstLetter(this.propInfo.propInformation.basic.ref!) as keyof APIService;
    this.service = this.apiService[key] as never;
  }

  filterByName(): void {
    const where = this.formControl.value ? { name: { contains: this.formControl.value } } : undefined;
    this.service.findAll({ where }).subscribe((result: resultType) => {
      this.result = result;
    });
  }

  displayFn(relation: realtionType): string {
    return relation ? relation.name : '';
  }

  protected override mapToX(value: number): string | realtionType {
    this.selectedValue = { id: value, name: this.selectedValue.name };
    return this.selectedValue;
  }

  protected override valueChange(): void {
    if (!this.formControl.value || typeof this.formControl.value === 'string') {
      this.filterByName();
    } else {
      this.selectedValue = this.formControl.value;
      this.onChange(this.selectedValue.id);
      const nameKey = this.propInfo.propInformation.basic.name.replace('Id', 'Name');
      this.parentFormGroup.get(nameKey)?.setValue(this.selectedValue.name);
    }
  }
}
