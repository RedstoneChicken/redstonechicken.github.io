
import AdvancedMarkdownRenderer from './AdvancedMarkdownRenderer';

const markdownTestContent = `# Complete Markdown Feature Test

This is a comprehensive test of all supported markdown formatting features.

## Headers and Navigation

### Level 3 Header
#### Level 4 Header
##### Level 5 Header
###### Level 6 Header

## Text Formatting

**Bold text** and *italic text* and ~~strikethrough text~~

You can also use HTML tags like <strong>HTML bold</strong>, <em>HTML italic</em>, and <u>underlined text</u>.

Inline \`code\` with syntax highlighting.

## Code Blocks

\`\`\`javascript
function helloWorld() {
  console.log("Hello, World!");
  return "This is a JavaScript code block";
}

// You can copy this code!
const result = helloWorld();
\`\`\`

\`\`\`css
.minecraft-theme {
  background: linear-gradient(135deg, #2d5a27, #8bc34a);
  color: #ffffff;
  border-radius: 8px;
  padding: 1rem;
}
\`\`\`

\`\`\`
Plain code block without language specification
This is useful for generic text or configuration files
\`\`\`

## Lists

### Unordered Lists
- First item with **bold text**
- Second item with *italic text*
- Third item with \`inline code\`
  - Nested item
  - Another nested item
- Fourth item with [a link](https://example.com)

### Ordered Lists
1. First numbered item
2. Second numbered item with **formatting**
3. Third numbered item
   1. Nested numbered item
   2. Another nested one
4. Fourth numbered item

## Links and References

[External Link](https://minecraft.net) - Links to Minecraft official site
[Internal Link](#headers-and-navigation) - Links to header section above

## Images

[image]0

This will show the first image from the images array, or a placeholder if no image is provided.

## Blockquotes

> This is a blockquote. It's perfect for highlighting important information or quotes from users.

> **Bold text in blockquotes** and *italic text* also work perfectly.

## Tables

| Feature | Supported | Description |
|---------|-----------|-------------|
| Headers | ✅ | All 6 levels supported |
| Lists | ✅ | Both ordered and unordered |
| Code | ✅ | Inline and block with copy |
| Tables | ✅ | Basic table support |
| Links | ✅ | External and internal |
| Images | ✅ | With placeholders |

## Collapsible Sections

[dropdown]Installation Instructions
These are detailed installation instructions that are hidden by default.

1. Download the mod file
2. Open Minecraft
3. Install the mod
4. **Enable** the mod in your world settings
5. Enjoy!

You can include any markdown content inside dropdowns, including:
- Lists
- **Bold text**
- \`Code\`
- [Links](https://example.com)
[/dropdown]

[dropdown]Advanced Configuration
This section contains advanced configuration options.

\`\`\`json
{
  "mod_settings": {
    "enable_feature_x": true,
    "performance_mode": false,
    "debug_level": 1
  }
}
\`\`\`

> Remember to backup your world before making changes!
[/dropdown]

## HTML Integration

You can use HTML tags directly:

<div style="background: linear-gradient(135deg, #ff6b6b, #4ecdc4); padding: 1rem; border-radius: 8px; color: white; margin: 1rem 0;">
  <strong>HTML Styled Box</strong><br>
  This box uses HTML and CSS styling directly in the markdown.
</div>

<details>
<summary>Click to expand HTML details</summary>
<p>This content is inside an HTML details/summary element.</p>
<ul>
  <li>HTML lists work too</li>
  <li>With <em>formatting</em></li>
</ul>
</details>

## Horizontal Rules

Use three or more dashes, asterisks, or underscores:

---

***

___

## Special Characters and Escaping

You can escape special characters: \\*not italic\\* and \\**not bold\\**

Unicode characters work: 🎮 ⛏️ 🔥 ⚡ 🏗️

## Mixed Content Example

Here's a real-world example mixing different features:

### 🎮 Minecraft Redstone Mod

**Version:** 2.1.0  
**Compatibility:** Minecraft 1.21.x

> This mod adds advanced redstone components to enhance your technical builds!

#### ⚡ Features
- **Advanced Logic Gates**: AND, OR, XOR, NOT gates
- **Wireless Redstone**: *No more long redstone trails*
- **Timing Components**: Precise delays and pulses
- **Signal Processing**: Amplifiers and filters

#### 📋 Installation

[dropdown]Quick Install Guide
1. Download the mod file from the link above
2. Open Minecraft Launcher
3. Select your modded profile
4. Launch the game
5. **Verify** installation in the mods menu

\`\`\`bash
# For advanced users using command line
cd minecraft/mods/
wget https://example.com/redstone-mod.jar
\`\`\`
[/dropdown]

#### 🔧 Configuration

| Setting | Default | Description |
|---------|---------|-------------|
| \`enableWireless\` | \`true\` | Enable wireless redstone |
| \`maxRange\` | \`64\` | Maximum wireless range |
| \`powerConsumption\` | \`low\` | Power usage mode |

For more information, visit our [documentation](https://example.com) or join our community!

---

*This template demonstrates all supported markdown features. Feel free to copy and modify for your own project descriptions!*
`;

const MarkdownTestTemplate = () => {
  const testImages = [
    "https://source.unsplash.com/800x400?minecraft,redstone",
    "https://source.unsplash.com/800x400?minecraft,building"
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Markdown Feature Test</h1>
        <p className="text-muted-foreground">
          This page demonstrates all supported markdown formatting features
        </p>
      </div>
      
      <div className="glass-panel p-8 rounded-xl border border-border/30">
        <AdvancedMarkdownRenderer 
          content={markdownTestContent}
          images={testImages}
        />
      </div>
    </div>
  );
};

export default MarkdownTestTemplate;
