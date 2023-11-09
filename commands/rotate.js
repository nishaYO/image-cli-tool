import { Command } from "commander";
import sharp from "sharp";
import { join, dirname } from "path";
import { generateUniqueFilename } from "../utils/generateFileName.js"
import { logError, logFilePath, logSuccess } from '../utils/colorFormatOutput.js';

const rotateCommand = new Command();


rotateCommand
  .name("rotate")
  .arguments('<inputFile> <rotateAngle>') // Use arguments instead of command
  .description('Rotate an image by a specified angle')
  .action(async (inputFile, rotateAngle) => {
    try {
      // create output file name
      const outputFileName = generateUniqueFilename(inputFile, "rotated", rotateAngle);
      const outputFile = join(dirname(inputFile), outputFileName);

      // rotate the inputFile by given angle
      const angle = parseInt(rotateAngle);
      const rotate = await sharp(inputFile).rotate(angle)
        .toFile(outputFile, (err, info) => {
          if (err) {
            console.error(err.message);
          } else {
            logSuccess("Image rotated.");
            logFilePath(`See here: ${outputFile}`);
          }
        });
    } catch (error) {
      logError(error.message);
    }
  })  
  // help option for subcommand rotate
  .on('--help', () => {
    logSuccess('\nUsage:');
    logSuccess('  img-cli rotate <inputFile> <rotateAngle>');
    logSuccess('\nExamples:');
    logSuccess('  $ img-cli rotate input.jpg 90');
    logSuccess('  $ img-cli rotate input.jpg -45');
    logSuccess('\nNote:');
    logSuccess('  The <rotateAngle> can be any positive or negative angle.');
  });

export default rotateCommand;
