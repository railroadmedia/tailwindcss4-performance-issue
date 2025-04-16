/**
 * Breakpoints in pixels, corresponding to CSS variables
 * Used for consistency between CSS and JavaScript logic
 * @see https://tailwindcss.com/docs/breakpoints
 *
 * IMPORTANT: Keep in sync with CSS variables in style.css
 */
export const muBreakpoints: Record<string, number> = {
  xs: 0, // 0rem
  sm: 768, // 48rem
  md: 1024, // 64rem
  lg: 1366, // 85.375rem
  xl: 1536, // 96rem
  '2xl': 1920, // 120rem
} as const
