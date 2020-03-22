import { table, getBorderCharacters } from 'table';

const printTable = (data: any[][]) =>
  process.stdout.write(
    table(data, {
      border: getBorderCharacters('void'),
      columnDefault: {
        paddingLeft: 0,
        paddingRight: 3,
      },
      drawHorizontalLine: () => {
        return false;
      },
    })
  );

export default printTable;
