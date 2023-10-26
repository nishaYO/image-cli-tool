import { Command } from "commander";
import sharp from "sharp";
import { extname, basename, resolve, dirname } from "path";

const compressCommand = new Command();

compressCommand
  .name("compress")
  .arguments('<inputFile>')
  .description('Compress an image')
  .action(async (inputFile) => {
    try {
      // create output file name
      const outputFile = basename(inputFile, extname(inputFile)) + "_compressed" + extname(inputFile);
      const outputPath = resolve(dirname(inputFile), outputFile);
      const quality = 60
      // compress input file
      const info = await sharp(inputFile).jpeg({ quality: quality }).toFile(outputFile);
      console.log(`\nImage compressed down to ${quality}%.\n\nSee here: ${outputPath}\n\n`);
    } catch (err) {
      console.error(err);
    }
  });

export default compressCommand;
