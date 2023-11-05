#!/bin/bash

# Purpose: Clean the root directory from image files created during manual testing,
#          excluding the essential "myimg.png" file needed for package functions.

# Delete files starting with "myimg" except for "myimg.png"
find ../ -name 'myimg*' ! -name 'myimg.png' -exec rm {} +

echo "Files deleted successfully."
