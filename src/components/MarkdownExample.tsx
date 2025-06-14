
const MarkdownExample = () => {
  const exampleMarkdown = `# Welcome to My Minecraft Project

This is a **comprehensive** pack that includes *amazing* features and \`custom mechanics\`.

## Features

### Core Features
- Custom textures for all blocks
- Enhanced lighting effects  
- Optimized performance
- Cross-platform compatibility

### Advanced Features
1. Dynamic weather system
2. Custom sound effects
3. Improved animations
4. Better particle effects

[dropdown]Installation Requirements
Before installing this pack, make sure you have:
- Minecraft 1.21.x or higher
- At least 4GB of available RAM
- OptiFine or Sodium (recommended)
- Latest graphics drivers
[/dropdown]

[dropdown]Known Issues
Currently known issues include:
- Minor texture glitches in caves
- Performance drops on older hardware
- Some sounds may not play correctly

We're working on fixes for these in the next update.
[/dropdown]

## Technical Details

The pack uses **advanced rendering techniques** to achieve stunning visuals while maintaining good performance. Each texture is hand-crafted and optimized for different lighting conditions.

### Performance Tips
- Use OptiFine for best results
- Disable fancy graphics if experiencing lag
- Allocate more RAM if needed

## Support

If you encounter any issues, please visit our Discord server or check the FAQ section.

**Thank you for downloading!**`;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Markdown Description Format</h1>
        <p className="text-muted-foreground mb-6">
          To use rich text descriptions in your projects, store the formatted content in the 
          `description_rich` field. Here's an example of the supported formatting:
        </p>
        
        <div className="bg-muted p-4 rounded-lg mb-6">
          <h3 className="font-semibold mb-2">Supported Features:</h3>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Headers (# ## ###)</li>
            <li>• **Bold** and *italic* text</li>
            <li>• `Inline code`</li>
            <li>• Bullet lists (- or *)</li>
            <li>• Numbered lists (1. 2. 3.)</li>
            <li>• [dropdown]Collapsible sections[/dropdown]</li>
          </ul>
        </div>
      </div>

      <div className="bg-background border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Example Output:</h3>
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: exampleMarkdown.replace(/\n/g, '<br>') }} />
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-lg">
        <h3 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">How to Use:</h3>
        <p className="text-sm text-blue-800 dark:text-blue-200">
          Store your formatted content in the `description_rich` field of your project in the database. 
          The MarkdownRenderer component will automatically parse the syntax and create an interactive display.
        </p>
      </div>
    </div>
  );
};

export default MarkdownExample;
