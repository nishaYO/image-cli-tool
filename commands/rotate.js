// rotate.js
import { Command } from "commander";
import sharp from "sharp";
import { extname, basename, join, dirname } from "path";

const rotateCommand = new Command();

rotateCommand
  .name("rotate")
  .arguments('<inputFile> <rotateAngle>') // Use arguments instead of command
  .description('Rotate an image by a specified angle')
  .action(async (inputFile, rotateAngle) => {
    try {
      // create output file name
      const outputFileName = basename(inputFile, extname(inputFile)) + "_rotated_" + rotateAngle + extname(inputFile);
      const outputFile = join(dirname(inputFile), outputFileName);
      const angle = parseInt(rotateAngle);
      const rotate = await sharp(inputFile).rotate(angle)
        .toFile(outputFile, (err, info) => {
          if (err) {
            console.error(err.message);
          } else {
            console.log('Image rotated');
          }
        });
    } catch (error) {
      console.error(error.message);
    }
  });

export default rotateCommand;
