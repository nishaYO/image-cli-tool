# Image-CLI-Tool 

[![npm version](https://img.shields.io/npm/v/image-cli-tool.svg)](https://www.npmjs.com/package/image-cli-tool)
[![npm weekly downloads](https://img.shields.io/npm/dw/image-cli-tool.svg)](https://www.npmjs.com/package/image-cli-tool)


An npm package to manipulate images using terminal.

# Installation

To install the image-cli-tool globally, use the following command:
```bash
npm install -g image-cli-tool
```

# Features of the image-cli-tool

- Compress an image
- Convert an image to another format
- Get image information
- Rotate Image by a specified angle

# Commands

## Image Compression

- `img-cli compress <input_file>`
  - **Example:**
    ```bash
    img-cli compress myimage.jpg
    ```

Default quality is 60%. 
- `img-cli compress <input_file> -q <quality>`
  - **Example:**
    ```bash
    img-cli compress myimage.jpg -q 80
    ```

# Image Conversion

- `img-cli convert <input_file.extension> <output_file.extension>`
- **Example:**
```bash
img-cli convert myimage.jpg myimage.png
```

# Get Image Information

- `img-cli info <input_file>`
- **Example:**
```bash
img-cli info myimage.jpg
```

 # Rotate an Image 

 - `img-cli rotate <input_file> <rotate_angle>`
 - **Example:**
 ```bash
 img-cli rotate myimage.jpg 90
 ```

# Contribute
Feel free to explore and contribute to the image-cli-tool! If you have any improvements or additional features inmind, open an issue or submit a pull request. I would be happy to merge🙂