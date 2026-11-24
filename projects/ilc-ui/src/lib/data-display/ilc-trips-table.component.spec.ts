import { createTripsExcelWorkbook, IlcTrip } from './ilc-trips-table.component';

describe('createTripsExcelWorkbook', () => {
  const trips: IlcTrip[] = [
    {
      status: 'NO PRAZO',
      trip: '102-39586-M',
      date: '02/10/2026',
      type: 'COLETA',
      route: 'RIO DE JANEIRO X RIO DE JANEIRO',
      driver: 'DIOGENES & FILHOS',
      plate: 'LFF9F92',
      situation: 'Comprovante não inserido',
      action: 'Solicitar comprovante'
    },
    {
      status: 'NO PRAZO',
      trip: '24-12851-M',
      date: '02/10/2026',
      type: 'COLETA',
      route: 'NAVEGANTES X SAO JOSE DOS PINHAIS',
      driver: 'CARLOS MAURICIO ANDREATTA SCHUINKI',
      plate: 'DLG8J84',
      situation: 'Comprovante não auditado',
      action: 'Auditar comprovantes'
    }
  ];

  it('includes all export columns and each trip row', async () => {
    const blob = createTripsExcelWorkbook(trips);
    const content = await blob.text();

    expect(blob.type).toBe('application/vnd.ms-excel;charset=utf-8');
    expect(content).toContain('STATUS');
    expect(content).toContain('VIAGEM');
    expect(content).toContain('SITUAÇÃO');
    expect(content).toContain('102-39586-M');
    expect(content).toContain('24-12851-M');
    expect((content.match(/<Row>/g) ?? []).length).toBe(3);
  });

  it('escapes XML-sensitive characters in trip data', async () => {
    const content = await createTripsExcelWorkbook(trips).text();

    expect(content).toContain('DIOGENES &amp; FILHOS');
  });
});
