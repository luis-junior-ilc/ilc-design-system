import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { ILC_PAGE_SIZE_OPTIONS, IlcPaginationComponent } from './ilc-pagination.component';
import { IlcScrollAreaComponent } from './ilc-scroll-area.component';

export interface IlcTrip {
  status: string;
  trip: string;
  date: string;
  type: string;
  route: string;
  driver: string;
  plate: string;
  situation: string;
  action: string;
}

const excelColumns: Array<{ key: keyof IlcTrip; title: string }> = [
  { key: 'status', title: 'STATUS' },
  { key: 'trip', title: 'VIAGEM' },
  { key: 'date', title: 'DATA' },
  { key: 'type', title: 'TIPO VIAGEM' },
  { key: 'route', title: 'ROTA' },
  { key: 'driver', title: 'MOTORISTA' },
  { key: 'plate', title: 'PLACA' },
  { key: 'situation', title: 'SITUAÇÃO' },
  { key: 'action', title: 'AÇÃO' }
];

export function createTripsExcelWorkbook(trips: readonly IlcTrip[]): Blob {
  const xmlEscape = (value: string): string => value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
  const cell = (value: string, header = false): string =>
    `<Cell${header ? ' ss:StyleID="Header"' : ''}><Data ss:Type="String">${xmlEscape(value)}</Data></Cell>`;
  const headerRow = `<Row>${excelColumns.map((column) => cell(column.title, true)).join('')}</Row>`;
  const dataRows = trips.map((trip) =>
    `<Row>${excelColumns.map((column) => cell(trip[column.key])).join('')}</Row>`
  ).join('');
  const workbook = `<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?>` +
    `<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">` +
    `<Styles><Style ss:ID="Header"><Font ss:Bold="1"/><Interior ss:Color="#DCEBFA" ss:Pattern="Solid"/></Style></Styles>` +
    `<Worksheet ss:Name="Viagens"><Table>${headerRow}${dataRows}</Table></Worksheet></Workbook>`;
  return new Blob([workbook], { type: 'application/vnd.ms-excel;charset=utf-8' });
}

@Component({
  selector: 'ilc-trips-table',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTableModule, IlcPaginationComponent, IlcScrollAreaComponent],
  templateUrl: './ilc-trips-table.component.html',
  styleUrl: './ilc-trips-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IlcTripsTableComponent {
  readonly trips = input.required<IlcTrip[]>();
  readonly actionRequested = output<IlcTrip>();
  readonly displayedColumns = ['status', 'trip', 'date', 'type', 'route', 'driver', 'plate', 'situation', 'action'];
  readonly pageSizeOptions = ILC_PAGE_SIZE_OPTIONS;
  readonly pageIndex = signal(0);
  readonly pageSize = signal(5);
  readonly visibleTrips = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    return this.trips().slice(start, start + this.pageSize());
  });

  onPageChange(event: PageEvent): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }

  requestAction(trip: IlcTrip): void {
    this.actionRequested.emit(trip);
  }

  exportExcel(): void {
    const blob = createTripsExcelWorkbook(this.trips());
    const url = URL.createObjectURL(blob);
    const download = document.createElement('a');
    download.href = url;
    download.download = 'viagens.xls';
    download.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }
}
