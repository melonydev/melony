# Melony

A modern React component library for building beautiful user interfaces.

## Installation

```bash
npm install melony
```

## Usage

```tsx
import { Button, Card, Input } from 'melony';

function App() {
  return (
    <Card>
      <Input placeholder="Enter your name" />
      <Button>Submit</Button>
    </Card>
  );
}
```

## Features

- 🎨 Modern and clean UI components
- 📦 Lightweight and performant
- 🔧 TypeScript support
- 🎯 Built with React 18
- 🛠️ Easy to customize

## Available Components

- Basics (Button, Text, etc.)
- Layouts (Grid, Stack, etc.)
- Inputs (TextInput, Select, etc.)
- Feedback (Alert, Toast, etc.)
- Presentation (Card, Modal, etc.)
- Data (Table, List, etc.)
- Overlays (Tooltip, Popover, etc.)

## Development

```bash
# Install dependencies
npm install

# Start development mode
npm run dev

# Build the package
npm run build

# Publish new version
npm run publish:patch  # for patch version
npm run publish:minor  # for minor version
npm run publish:major  # for major version
```

## License

MIT
