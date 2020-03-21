import { getConnectionStatus } from './helpers/fetch-data';
import * as chalk from 'chalk';
import printTable from './helpers/print-table';

(async () => {
  const connectionStatus = await getConnectionStatus();

  console.log(
    '\nStatus:',
    connectionStatus.status
      ? chalk.bold.green('connected')
      : chalk.bold.red('not connected'),
    '\n'
  );

  const { longitude, latitude } = connectionStatus.coordinates;

  printTable([
    ['Location:', chalk.bold(connectionStatus.location)],
    ['IP address:', chalk.bold(connectionStatus.ip)],
    ['ISP:', chalk.bold(connectionStatus.isp)],
    ['Coordinates:', chalk.bold(`${longitude} ${latitude}`)],
  ]);
})();
