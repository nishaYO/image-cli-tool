import { Command } from "commander";
import sharp from "sharp";
import { extname, basename, join, dirname } from "path";

const compressCommand = new Command();

compressCommand
  .name("compress")
  .arguments('<inputFile>')
  .description('Compress an image')
  .action(async (inputFile) => {
    try {
      // create output file name
      const outputFileName = basename(inputFile, extname(inputFile)) + "_compressed.jpeg";
      const outputPath = join(dirname(inputFile), outputFileName);

      // compress input file
      const info = await sharp(inputFile).jpeg({ quality: 60 }).toFile(outputPath);
      console.log("Image compressed:", info);
    } catch (err) {
      console.error(err);
    }
  });

export default compressCommand;
