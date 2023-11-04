import { extname, basename, resolve, dirname } from "path";
import { existsSync } from "fs"; // To check if a file exists

/**
 * Generate a unique filename by appending optional suffixes and counting if necessary.
 * @param {string} inputFile - Original filename.
 * @param {...string} args - Rest parameter for optional suffixes.
 * @returns {string} - Unique filename.
 */

export function generateUniqueFilename(inputFile, ...args) {
  // Generate initial filename
  let count = 0;
  let outputFile = generateFilenameWithCount(inputFile, count, ...args);
  let outputPath = resolve(dirname(inputFile), outputFile);
  
  // Check for filename collisions and increment count if needed
  while (existsSync(outputPath)) {
    count++;
    outputFile = generateFilenameWithCount(inputFile,  count, ...args);
    outputPath = resolve(dirname(inputFile), outputFile);
  }

  return outputPath;
}

/**
 * Generate filename with optional suffixes and count.
 * @param {number|string} count - Count to append to the filename.
 * @returns {string} - Generated filename.
 */
function generateFilenameWithCount(inputFile, count, ...args) {
  const base = basename(inputFile, extname(inputFile));
  const extension = extname(inputFile);

  // Append count to filename only if count is provided
  console.log("count ",count);  //0
  const fileCount = count!=0? `_(${count})` : ""; 
  
  // Concatenate rest parameters as additional suffixes
  const additionalSuffixes = args.length !== 0 ? "_" + args.join("_"): ""; 

  return `${base}${additionalSuffixes}${fileCount}${extension}`;
}
