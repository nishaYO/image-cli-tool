// Import necessary modules
import { execSync } from 'child_process';
import { expect } from 'chai';
import fs from 'fs';


// Describe block for 'convert' command tests
describe('Convert Command Tests', function () {
  
  // Test case 1: Proper command
  it('should convert image from PNG to JPEG', function () {
    const result = execSync('node ./index.js convert ./myimg.png ./myimg.jpeg').toString();
    expect(result).to.include('Image converted from .png to .jpeg');
  });

  // Test case 2: When outputFile arg not given
  it('should handle missing output file argument', function () {
    try {
      // Run the command and capture the result
      const result = execSync('node ./index.js convert ./myimg.png');
    } catch (error) {
      // Check if the expected error message is present in the stderr
      const errMsg = "error: missing required argument 'outputFile'";
      expect(error.stderr.toString()).to.include(errMsg);
    }
  });
  // // Test case 3: When both the args outputFile and inputFile are missing
  it('should handle missing input and output file arguments', function () {
    try {
      // Run the command and capture the result
      const result = execSync('node ./index.js convert');
    } catch (error) {
      // Check if the expected error message is present in the stderr
      const errMsg = "error: missing required argument 'inputFile'";
      expect(error.stderr.toString()).to.include(errMsg);
    }
  });

  // // Test case 4: When inputFile doesn't exist
  it('should handle non-existent inputFile argument', function () {
    try {
      // Run the command and capture the result
      const result = execSync('node ./index.js convert ./myimg.jpg ./myimg.tiff');
    } catch (error) {
      // Check if the expected error message is present in the stderr
      const errMsg = "Input file is missing: ./myimg.jpg";
      expect(error.stderr.toString()).to.include(errMsg);
    }
  });

  // Cleanup after testing
  after(function () {
    // Delete temporary file created during testing
    fs.unlinkSync('./myimg.jpeg');
  });
});
