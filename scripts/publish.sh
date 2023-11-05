#!/bin/bash

# Function to prompt user for confirmation
confirm() {
    read -r -p "${1:-Are you sure? [y/N]} " response
    case "$response" in
        [yY][eE][sS]|[yY]) 
            true
            ;;
        *)
            false
            ;;
    esac
}

# Navigate to the root directory
cd ..

# Get the version from user input
read -p "Enter the version (e.g., 3.0.0): " version

# Update package.json version and index.js
npm version $version
sed -i "s/version('.*')/version('$version')/" index.js

# Run tests and proceed only if tests pass
if npm run test; then
    # Commit and tag the changes
    git add .
    git commit -m "Bumped version to $version"
    git tag -a "v$version" -m "Version $version"
    git push origin main
    git push --tags

    # Confirm before publishing to npm
    confirm "Do you want to publish to npm? [y/N]" && npm publish
else
    echo "Tests failed. Aborting publish process."
fi