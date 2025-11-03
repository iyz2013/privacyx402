#!/bin/bash

# Upload Privacy Cash 402 SDK to GitHub
# Repository: https://github.com/toursoflife/privacy402.git

echo "Privacy Cash 402 SDK - GitHub Upload Script"
echo "=========================================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "Error: git is not installed"
    exit 1
fi

# Navigate to framework directory
cd "$(dirname "$0")"

echo "Step 1: Initializing git repository..."
git init

echo ""
echo "Step 2: Adding remote repository..."
git remote add origin https://github.com/toursoflife/privacy402.git

echo ""
echo "Step 3: Creating .gitignore (if not exists)..."
if [ ! -f .gitignore ]; then
    cat > .gitignore << 'EOF'
node_modules/
dist/
.env
*.log
.DS_Store
cache/
.vscode/
.idea/
EOF
fi

echo ""
echo "Step 4: Adding all files..."
git add .

echo ""
echo "Step 5: Creating initial commit..."
git commit -m "Initial release: Privacy Cash 402 SDK v1.0.0

Features:
- Privacy Cash SDK integration
- Zero-knowledge proof support
- Express middleware for 402 payments
- TypeScript support with full type definitions
- Comprehensive documentation with Mermaid diagrams
- Multiple usage examples

Documentation:
- 8 Mermaid diagrams
- 20+ reference tables
- Complete API documentation
- Installation and quick start guides

Clean, professional, production-ready."

echo ""
echo "Step 6: Creating main branch..."
git branch -M main

echo ""
echo "Step 7: Pushing to GitHub..."
echo "You may be prompted for GitHub credentials"
echo ""

git push -u origin main

echo ""
echo "=========================================="
echo "Upload complete!"
echo ""
echo "Repository: https://github.com/toursoflife/privacy402"
echo ""
echo "Next steps:"
echo "1. Visit the repository on GitHub"
echo "2. Add repository description and topics"
echo "3. Enable GitHub Pages for documentation"
echo "4. Set up branch protection rules"
echo "5. Create release v1.0.0"
echo ""

