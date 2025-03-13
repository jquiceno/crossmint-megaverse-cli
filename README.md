# Crossmint Megaverse Challenge CLI

A Command Line Interface (CLI) application that implements solutions for the Crossmint Megaverse Challenge. This CLI tool allows you to interact with the Crossmint API to create and manage entities in a grid-based universe.

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd crossmit-megaverse
```

2. Install dependencies:
```bash
npm install
```

## CLI Commands

This CLI tool provides several commands to interact with the Megaverse. Each command is designed to perform specific operations on the grid:

### Create Logo Challenge
Creates the Crossmint logo in the Megaverse using various entities:
- POLYANETs for the basic structure
- SOLOONs with different colors for visual elements
- COMETHs with different directions for dynamic elements

```bash
npm run create-logo
```

### Create X Pattern Challenge
Creates an X pattern in the Megaverse using POLYANETs. This command demonstrates the ability to create geometric patterns in the grid.

```bash
npm run create-x-pattern
```

### Clear Map
Removes all entities from the current map, effectively resetting it to its initial state.

```bash
npm run clear-map
```

## Command Output

Each command provides feedback in the console:
- Progress updates during execution
- Success/failure messages
- Any relevant error information

Example output:
```bash
$ npm run create-logo
Creating logo challenge...
Processing entities...
Logo challenge completed successfully!
```

## Project Structure

```
src/
├── modules/
│   ├── api-client/        # API client implementation
│   └── challenges/        # Challenge-specific logic
│       ├── application/   # Use cases
│       ├── domain/        # Domain models and services
│       └── infrastructure/# Infrastructure implementations
└── commands/             # CLI commands
```

## Architecture

The project follows a clean architecture pattern with the following layers:

- **Domain**: Contains business logic, entities, and interfaces
- **Application**: Implements use cases and orchestrates domain logic
- **Infrastructure**: Handles external concerns like API communication

## Testing

Run the test suite:

```bash
npm test
```

Run tests with coverage:

```bash
npm run test:cov
```

## Development

The project uses:
- NestJS for the application framework
- TypeScript for type safety
- Jest for testing
- ESLint and Prettier for code formatting

## License

MIT
