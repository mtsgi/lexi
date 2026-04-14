# GitHub Copilot Instructions for Lexi

## Project Overview
Lexi is a simple web-based translator application that leverages the browser's built-in Translation API. It's built with Vue 3, TypeScript, and Vite.

## Tech Stack
- **Frontend**: Vue 3 with Composition API
- **Language**: TypeScript (strict mode enabled)
- **Build Tool**: Vite
- **Styling**: Scoped CSS with CSS custom properties
- **APIs**: Web Translation API (experimental browser feature)

## Architecture Guidelines

### Component Structure
- Use Vue 3 Composition API with `<script setup lang="ts">`
- Follow PascalCase naming for components (e.g., `BaseButton.vue`, `AppHeader.vue`)
- Organize components in `/src/components/` directory
- Use descriptive component names that indicate their purpose

### TypeScript Standards
- Always use `lang="ts"` in `<script setup>` blocks
- Enable strict TypeScript settings (already configured)
- Use proper typing for refs: `const myRef = ref<string>('')`
- Handle async/await with proper error typing: `catch (error: unknown)`
- Type function parameters explicitly, especially for event handlers

### Styling Conventions
- Use **scoped CSS** for all component styles
- Follow existing color scheme with CSS custom properties:
  - Primary colors: `#6366F1`, `#3B82F6`, `#06B6D4` (gradient)
  - Text: `rgba(255, 255, 255, 0.87)` (dark mode), `#213547` (light mode)
  - Background: `#242424` (dark mode), `#ffffff` (light mode)
- Use consistent spacing units: `0.5em`, `1em`, `1.2em`
- Use `border-radius: 0.5em` for rounded corners
- Support both light and dark color schemes with `@media (prefers-color-scheme: light)`

### Component Patterns

#### Base Components
- Create reusable base components (like `BaseButton.vue`)
- Use slots for flexible content: `<slot />`
- Apply consistent styling across base components

#### Form Elements
- Use `v-model` for two-way data binding
- Provide meaningful placeholder text
- Handle readonly states appropriately
- Use semantic HTML elements (`<textarea>` for multiline text)

#### Layout Components
- Use CSS Grid and Flexbox for layouts
- Apply responsive design principles
- Center content with `margin: 0 auto` and `max-width`

### Web API Integration
- Check for API availability before usage: `'Translator' in self`
- Handle API unavailability gracefully with user feedback
- Use async/await pattern for API calls
- Implement proper loading states and progress feedback
- Handle errors with meaningful alert messages

### Error Handling
- Always check for browser API support
- Provide user-friendly error messages via `alert()` (current pattern)
- Handle both API availability and runtime errors
- Use try-catch blocks for async operations

### State Management
- Use Vue's `ref()` for reactive state
- Keep component state local when possible
- Use descriptive variable names: `sourceLanguage`, `targetLanguage`, `translator`

### Development Workflow
- Use `npm run dev` for development server
- Use `npm run build` for production builds
- Ensure TypeScript compilation passes with `vue-tsc -b`
- Follow existing package.json scripts

## Code Examples

### Component Template
```vue
<template>
  <div class="component-name">
    <!-- Use semantic HTML -->
    <!-- Provide meaningful attributes -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// Import other components with .vue extension

// Properly typed refs
const myValue = ref<string>('')

// Async functions with error handling
const handleAsync = async (): Promise<void> => {
  try {
    // API call
  } catch (error: unknown) {
    if (error instanceof Error) {
      alert(`Error: ${error.message}`)
    }
  }
}
</script>

<style scoped>
.component-name {
  /* Use existing design tokens */
  /* Support both light and dark themes */
}
</style>
```

### API Integration Pattern
```typescript
// Check for API support
const supported = 'ApiName' in self

// Handle API availability
if (!supported) {
  alert('Your browser does not support this API.')
  return
}

// Async API usage with proper error handling
try {
  const result = await SomeAPI.method()
  // Handle result
} catch (error: unknown) {
  if (error instanceof Error) {
    alert(`API Error: ${error.message}`)
  }
}
```

## Best Practices
1. **Type Safety**: Always use TypeScript properly - no implicit `any` types
2. **User Experience**: Provide loading states and error feedback
3. **Accessibility**: Use semantic HTML and proper ARIA attributes where needed
4. **Performance**: Use Vue's reactivity system efficiently
5. **Maintainability**: Keep components focused and reusable
6. **Browser Compatibility**: Check for API support before usage
7. **Consistency**: Follow existing patterns in the codebase

## File Structure
```
src/
├── App.vue                 # Main application component
├── main.ts                # Application entry point
├── style.css              # Global styles
└── components/
    ├── AppHeader.vue      # Header component
    ├── AppFooter.vue      # Footer component
    ├── BaseButton.vue     # Reusable button component
    └── Translator.vue     # Main translator functionality
```

## Notes
- This project uses experimental Web APIs (Translation API) that may not be available in all browsers
- Always test in multiple browsers when working with experimental APIs
- The app is designed to be responsive and work on both desktop and mobile devices
- Follow the existing gradient color scheme for visual consistency