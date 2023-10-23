#!/usr/bin/env node

import { Command } from "commander";
const commander = new Command();
import sharp from "sharp";
import { extname, basename, join, dirname } from "path";

async function imageCliTool() {
  
  // define basic info of the package
  commander
    .name("Image CLI tool")
    .description(
      "Image CLI tool that helps in manipulating images using your terminal."
    )
    .version("1.0.0");

  // create image compress command
  commander
    .command("compress")
    .argument("<inputFile>", "image name")
    .description("Compress an image")
    .action(async (inputFile) => {
      try {
        // create output file name
        const outputFileName = basename(inputFile, extname(inputFile)) + "_compressed.jpeg"; // assuming the user may give absolute path
        const outputPath = join(dirname(inputFile), outputFileName);

        // compress input file
        const info = await sharp(inputFile).jpeg({ quality: 60 }).toFile(outputPath);
        console.log("Image compressed:", info);
      } catch (err) {
        console.error(err);
      }
    });

  // create image convert command
  commander
    .command("convert")
    .argument("<inputFile>", "image name")
    .argument("<outputFile>", "image name")
    .description("Convert an image to another format")
    .action(async (inputFile, outputFile) => {
      try {
        const info = await sharp(inputFile).toFile(outputFile);
        console.log("Image converted:", info);
      } catch (err) {
        console.error(err);
      }
    });

  // create image info command to know details of an image
  commander
    .command("info")
    .argument("<inputFile>", "image name")
    .description("Get information about an image")
    .action(async (inputFile) => {
      try {
        const metadata = await sharp(inputFile).metadata();
        console.log("Image information:", metadata);
      } catch (err) {
        console.error(err);
      }
    });

  // create image rotate
  commander
  .command('rotate <inputFile> <outputFile> <rotateAngle>')
  .description('Rotate an image by a specified angle')
  .action(async (inputFile, outputFile, rotateAngle) => {
    try {
      const angle = parseInt(rotateAngle); // Convert the angle to an integer
      const rotate = await sharp(inputFile).rotate(angle)
        .toFile(outputFile, (err, info) => {
          if (err) {
            console.error(err.message);
          } else {
            console.log('Image rotated');
          }
        });
    } catch (error) {
      console.error(error.message);
    }
  });
  try {
    // Parse command-line arguments
    await commander.parseAsync(process.argv);
  } catch (err) {
    console.error(err);
  }
}

export default imageCliTool;

imageCliTool();
