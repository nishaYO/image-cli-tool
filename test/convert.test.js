const { execSync } = require('child_process');
const { expect } = require('chai');

describe('Convert Command', function () {
  it('should convert image from PNG to JPEG', function () {
    const result = execSync('npx img-cli convert ./myimg.png ./myimg.jpeg').toString();
    expect(result).to.include('Conversion successful');
  });

  it('should handle missing input file for convert command', function () {
    const result = execSync('npx img-cli convert').toString();
    expect(result).to.include('Error: Missing input file');
  });

  // Add more test cases for the convert command

  after(function () {
    // Add cleanup or teardown logic if needed
  });
});
