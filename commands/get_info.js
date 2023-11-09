import { Command } from "commander";
import sharp from "sharp";
import { extname, resolve } from "path";
const infoCommand = new Command();
import { statSync } from "fs";

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
        Density: metadata.density || "Unknown",
        IsProgressive: metadata.isProgressive || "Unknown",
        FileSize: formatFileSize(statSync(inputFile).size) || "Unknown"
        // todos
        // createdWhen: "Information not available",
        // geoCoordinates: "Information not available",
      };
      console.log("Image information\n", imageInfo);
    } catch (err) {
      console.error(err);
    }
  })

  // help option for subcommand info
  .on('--help', () => {
    console.log('\nUsage:');
    console.log('  img-cli info <inputFile>');
    console.log('\nExamples:');
    console.log('  $ img-cli info input.jpg');
  });

export default infoCommand;
