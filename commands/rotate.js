// rotate.js
import { Command } from "commander";
import sharp from "sharp";
import { join, dirname } from "path";
import { generateUniqueFilename } from "../fileUtils.js"

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
      const angle = parseInt(rotateAngle);
      const rotate = await sharp(inputFile).rotate(angle)
        .toFile(outputFile, (err, info) => {
          if (err) {
            console.error(err.message);
          } else {
            console.log(`Image rotated. See here: ${outputFile}`);
          }
        });
    } catch (error) {
      console.error(error.message);
    }
  })  
  .on('--help', () => {
    console.log('\nUsage:');
    console.log('  img-cli rotate <inputFile> <rotateAngle>');
    console.log('\nExamples:');
    console.log('  $ img-cli rotate input.jpg 90');
    console.log('  $ img-cli rotate input.jpg -45');
    console.log('\nNote:');
    console.log('  The <rotateAngle> can be any positive or negative angle.');
  });

export default rotateCommand;
