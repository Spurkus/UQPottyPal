import TextStyle from "@tiptap/extension-text-style";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./TextEditorStyle.css";

interface MenuBarProps {
  editor: Editor;
}

const MenuBar = ({ editor }: MenuBarProps) => {
  if (!editor) return;
  return (
    <div className="mb-2 flex flex-wrap gap-2">
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

const extensions = [
  TextStyle.configure({}),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

const content = `<p>Default description</p>`;

const TextEditor = () => {
  const editor = useEditor({ extensions: extensions, content: content });
  return (
    <div className="editor-container">
      <MenuBar editor={editor} />
      <EditorContent className="flex h-full" editor={editor} />
    </div>
  );
};

export default TextEditor;
