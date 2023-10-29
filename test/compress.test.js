// Import necessary modules
import { execSync } from "child_process";
import { expect } from "chai";
import fs from "fs";

// Describe block for 'compress' command tests
describe("Compress Command Tests", function () {
  // Test case 1: Successful compression with default quality
  it("should compress image with default quality", function () {
    const result = execSync("node ./index.js compress ./myimg.png").toString();
    expect(result).to.include("Image compressed down to 60%");
  });

  // Test case 2: Invalid quality value
  it("should handle invalid quality value", function () {
    try {
      // Run the command and capture the result
      const result = execSync("node ./index.js compress ./myimg.png -q 0");
    } catch (error) {
      // Check if the expected error message is present in the stderr
      const errMsg =
        "Invalid value for the quality option. Quality should be between 1 and 100.";
      expect(error.stderr.toString()).to.include(errMsg);
    }
  });

  // Test case 3: Successful compression with specified quality
  it("should compress image with specified quality", function () {
    const result = execSync(
      "node ./index.js compress ./myimg.png -q 80"
    ).toString();
    expect(result).to.include("Image compressed down to 80%");
  });

  // Test case 4: Missing quality argument
  it("should handle missing quality argument", function () {
    try {
      // Run the command and capture the result
      const result = execSync("node ./index.js compress ./myimg.png -q");
    } catch (error) {
      // Check if the expected error message is present in the stderr
      const errMsg = "error: option '-q, --quality <value>' argument missing";
      expect(error.stderr.toString()).to.include(errMsg);
    }
  });

  // Cleanup after testing
  after(function () {
    // Delete temporary file created during testing
    fs.unlinkSync("./myimg_compressed.png");
  });
});
