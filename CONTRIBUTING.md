# Contributing Guidelines

## Development Setup

```bash
# Clone repository
git clone <repository-url>
cd privacy-cash-402-sdk

# Install dependencies
npm install

# Build
npm run build

# Run examples
npm run example
```

## Project Structure

```
privacy-cash-402-sdk/
├── src/
│   ├── index.ts           # Main SDK
│   └── middleware.ts      # Express middleware
├── examples/
│   ├── basic-usage.js
│   ├── express-integration.js
│   └── manual-operations.js
├── dist/                  # Build output
└── package.json
```

## Code Style

- TypeScript for all source files
- ES2020 target
- Strict type checking enabled
- No console.log in production code
- Comprehensive error handling

## Testing

```bash
# Unit tests
npm test

# Integration tests
npm run test:integration

# E2E tests (requires mainnet)
npm run test:e2e
```

## Pull Request Process

1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Update documentation
5. Submit pull request

## Commit Messages

Format: `type(scope): description`

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- refactor: Code refactoring
- test: Testing
- chore: Maintenance

## Release Process

1. Update version in package.json
2. Update CHANGELOG.md
3. Create GitHub release
4. Publish to npm

## Questions

Open an issue for questions or discussions.

