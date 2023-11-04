#!/bin/bash

# Delete files starting with "myimg" except for "myimg.png"
find . -name 'myimg*' ! -name 'myimg.png' -exec rm {} +

echo "Files deleted successfully."
