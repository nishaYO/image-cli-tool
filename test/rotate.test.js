// Import necessary modules
import { execSync } from 'child_process';
import { expect } from 'chai';
import fs from 'fs';

// Describe block for 'rotate' command tests
describe('Rotate Command Tests', function () {
  let rotatedImageFile;

  // Test case 1: Successful rotation with specified angle
  it('should rotate image with specified angle', function () {
    const result = execSync('node ./index.js rotate ./myimg.png 30').toString();
    expect(result).to.include('Image rotated');
    rotatedImageFile = './myimg_rotated_30.png';
  });

  // Test case 2: Missing rotateAngle argument
  it('should handle missing rotateAngle argument', function () {
    try {
      // Run the command and capture the result
      const result = execSync('node ./index.js rotate ./myimg.png');
    } catch (error) {
      // Check if the expected error message is present in the stderr
      const errMsg = "error: missing required argument 'rotateAngle'";
      expect(error.stderr.toString()).to.include(errMsg);
    }
  });

  // Test case 3: Missing rotateAngle argument for non-existent file
  it('should handle non-existent file', function () {
    try {
      // Run the command and capture the result
      const result = execSync('node ./index.js rotate ./myimg.jpeg 90');
    } catch (error) {
      // Check if the expected error message is present in the stderr
      const errMsg = "Input file is missing: ./myimg.jpeg";
      expect(error.stderr.toString()).to.include(errMsg);
    }
  });

  // Cleanup after testing
  after(function () {
    // Delete rotated image file created during testing
    if (rotatedImageFile && fs.existsSync(rotatedImageFile)) {
      fs.unlinkSync(rotatedImageFile);
    }
  });
});
