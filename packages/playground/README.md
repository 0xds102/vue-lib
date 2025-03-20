# DevUI Component Library Playground

This is the development and testing environment for the DevUI component library.

## Development Workflow

We use a specific workflow for component development:

### Component Development

1. Develop components in the `packages/playground/src/components/ui` directory
2. Test and showcase them in playground views
3. Use the save-components script to copy finished components to the components package

```sh
# Copy components from playground to components package
pnpm run save-components
```

This workflow ensures proper CSS processing with Tailwind v4 during development, while maintaining a clean component repository for distribution.

### Why This Approach

Due to the way Tailwind v4 processes CSS classes, we develop components directly in the playground where Tailwind can "see" them. Once components are ready, we copy them to the components package which serves as our source of truth for the CLI and distribution.

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```
