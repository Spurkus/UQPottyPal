"use client";
import { Editor, EditorContent } from "@tiptap/react";
import "./TextEditorStyle.css";
import { useCallback } from "react";
import { toBase64 } from "@/helper/helperFunctions";
import { useTextEditor } from "@/contexts/TextEditorContext";
import "./TextEditorStyle.css";

interface MenuBarProps {
  editor: Editor | null;
}

/**
 * MenuBar component
 *
 * The menu bar for the text editor
 *
 * @param {MenuBarProps} props - The component
 * @returns {JSX.Element} The rendered MenuBar component
 */
const MenuBar = ({ editor }: MenuBarProps) => {
  /**
   * Handle image upload
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - The input event
   */
  const handleImageUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!editor || !event.target.files?.[0]) return;
      const file = event.target.files[0];
      const base64 = await toBase64(file);
      editor.chain().focus().setImage({ src: base64 }).run();
    },
    [editor],
  );

  if (!editor) return null;

  return (
    <div className="mb-2 flex flex-wrap gap-2">
      <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} id="image-upload" />
      <label htmlFor="image-upload" className="btn btn-outline btn-sm">
        Add Image
      </label>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`btn btn-outline btn-sm ${editor.isActive("bold") ? "btn-active" : ""}`}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`btn btn-outline btn-sm ${editor.isActive("italic") ? "btn-active" : ""}`}
      >
        Italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`btn btn-outline btn-sm ${editor.isActive("strike") ? "btn-active" : ""}`}
      >
        Strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={`btn btn-outline btn-sm ${editor.isActive("code") ? "btn-active" : ""}`}
      >
        Code
      </button>
      <button onClick={() => editor.chain().focus().unsetAllMarks().run()} className="btn btn-outline btn-sm">
        Clear marks
      </button>
      <button onClick={() => editor.chain().focus().clearNodes().run()} className="btn btn-outline btn-sm">
        Clear nodes
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`btn btn-outline btn-sm ${editor.isActive("paragraph") ? "btn-active" : ""}`}
      >
        Paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`btn btn-outline btn-sm ${editor.isActive("heading", { level: 1 }) ? "btn-active" : ""}`}
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`btn btn-outline btn-sm ${editor.isActive("heading", { level: 2 }) ? "btn-active" : ""}`}
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`btn btn-outline btn-sm ${editor.isActive("heading", { level: 3 }) ? "btn-active" : ""}`}
      >
        H3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={`btn btn-outline btn-sm ${editor.isActive("heading", { level: 4 }) ? "btn-active" : ""}`}
      >
        H4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={`btn btn-outline btn-sm ${editor.isActive("heading", { level: 5 }) ? "btn-active" : ""}`}
      >
        H5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={`btn btn-outline btn-sm ${editor.isActive("heading", { level: 6 }) ? "btn-active" : ""}`}
      >
        H6
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`btn btn-outline btn-sm ${editor.isActive("bulletList") ? "btn-active" : ""}`}
      >
        Bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`btn btn-outline btn-sm ${editor.isActive("orderedList") ? "btn-active" : ""}`}
      >
        Ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`btn btn-outline btn-sm ${editor.isActive("codeBlock") ? "btn-active" : ""}`}
      >
        Code block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`btn btn-outline btn-sm ${editor.isActive("blockquote") ? "btn-active" : ""}`}
      >
        Blockquote
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className="btn btn-outline btn-sm">
        Horizontal rule
      </button>
      <button onClick={() => editor.chain().focus().setHardBreak().run()} className="btn btn-outline btn-sm">
        Hard break
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="btn btn-outline btn-sm"
      >
        Undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="btn btn-outline btn-sm"
      >
        Redo
      </button>
    </div>
  );
};

/**
 * TextEditor component
 */
const TextEditor = () => {
  const { editor } = useTextEditor();

  const handleDrop = useCallback(
    async (event: React.DragEvent) => {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        const base64 = await toBase64(file);
        editor?.chain().focus().setImage({ src: base64 }).run();
      }
    },
    [editor],
  );

  return (
    <div className="editor-container" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
      <MenuBar editor={editor} />
      <EditorContent className="flex h-full" editor={editor} />
    </div>
  );
};

export default TextEditor;
