import chalk from 'chalk';

const colorize = {
  red: chalk.red,
  green: chalk.green,
  blue: chalk.blue,
};

const logError = (message) => {
  console.error(colorize.red(message));
};

const isPath = (str) => /[\\]/.test(str); // Search for '\' in the string

const logFilePath = (filePath) => {
    const words = filePath.split(/\s+/); // Split the string into words based on spaces
    const coloredWords = words.map(word => (isPath(word) ? colorize.blue(word) : colorize.green(word)));
    console.log(coloredWords.join(' '));
};

const logSuccess = (message) => {
  console.log(colorize.green(message));
};

export { logError, logFilePath, logSuccess };
