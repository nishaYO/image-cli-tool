import { Command } from "commander";
import sharp from "sharp";
import { extname, resolve, dirname } from "path";
import {generateUniqueFilename} from "../fileUtils.js"
import { logError, logFilePath, logSuccess } from '../utils/colorFormatOutput.js';

const convertCommand = new Command();

convertCommand
  .name("convert")
  .arguments('<inputFile> <outputFile>')
  .description('Convert an image to another format')
  .action(async (inputFile, outputFile) => {
    try {

      // fetch extension of both the inputFile and outputFile
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
      logSuccess(`Image converted from ${inputFormat} to ${outputFormat} format.`, );
      logFilePath(`See here: ${outputPath}`);
    } catch (err) {
      logError(err.message);
    }
  })
    // help option for subcommand convert
  .on('--help', () => {
    logSuccess('\nUsage:');
    logSuccess('  img-cli convert <inputFile> <outputFile>');
    logSuccess('\nExamples:');
    logSuccess('  $ img-cli convert input.jpg output.jpeg');
    logSuccess('\nNote:');
    logSuccess('  The <inputFile> and <outputFile> must have different formats.');
  });

export default convertCommand;
