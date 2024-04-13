import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { BasicRecord, TableColumnComponent } from '../../../../../core/components/table/table';

@Component({
  selector: 'app-relation-link',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './relation-link.component.html',
  styleUrl: './relation-link.component.scss',
})
export class RelationLinkComponent<T extends BasicRecord> implements TableColumnComponent<T> {
  @Input() record: T;
  @Input() entityName: string;
  @Input() onChange: Subject<void>;
  @Input() key: keyof T;
}
