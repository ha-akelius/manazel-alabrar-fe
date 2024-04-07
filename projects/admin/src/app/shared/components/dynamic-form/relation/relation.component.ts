import { Component, Input, inject } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Result } from '../../../../../shared/models/result';
import { DBService } from './../../../../../../../../src/app/core/services/db.service';

@Component({
  selector: 'app-relation',
  standalone: true,
  imports: [MatAutocompleteModule],
  templateUrl: './relation.component.html',
  styleUrl: './relation.component.scss',
})
export class RelationComponent {
  @Input({ required: true }) entityName: keyof DBService;

  dbService = inject(DBService);
  result: Result<{ id: number; email: string; name: string | null }[]>;

  findAll() {
    this.dbService[this.entityName].findAll().subscribe((result) => {
      this.result = result;
    });
  }
}
