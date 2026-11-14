// Sections used to fade in as they scrolled into view. They now render in place:
// content is visible at once, without JavaScript, at any scroll speed. These
// wrappers remain so section markup keeps its layout hooks.
export const Reveal = ({ children, className = '' }) => (
  <div className={`relative ${className}`}>
    <div>{children}</div>
  </div>
)

export const Stagger = ({ children, className = '' }) => (
  <div className={className}>{children}</div>
)
