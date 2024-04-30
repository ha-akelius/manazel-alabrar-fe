import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BasicRecord, TableColumnComponent } from '../../../../../core/components/table/table';

@Component({
  selector: 'app-relation-link',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `<a [routerLink]="['/edit', refEntityName, id]">{{ id }}:{{ name }}</a>`,
})
export class RelationLinkComponent<T extends BasicRecord> extends TableColumnComponent<number, T> implements OnInit {
  @Input() refEntityName: string;

  id: number;
  name: string;

  ngOnInit(): void {
    const idKey = this.key as keyof typeof this.record;
    const nameKey = (this.key?.replace('Id', '') + 'Name') as keyof typeof this.record;
    this.id = this.record[idKey] as number;
    this.name = this.record[nameKey] as string;
  }
}
