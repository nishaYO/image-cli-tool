import { Command } from "commander";
import sharp from "sharp";
import { extname } from "path";

const convertCommand = new Command();

convertCommand
  .name("convert")
  .arguments('<inputFile> <outputFile>')
  .description('Convert an image to another format')
  .action(async (inputFile, outputFile) => {
    try {
      const inputFormat = extname(inputFile);
      const outputFormat = extname(outputFile);

      // throw error if input and outfile have same extension
      if (inputFormat == outputFormat){
        throw Error(`The format of <inputFile> and <outputFile> cannot be same. Both files have same format: ${inputFormat}`);
      }

      // convert file format
      const info = await sharp(inputFile).toFile(outputFile);
      console.log(`Image converted from ${inputFormat} to ${outputFormat} format.`, );
    } catch (err) {
      console.error(err.message);
    }
  });

export default convertCommand;
