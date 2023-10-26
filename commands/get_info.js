import { Command } from "commander";
import sharp from "sharp";

const infoCommand = new Command();

infoCommand
  .name("info")
  .arguments('<inputFile>')
  .description('Get information about an image')
  .action(async (inputFile) => {
    try {
      const metadata = await sharp(inputFile).metadata();
      console.log("Image information:", metadata);
    } catch (err) {
      console.error(err);
    }
  });

export default infoCommand;
