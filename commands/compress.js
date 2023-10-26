import { Command } from "commander";
import sharp from "sharp";
import { extname, basename, resolve, dirname } from "path";

const compressCommand = new Command();

compressCommand
  .name("compress")
  .arguments('<inputFile>')
  .option('-q, --quality <value>', 'Set the quality of the compressed image between 1-100(default is 60)')
  .description('Compress an image')
  .action(async (inputFile, option) => {
    try {
      // create output file name
      const outputFile = basename(inputFile, extname(inputFile)) + "_compressed" + extname(inputFile);
      const outputPath = resolve(dirname(inputFile), outputFile);
      const qualityOption = parseInt(option.quality, 10)
      
      // check if the -q option value valid or not
      if (isNaN(qualityOption) || quality > 100 || quality < 1) {
        throw new Error("Invalid value for the quality option. Quality should be between 1 and 100.\n");
      }

      const quality =  qualityOption || 60; //default compression: 60% 
      // compress input file
      const info = await sharp(inputFile).jpeg({ quality: quality }).toFile(outputFile);
      console.log(`\nImage compressed down to ${quality}%.\n\nSee here: ${outputPath}\n\n`);
    } catch (err) {
      console.error(err.message);
    }
  });

export default compressCommand;
// create optional subcommands 