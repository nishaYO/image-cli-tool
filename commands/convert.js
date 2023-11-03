import { Command } from "commander";
import sharp from "sharp";
import { extname, resolve, dirname } from "path";
import {generateUniqueFilename} from "../fileUtils.js"


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
      // create output file absolute path
      const outputFileName = generateUniqueFilename(outputFile);
      const outputPath = resolve(dirname(inputFile), outputFileName);

      // convert file format
      const info = await sharp(inputFile).toFile(outputFileName);
      console.log(`Image converted from ${inputFormat} to ${outputFormat} format.\nSee here: ${outputPath}`, );
    } catch (err) {
      console.error(err.message);
    }
  }).on('--help', () => {
    console.log('\nUsage:');
    console.log('  img-cli convert <inputFile> <outputFile>');
    console.log('\nExamples:');
    console.log('  $ img-cli convert input.jpg output.jpeg');
    console.log('\nNote:');
    console.log('  The <inputFile> and <outputFile> must have different formats.');
  });

export default convertCommand;
