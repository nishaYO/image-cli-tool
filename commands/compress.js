import { Command } from "commander";
import sharp from "sharp";
import { resolve, dirname } from "path";
import { generateUniqueFilename } from "../fileUtils.js"

const compressCommand = new Command();

compressCommand
  .name("compress")
  .arguments('<inputFile>')
  .option('-q, --quality <value>', 'Set the quality of the compressed image between 1-100(default is 60)')
  .description('Compress an image')
  .action(async (inputFile, option) => {
    try {
      // create output file name
      const outputFileName = generateUniqueFilename(inputFile, "_compressed");
      const outputPath = resolve(dirname(inputFile), outputFileName);

      // check if the -q option value valid or not
      const qualityOption = parseInt(option.quality, 10)
      if (!isNaN(qualityOption) && (qualityOption > 100 || qualityOption < 1)) {
        throw new Error("Invalid value for the quality option. Quality should be between 1 and 100.");
      }

      const quality =  qualityOption || 60; //default compression: 60% 
      // compress input file
      const info = await sharp(inputFile).jpeg({ quality: quality }).toFile(outputFileName);
      console.log(`Image compressed down to ${quality}%.\nSee here: ${outputPath}`);
    } catch (err) {
      console.error(err.message);
    }
  })
  .on('--help', () => {
    console.log('\nUsage:');
    console.log('  img-cli compress <inputFile> [-q <quality>]');
    console.log('\nExamples:');
    console.log('  $ img-cli compress input.jpg');
    console.log('  $ img-cli compress input.jpg -q 80');
    console.log('\nNote:');
    console.log('  The value of -q should be between 1 and 100.');
});

export default compressCommand;