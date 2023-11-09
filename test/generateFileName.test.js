import { expect } from 'chai';
import { generateUniqueFilename } from "../utils/generateFileName.js"

describe('File Name Tests', function () {
  // Test case 1: Test generateUniqueFilename function for rotate command
  it('should generate a unique filename for rotate command', function () {
    const inputFile = './myimg.png';
    const suffixes = ['rotate', '90'];

    const generatedFilename = generateUniqueFilename(inputFile, ...suffixes);

    // check if the generated filename matches the expected pattern
    expect(generatedFilename).to.match(/myimg_rotate_90(_\(\d\))?\.png/);
  });

  // Test case 2: Test generateUniqueFilename function for compress command
  it('should generate a unique filename for compress command', function () {
    const inputFile = './myimg.png';
    const suffixes = ['compressed'];

    const generatedFilename = generateUniqueFilename(inputFile, ...suffixes);

    // check if the generated filename matches the expected pattern
    expect(generatedFilename).to.match(/myimg_compressed(_\(\d\))?\.png/);
  });

  // Test case 3: Test generateUniqueFilename function for convert command
  it('should generate a unique filename for convert command', function () {
    const inputFile = './myimg.png';
    const suffixes = ['converted', 'jpeg'];

    const generatedFilename = generateUniqueFilename(inputFile, ...suffixes);

    // check if the generated filename matches the expected pattern
    expect(generatedFilename).to.match(/myimg_converted_jpeg(_\(\d\))?\.png/);
  });

});
