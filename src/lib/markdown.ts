/**
 * Simple markdown-to-HTML renderer for lesson content.
 * Handles headings, bold, lists, and paragraphs.
 */
export function renderMarkdown(md: string): string {
  const lines = md.split("\n");
  const htmlLines: string[] = [];
  let inList = false;
  let listType: "ul" | "ol" | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Skip empty lines but close lists
    if (!trimmed) {
      if (inList) {
        htmlLines.push(listType === "ol" ? "</ol>" : "</ul>");
        inList = false;
        listType = null;
      }
      continue;
    }

    // Headings
    if (trimmed.startsWith("### ")) {
      if (inList) {
        htmlLines.push(listType === "ol" ? "</ol>" : "</ul>");
        inList = false;
        listType = null;
      }
      const text = applyInline(trimmed.slice(4));
      htmlLines.push(
        `<h3 class="text-lg font-bold font-heading text-bark mt-6 mb-2">${text}</h3>`
      );
      continue;
    }

    if (trimmed.startsWith("## ")) {
      if (inList) {
        htmlLines.push(listType === "ol" ? "</ol>" : "</ul>");
        inList = false;
        listType = null;
      }
      const text = applyInline(trimmed.slice(3));
      htmlLines.push(
        `<h2 class="text-xl font-bold font-heading text-bark mt-8 mb-3">${text}</h2>`
      );
      continue;
    }

    // Unordered list
    if (trimmed.startsWith("- ")) {
      if (!inList || listType !== "ul") {
        if (inList) htmlLines.push(listType === "ol" ? "</ol>" : "</ul>");
        htmlLines.push('<ul class="list-disc pl-6 mb-4 space-y-1 text-bark/70">');
        inList = true;
        listType = "ul";
      }
      const text = applyInline(trimmed.slice(2));
      htmlLines.push(`<li>${text}</li>`);
      continue;
    }

    // Ordered list
    const olMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
    if (olMatch) {
      if (!inList || listType !== "ol") {
        if (inList) htmlLines.push(listType === "ol" ? "</ol>" : "</ul>");
        htmlLines.push(
          '<ol class="list-decimal pl-6 mb-4 space-y-1 text-bark/70">'
        );
        inList = true;
        listType = "ol";
      }
      const text = applyInline(olMatch[2]);
      htmlLines.push(`<li>${text}</li>`);
      continue;
    }

    // Paragraph
    if (inList) {
      htmlLines.push(listType === "ol" ? "</ol>" : "</ul>");
      inList = false;
      listType = null;
    }
    const text = applyInline(trimmed);
    htmlLines.push(`<p class="mb-4 leading-relaxed text-bark/70">${text}</p>`);
  }

  // Close any remaining list
  if (inList) {
    htmlLines.push(listType === "ol" ? "</ol>" : "</ul>");
  }

  return htmlLines.join("\n");
}

/** Apply inline formatting: bold and italic */
function applyInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong class=\"text-bark\">$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, '<code class="bg-sand-100 px-1.5 py-0.5 rounded text-sm">$1</code>');
}
