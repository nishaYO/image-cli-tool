import { Command } from "commander";
import sharp from "sharp";
import { extname, resolve } from "path";
const infoCommand = new Command();

infoCommand
  .name("info")
  .arguments('<inputFile>')
  .description('Get information about an image')
  .action(async (inputFile) => {
    try {
      const metadata = await sharp(inputFile).metadata();
      const imageInfo = {
        Format: (extname(inputFile).slice(1)) || "Unknown",
        Location: resolve(inputFile) || "Unknown",
        Width: metadata.width || "Unknown",
        Height: metadata.height || "Unknown",
        Density: metadata.density || "Unknown",
        IsProgressive: metadata.isProgressive || "Unknown",
        // todos
        // FileSize: metadata.size || "Unknown",
        // createdWhen: "Information not available",
        // geoCoordinates: "Information not available",
      };
      console.log("Image information\n", imageInfo);
    } catch (err) {
      console.error(err);
    }
  });

export default infoCommand;
