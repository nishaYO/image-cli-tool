#!/usr/bin/env node

import { Command } from "commander";
const commander = new Command();
import compressCommand from "./commands/compress.js";
import convertCommand from "./commands/convert.js";
import infoCommand from "./commands/get_info.js";
import rotateCommand from "./commands/rotate.js";

async function imageCliTool() {
  
  // define basic info of the package
  commander
    .name("Image CLI tool")
    .description(
      "Image CLI tool that helps in manipulating images using your terminal."
    )
    .version('2.5.0');

  // add imported module commands
  commander.addCommand(compressCommand);
  commander.addCommand(convertCommand);
  commander.addCommand(infoCommand);
  commander.addCommand(rotateCommand);

  try {
    // Parse command-line arguments
    await commander.parseAsync(process.argv);
  } catch (err) {
    console.error(err);
  }
}

export default imageCliTool;

imageCliTool();
