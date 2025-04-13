# Melony - Modern Monorepo Starter Kit 🚀

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org/)
[![PNPM](https://img.shields.io/badge/pnpm-9.0.0-blue)](https://pnpm.io/)

Melony is a powerful, production-ready monorepo starter kit built with Turborepo, Next.js, and TypeScript. It provides a modern development environment with best practices and optimized tooling for building scalable applications.

## ✨ Features

- 🏗️ **Monorepo Architecture**: Built with Turborepo for efficient package management
- ⚡ **Next.js**: Modern React framework for building web applications
- 📦 **Package Management**: Uses PNPM for fast and efficient dependency management
- 🔍 **TypeScript**: Full TypeScript support for type-safe development
- 🎨 **UI Components**: Shared component library for consistent design
- 🛠️ **Development Tools**:
  - ESLint for code linting
  - Prettier for code formatting
  - TypeScript configuration
  - Remote caching support

## 📦 Project Structure

```
melony/
├── apps/
│   └── web/          # Next.js web application
├── packages/
│   ├── melony/       # Core package
│   ├── next/         # Next.js configuration
│   ├── ui/           # Shared UI components
│   ├── eslint-config/ # ESLint configuration
│   └── typescript-config/ # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- PNPM >= 9.0.0

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/melony.git
cd melony
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

## 🛠️ Development

- **Build**: `pnpm build`
- **Development**: `pnpm dev`
- **Lint**: `pnpm lint`
- **Format**: `pnpm format`
- **Type Checking**: `pnpm check-types`

## 🔄 Remote Caching

Melony supports Turborepo's remote caching for faster builds. To enable:

1. Create a Vercel account
2. Run `npx turbo login`
3. Link your repository: `npx turbo link`

## 📚 Documentation

- [Turborepo Documentation](https://turbo.build/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [PNPM Documentation](https://pnpm.io/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Turborepo](https://turbo.build/) for the amazing monorepo tooling
- [Next.js](https://nextjs.org/) for the React framework
- [PNPM](https://pnpm.io/) for efficient package management
