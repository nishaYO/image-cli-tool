import { Command } from "commander";
import sharp from "sharp";

const convertCommand = new Command();

convertCommand
  .name("convert")
  .arguments('<inputFile> <outputFile>')
  .description('Convert an image to another format')
  .action(async (inputFile, outputFile) => {
    try {
      const info = await sharp(inputFile).toFile(outputFile);
      console.log("Image converted:", info);
    } catch (err) {
      console.error(err);
    }
  });

export default convertCommand;
