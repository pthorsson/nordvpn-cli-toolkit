import * as chalk from 'chalk';
import { argv } from 'yargs';
import printTable from './helpers/print-table';
import { getConnectionStatus } from './helpers/fetch-data';

(async () => {
  const connectionStatus = await getConnectionStatus();

  if (argv.silent) {
    if (connectionStatus.error) {
      process.exit(1);
    }
  } else if (argv.minimal) {
    if (connectionStatus.error) {
      process.stdout.write('ERROR');
    } else if (connectionStatus.data?.status) {
      process.stdout.write('CONNECTED');
    } else {
      process.stdout.write('NOT_CONNECTED');
    }
  } else {
    if (connectionStatus.error || !connectionStatus.data) {
      const statusText = chalk.bold.yellow('error check connection');

      process.stdout.write(`\nStatus: ${statusText}\n\n`);
      process.stdout.write(`${connectionStatus.error.toString()}\n`);
    } else {
      const statusText = connectionStatus.data.status
        ? chalk.bold.green('connected')
        : chalk.bold.red('not connected');

      process.stdout.write(`\nStatus: ${statusText}\n\n`);

      const { longitude, latitude } = connectionStatus.data.coordinates;

      printTable([
        ['Location:', chalk.bold(connectionStatus.data.location)],
        ['IP address:', chalk.bold(connectionStatus.data.ip)],
        ['ISP:', chalk.bold(connectionStatus.data.isp)],
        ['Coordinates:', chalk.bold(`${longitude} ${latitude}`)],
      ]);
    }
  }

  process.exit(connectionStatus.data?.status ? 0 : 1);
})();
