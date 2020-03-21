import { appendFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const LOG_DIR = join(__dirname, '../../logs');

export const appendToLog = (data: string) => {
  const date = new Date();

  // Create localized ISO style timestamp
  const tzoffset = date.getTimezoneOffset() * 60000; //offset in milliseconds
  const timestamp = new Date(Date.now() - tzoffset)
    .toISOString()
    .slice(0, -1)
    .replace('T', ' ');

  const fileName = `recommended-server_${date.getFullYear()}-${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}`;

  const filePath = join(LOG_DIR, `${fileName}.log`);

  if (!existsSync(LOG_DIR)) {
    mkdirSync(LOG_DIR);
  }

  appendFileSync(filePath, `[${timestamp}]\t${data}\n`, 'utf8');
};
