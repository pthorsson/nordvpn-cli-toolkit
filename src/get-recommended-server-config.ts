import { argv } from 'yargs';
import { join } from 'path';
import { config } from 'dotenv';
import {
  getCountries,
  getRecommendedServers,
  getConfigFileDataByServer,
} from './helpers/fetch-data';
import { outputData, outputErrorAndExit } from './helpers/output';
import { appendToLog } from './helpers/append-log';

// Init dotenv
config({ path: join(__dirname, '../.env') });

const ENABLE_LOGGING = process.env.ENABLE_LOGGING == 'true';
const AUTH_FILE = (argv.authFile as string) || process.env.AUTH_FILE;
const COUNTRY_CODE = (argv.country as string) || process.env.DEFAULT_COUNTRY;
const RECOMMENDED_SERVER_OFFSET =
  Math.max(0, Math.min(4, Math.round((argv.offset as number) || 0))) || 0;

(async () => {
  // Fetching countries and pick out selected country
  const countries = await getCountries();

  if (countries.error || !countries.data) {
    outputErrorAndExit(`Error fetching countries\n\n${countries.error}`);
  }

  const country = countries.data.find(({ code }) => code === COUNTRY_CODE);

  if (!country || !country.id) {
    outputErrorAndExit(
      `Country with code "${COUNTRY_CODE}" not found - aborting`
    );
  }

  // Fetching recommended servers and picks one by given index
  const recommendedServers = await getRecommendedServers(country.id);

  if (recommendedServers.error || !recommendedServers.data) {
    outputErrorAndExit(
      `Error fetching recommended servers\n\n${recommendedServers.error}`
    );
  }

  const recommendedServer = recommendedServers.data[RECOMMENDED_SERVER_OFFSET];

  if (!recommendedServer || !recommendedServer.hostname) {
    outputErrorAndExit(`Recommended server not found - aborting`);
  }

  // Fetching config file content for recommended server
  let configFile = await getConfigFileDataByServer(recommendedServer.hostname);

  if (configFile.error || !configFile.data || !configFile.data.length) {
    outputErrorAndExit(
      `Error fetching config file content\n\n${configFile.error}`
    );
  }

  let configFileContent = configFile.data;

  if (AUTH_FILE && AUTH_FILE.length) {
    configFileContent = configFileContent.replace(
      'auth-user-pass',
      `auth-user-pass ${AUTH_FILE}`
    );
  }

  if (ENABLE_LOGGING) {
    appendToLog(`${recommendedServer.hostname}\t${recommendedServer.station}`);
  }

  outputData(configFileContent);
})();
