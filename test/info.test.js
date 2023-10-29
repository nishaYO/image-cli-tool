// Import necessary modules
import { execSync } from 'child_process';
import { expect } from 'chai';

// Describe block for 'info' command tests
describe('Info Command Tests', function () {
  
  // Test case 1: Successful info command
  it('should display image information for a valid PNG file', function () {
    const result = execSync('node ./index.js info ./myimg.png').toString();
    expect(result).to.include('Image information');
    expect(result).to.include("Format: 'png'");
  });

  // Test case 2: When inputFile arg not given
  it('should handle missing input file argument', function () {
    try {
      // Run the command and capture the result
      const result = execSync('node ./index.js info');
    } catch (error) {
      // Check if the expected error message is present in the stderr
      const errMsg = "error: missing required argument 'inputFile'";
      expect(error.stderr.toString()).to.include(errMsg);
    }
  });

  // Test case 3: Unsupported image format
  it('should handle unsupported image format in inputFile argument', function () {
    try {
      // Run the command and capture the result
      const result = execSync('node ./index.js info ./README.md');
    } catch (error) {
      // Check if the expected error message is present in the stderr
      const errMsg = "[Error: Input file contains unsupported image format]";
      expect(error.stderr.toString()).to.include(errMsg);
    }
  });
});