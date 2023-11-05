#!/bin/bash


# Purpose: Automate the process of updating the codebase, running tests, committing changes, and optionally merging dev into main.
#          Its not that I love writing unnecessary scripts but just that I am lazy to run all the commands manually on terminal!

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

# Get commit name from user input
read -p "Enter commit name: " commit_name

# Run tests and proceed only if tests pass
if npm test; then
    # Tests passed, proceed with commit and push
    git add .
    git commit -m "$commit_name"

    # Push to the current branch
    git push

    # Ask for confirmation to merge dev into main
    if confirm "Do you want to merge dev into main? (y/n): "; then
        git checkout main
        git pull origin main
        git merge dev
        git push origin main
        git checkout dev
    else
        echo "Skipping merge of dev into main."
    fi

    echo "Update script completed successfully."
else
    # Tests failed, display an error message
    echo "Tests failed. Please fix the issues before committing."
fi
