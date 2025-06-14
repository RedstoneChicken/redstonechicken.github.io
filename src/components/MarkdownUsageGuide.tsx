import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface MarkdownUsageGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

const MarkdownUsageGuide = ({ isOpen, onClose }: MarkdownUsageGuideProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-left">Markdown Usage Guide</DialogTitle>
          <DialogDescription className="text-left">
            Complete reference for all supported markdown features in project descriptions
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 text-left">
          {/* Headers */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary border-b border-border/20 pb-2">Headers</h3>
            <div className="space-y-2">
              <code className="block bg-muted p-2 rounded text-sm"># Main Header</code>
              <code className="block bg-muted p-2 rounded text-sm">## Section Header</code>
              <code className="block bg-muted p-2 rounded text-sm">### Subsection Header</code>
            </div>
          </div>

          {/* Text Formatting */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary border-b border-border/20 pb-2">Text Formatting</h3>
            <div className="space-y-2">
              <code className="block bg-muted p-2 rounded text-sm">**Bold text**</code>
              <code className="block bg-muted p-2 rounded text-sm">*Italic text*</code>
              <code className="block bg-muted p-2 rounded text-sm">`Inline code`</code>
              <code className="block bg-muted p-2 rounded text-sm">~~Strikethrough text~~</code>
              <code className="block bg-muted p-2 rounded text-sm">==Highlighted text==</code>
            </div>
          </div>

          {/* Lists */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary border-b border-border/20 pb-2">Lists</h3>
            <div className="space-y-2">
              <code className="block bg-muted p-2 rounded text-sm">- Bullet point{'\n'}- Another point</code>
              <code className="block bg-muted p-2 rounded text-sm">1. Numbered item{'\n'}2. Another item</code>
            </div>
          </div>

          {/* Images */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary border-b border-border/20 pb-2">Images</h3>
            <div className="space-y-2">
              <code className="block bg-muted p-2 rounded text-sm">[image]0 - Uses uploaded image at index 0</code>
              <code className="block bg-muted p-2 rounded text-sm">[image]1 - Uses uploaded image at index 1</code>
              <code className="block bg-muted p-2 rounded text-sm">[image]https://example.com/image.jpg - External image URL</code>
              <code className="block bg-muted p-2 rounded text-sm">[img]https://example.com/image.png - Alternative syntax</code>
            </div>
            <p className="text-sm text-muted-foreground">
              You can now use external image URLs directly! Just use [image] or [img] followed by a complete URL.
            </p>
          </div>

          {/* Alert Boxes */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary border-b border-border/20 pb-2">Alert Boxes</h3>
            <div className="space-y-2">
              <code className="block bg-muted p-2 rounded text-sm">[!INFO] This is an info message</code>
              <code className="block bg-muted p-2 rounded text-sm">[!WARNING] This is a warning message</code>
              <code className="block bg-muted p-2 rounded text-sm">[!ERROR] This is an error message</code>
              <code className="block bg-muted p-2 rounded text-sm">[!SUCCESS] This is a success message</code>
            </div>
          </div>

          {/* Collapsible Sections */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary border-b border-border/20 pb-2">Collapsible Sections</h3>
            <div className="space-y-2">
              <code className="block bg-muted p-2 rounded text-sm">
                [dropdown]Section Title{'\n'}Content goes here{'\n'}Multiple lines supported{'\n'}[/dropdown]
              </code>
            </div>
          </div>

          {/* Special Elements */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary border-b border-border/20 pb-2">Special Elements</h3>
            <div className="space-y-2">
              <code className="block bg-muted p-2 rounded text-sm">[CENTER]Centered text content[/CENTER]</code>
              <code className="block bg-muted p-2 rounded text-sm">{'>'} Quote or blockquote text</code>
              <code className="block bg-muted p-2 rounded text-sm">--- (Horizontal separator)</code>
              <code className="block bg-muted p-2 rounded text-sm">[media]https://youtube.com/embed/VIDEO_ID</code>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary border-b border-border/20 pb-2">Links</h3>
            <div className="space-y-2">
              <code className="block bg-muted p-2 rounded text-sm">[Link Text](https://example.com)</code>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-blue-200 mb-2">💡 Pro Tips</h4>
            <ul className="text-sm text-blue-200 space-y-1">
              <li>• Use external image URLs for dynamic content that may change</li>
              <li>• Combine alert boxes with dropdowns for organized information</li>
              <li>• Empty lines separate different content blocks</li>
              <li>• All links automatically open in new tabs with external icon</li>
              <li>• Images support hover effects and click-to-zoom functionality</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MarkdownUsageGuide;
