export interface TableColumn<T> {
  name: string;
  dataKey?: keyof T;
  position?: 'right' | 'left';
  isSortable?: boolean;
}
