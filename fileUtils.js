import { extname, basename, resolve, dirname } from "path";
import { existsSync } from "fs"; // To check if a file exists

/**
 * Generate a unique filename by appending optional suffixes and counting if necessary.
 * @param {string} inputFile - Original filename.
 * @param {string} suffix_1 - First optional suffix.
 * @param {string} suffix_2 - Second optional suffix.
 * @returns {string} - Unique filename.
 */

export function generateUniqueFilename(inputFile, suffix_1 = "", suffix_2 = "") {
  // Generate initial filename
  let outputFile = generateFilenameWithCount(inputFile, suffix_1, suffix_2);
  let outputPath = resolve(dirname(inputFile), outputFile);
  
  // Check for filename collisions and increment count if needed
  let count = 0;
  while (existsSync(outputPath)) {
    count++;
    outputFile = generateFilenameWithCount(inputFile, suffix_1, suffix_2, count);
    outputPath = resolve(dirname(inputFile), outputFile);
  }

  return outputPath;
}

/**
 * Generate filename with optional suffixes and count.
 * @param {number|string} count - Count to append to the filename.
 * @returns {string} - Generated filename.
 */
function generateFilenameWithCount(inputFile, suffix_1, suffix_2, count = "") {
  const base = basename(inputFile, extname(inputFile));
  const extension = extname(inputFile);

  // Append count to filename only if count is provided
  if (count !== "") {
    count = `_(${count})`; //example : myimg_rotated_90_(1).png
  }
  return `${base}${suffix_1}${suffix_2}${count}${extension}`;
}
