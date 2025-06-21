#!/bin/bash

# 🧙‍♀️ Elena's Elixirs Release Script

set -e  # Exit on any error

echo "🔮 Preparing mystical release ritual..."

# Check if we're on main branch
current_branch=$(git rev-parse --abbrev-ref HEAD)
if [ "$current_branch" != "main" ]; then
    echo "❌ You must be on main branch to create a release"
    echo "Current branch: $current_branch"
    exit 1
fi

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "❌ You have uncommitted changes. Please commit or stash them first."
    git status --short
    exit 1
fi

# Get current version
current_version=$(git describe --tags --abbrev=0 2>/dev/null || echo "v0.0.0")
echo "📚 Current version: $current_version"

# Show changes since last release
echo ""
echo "🌟 Changes since last release:"
git log $current_version..HEAD --oneline --no-merges

echo ""
echo "🎭 What type of release is this?"
echo "1) 🐛 Patch (bug fixes) - e.g., v1.0.0 → v1.0.1"
echo "2) ✨ Minor (new features) - e.g., v1.0.0 → v1.1.0"
echo "3) 💥 Major (breaking changes) - e.g., v1.0.0 → v2.0.0"
echo "4) 🔧 Custom version"
echo "5) ❌ Cancel"

read -p "Choose (1-5): " choice

case $choice in
    1)
        echo "🐛 Creating patch release..."
        npm version patch --no-git-tag-version
        ;;
    2)
        echo "✨ Creating minor release..."
        npm version minor --no-git-tag-version
        ;;
    3)
        echo "💥 Creating major release..."
        npm version major --no-git-tag-version
        ;;
    4)
        read -p "Enter custom version (e.g., 1.2.3): " custom_version
        echo "🔧 Setting custom version to v$custom_version..."
        npm version $custom_version --no-git-tag-version
        ;;
    5)
        echo "❌ Release cancelled"
        exit 0
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

# Get new version from package.json
new_version="v$(node -p "require('./package.json').version")"
echo "🌟 New version will be: $new_version"

# Create release notes
echo ""
echo "📝 Generating release notes..."
release_notes="Release $new_version

$(git log $current_version..HEAD --pretty=format:"- %s" --no-merges)

🧙‍♀️ Elena's mystical powers have been enhanced!"

# Confirm release
echo ""
echo "🔮 Ready to create release $new_version?"
echo "This will:"
echo "  - Commit version bump"
echo "  - Create git tag $new_version"
echo "  - Push to origin with tags"
echo ""
read -p "Continue? (y/N): " confirm

if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
    echo "❌ Release cancelled"
    # Reset package.json
    git checkout -- package.json 2>/dev/null || true
    exit 0
fi

# Commit version bump
echo "📚 Committing version bump..."
git add package.json
git commit -m "🚀 Release $new_version"

# Create tag
echo "🏷️ Creating tag $new_version..."
git tag -a $new_version -m "$release_notes"

# Push with tags
echo "⬆️ Pushing to origin..."
git push origin main --follow-tags

echo ""
echo "🎉 Release $new_version created successfully!"
echo "🔗 View on GitHub: https://github.com/filatova-elena/elenas-elixirs/releases/tag/$new_version"
echo ""
echo "🚀 Next steps:"
echo "1. Deploy to production: amplify env checkout prod && amplify publish"
echo "2. Create GitHub release notes"
echo "3. Announce the mystical update! ✨"