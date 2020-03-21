export const outputErrorAndExit = (message: string) => {
  process.stderr.write(message);
  process.exit(1);
};

export const outputData = (message: string) => {
  process.stdout.write(message);
};
