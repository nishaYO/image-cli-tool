import { Command } from "commander";
import sharp from "sharp";
import { extname, resolve } from "path";
const infoCommand = new Command();
import { statSync } from "fs";
import { logError, logSuccess } from '../utils/colorFormatOutput.js';

function formatFileSize(size) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];

  let i = 0;
  while (size >= 1024 && i < units.length - 1) {
    size /= 1024;
    i++;
  }

  return size.toFixed(2) + ' ' + units[i];
}

infoCommand
  .name("info")
  .arguments('<inputFile>')
  .description('Get information about an image')
  .action(async (inputFile) => {
    try {
      // fetch inputFile metadata using sharp
      const metadata = await sharp(inputFile).metadata();

      // customize the inputFile metadata
      const imageInfo = {
        Format: (extname(inputFile).slice(1)) || "Unknown",
        Location: resolve(inputFile) || "Unknown",
        Width: metadata.width || "Unknown",
        Height: metadata.height || "Unknown",
        // Density: metadata.density || "Unknown",
        // IsProgressive: metadata.isProgressive || "Unknown",
        FileSize: formatFileSize(statSync(inputFile).size) || "Unknown"
        // todos
        // createdWhen: "Information not available",
        // geoCoordinates: "Information not available",
      };
      logSuccess("Image information\n", imageInfo);
      console.log(imageInfo)
    } catch (err) {
      logError(err);
    }
  })

  // help option for subcommand info
  .on('--help', () => {
    logSuccess('\nUsage:');
    logSuccess('  img-cli info <inputFile>');
    logSuccess('\nExamples:');
    logSuccess('  $ img-cli info input.jpg');
  });

export default infoCommand;
