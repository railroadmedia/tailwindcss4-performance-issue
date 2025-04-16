# UI Component Architecture

## Overview

The `ui` directory contains truly domain-agnostic UI components that form our design system. These components represent the foundation of our application's visual language, completely separated from any business logic or domain knowledge.

## Purpose & Criteria

Components in the `ui` directory should follow the "open-source UI library" rule of thumb:

> If the component cannot be published as a standalone open-source UI library without modification, it doesn't belong in the `ui` directory.

These components:

- Are completely domain-agnostic
- Have no knowledge of application business logic
- Use generic terminology, not domain-specific language
- Focus solely on presentation concerns
- Are highly reusable across any context

## Structure

The `ui` directory organizes components by their functional categories, with each component having its own dedicated folder:

```
src/
└── ui/
    ├── actions/
    │   ├── MuDropdown/
    │   │   ├── MuDropdown.vue
    │   │   ├── MuDropdown.test.ts
    │   │   └── MuDropdown.stories.ts (optional)
    │   ├── MuDropdownWrapper/
    │   │   └── ...
    │   └── MuTabButton/
    │       ├── MuTabButton.vue
    │       ├── MuTabButton.test.ts
    │       └── MuTabButton.stories.ts
    ├── buttons/
    │   └── ...
    ├── cards/
    │   └── ...
    ├── inputs/
    │   └── ...
    ├── modals/
    │   └── ...
    ├── sections/
    │   └── ...
    ├── typography/
    │   └── ...
    └── user/
        └── ...
```

## Implementation

UI components should:

- **Be presentation-focused**: Handle styling, animations, and interactions only
- **Be highly configurable**: Accept props for customization
- **Emit events**: Rather than containing business logic
- **Be responsive**: Work across different screen sizes
- **Follow accessibility standards**: Be usable by everyone
- **Implement design tokens**: Use design system variables, not hardcoded values
- **Be well-documented**: Include usage examples and prop documentation
- **Have unit tests**: Each component MUST have accompanying unit tests
- **Consider storybook**: Storybook documentation is optional but recommended

## Testing Requirements

- Every UI component **must** have unit tests
- Tests should verify component behavior with different props and states
- Tests should validate that events are emitted correctly
- Tests should check accessibility compliance where applicable
- Visual regression tests are recommended for complex components

## Examples

### Appropriate for `ui` directory:

- Buttons
- Form controls (inputs, selects, checkboxes)
- Layout components (cards, containers, grids)
- Navigation components (tabs, pagination)
- Feedback indicators (loaders, alerts)
- Typography components (headings, text, links)

### NOT appropriate for `ui` directory:

- `ChallengeCard` (domain-specific)
- `RecentLessonsList` (domain-specific)
- Any component using module-specific terminology

## Best Practices

- Keep components small and focused on a single responsibility
- Use generic naming conventions without domain-specific terms
- Thoroughly test components for cross-browser compatibility
- Always include unit tests for every component (required)
- Consider adding storybook documentation (optional)
- Document all props, events, and slots
- Use design tokens for colors, spacing, typography, etc.
- Maintain a consistent API pattern across similar components
- Ensure all components are accessible (WCAG compliant)
- Avoid fetching data or referencing application state
- Compose complex components from simpler UI components

## Relationship to Modules

- Modules import and use UI components, not the other way around
- UI components should never import anything from module directories
- If a module-specific component needs UI component functionality, compose it by importing UI components
- When a module component pattern becomes common across modules, consider if a generic version belongs in the UI directory
