#!/bin/bash

# Get the version from user input
read -p "Enter the version (e.g., 3.0.0): " version

# Update package.json version and index.js
npm version $version
sed -i "s/version('.*')/version('$version')/" index.js

npm run test

# Commit and tag the changes
git add .
git commit -m "Bumped version to $version"
git tag -a "v$version" -m "Version $version"
git push origin main
git push --tags

# Publish to npm
npm publish