import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { BasicRecord, TableColumnComponent } from '../../../../../core/components/table/table';

@Component({
  selector: 'app-relation-link',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './relation-link.component.html',
  styleUrl: './relation-link.component.scss',
})
export class RelationLinkComponent<T extends BasicRecord> implements TableColumnComponent<T>, OnInit {
  @Input() record: T;
  @Input() entityName: string;
  @Input() onChange: Subject<void>;
  @Input() key: string;
  @Input() refEntityName: string;

  id: number;
  name: string;

  ngOnInit(): void {
    const idKey = (this.key + 'Id') as keyof T;
    const nameKey = (this.key + 'Name') as keyof T;
    this.id = this.record[idKey] as number;
    this.name = this.record[nameKey] as string;
  }
}
