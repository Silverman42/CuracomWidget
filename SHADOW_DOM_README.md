# Shadow DOM Encapsulation

This widget now uses Shadow DOM encapsulation to prevent style leakage and ensure complete isolation from the host page's CSS.

## What is Shadow DOM?

Shadow DOM is a web standard that allows you to create a separate DOM tree that is isolated from the main document's DOM. This provides:

- **Style Encapsulation**: CSS styles inside the shadow DOM cannot leak out, and external styles cannot penetrate in
- **DOM Encapsulation**: The internal structure is hidden from the main document
- **Event Isolation**: Events can be contained within the shadow DOM

## Implementation Details

### Custom Element Class

The widget is implemented as a custom element class that extends `HTMLElement`:

```typescript
class CuracomPlugin extends HTMLElement {
  constructor() {
    super()

    // Create shadow root with closed mode for maximum encapsulation
    const shadow = this.attachShadow({ mode: 'closed' })

    // Create a container for the Vue app
    const container = document.createElement('div')
    shadow.appendChild(container)

    // Inject styles into shadow DOM first
    this.injectStyles(shadow)

    // Create and mount the Vue app inside the shadow DOM
    this.app = createApp(App)
    this.app.mount(container)
  }
}
```

### Shadow Root Mode

We use `mode: 'closed'` for maximum encapsulation:

- **Closed mode**: The shadow root is completely inaccessible from outside
- **Open mode**: The shadow root can be accessed via `element.shadowRoot`

### Style Injection

Styles are automatically extracted and injected into the shadow DOM:

1. **Extract existing styles**: All current `<style>` tags and stylesheets are processed
2. **Inject into shadow DOM**: Styles are added as `<style>` elements within the shadow root
3. **Dynamic style observation**: A `MutationObserver` watches for new styles and injects them automatically

### CSS Scoping

Additional CSS rules ensure proper scoping:

```css
curacom-plugin {
  all: initial;
  font-family:
    var(--font-body),
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
  box-sizing: border-box;
}

curacom-plugin * {
  box-sizing: border-box;
}
```

## Benefits

1. **No Style Conflicts**: The widget's styles cannot be affected by the host page's CSS
2. **No Style Leakage**: The widget's styles cannot affect the host page
3. **Predictable Appearance**: The widget will look the same regardless of the host page's styling
4. **Better Performance**: Reduced CSS selector complexity and faster style resolution
5. **Maintainability**: Easier to maintain and update without worrying about external style interference

## Testing

Use the `test-shadow-dom.html` file to verify that the shadow DOM encapsulation is working correctly. The test page includes various CSS rules that should NOT affect the widget's appearance.

## Browser Support

Shadow DOM is supported in all modern browsers:

- Chrome 67+
- Firefox 63+
- Safari 10.1+
- Edge 79+

## Development vs Production

- **Development**: Styles are extracted from the current document and injected into shadow DOM
- **Production**: External CSS file is loaded and then extracted/injected into shadow DOM

## Troubleshooting

If you encounter issues:

1. **Styles not appearing**: Check that the style extraction is working correctly
2. **Vue components not rendering**: Ensure the Vue app is properly mounted within the shadow DOM
3. **Event handling issues**: Events may need to be handled differently within shadow DOM
4. **Font loading**: Ensure fonts are properly loaded and accessible within the shadow DOM

## Future Enhancements

- Consider using CSS custom properties for better theme customization
- Implement a style injection API for dynamic theme changes
- Add support for CSS-in-JS solutions
- Consider using Constructable Stylesheets for better performance
