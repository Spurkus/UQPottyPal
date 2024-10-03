"use client";

import TextStyle from "@tiptap/extension-text-style";
import { Editor, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { createContext, useContext } from "react";

interface EditorType {
  editor: Editor | null;
}

interface TextEditorContextProviderProps {
  children: React.ReactNode;
  defaultContent: string;
}

// Configure extensions for the text editor
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
  Image.configure({
    allowBase64: true,
  }),
];

// Create context for the text editor
export const TextInterfaceContext = createContext<EditorType | null>(null);

/**
 * TextEditorContextProvider component
 *
 * Provides the text editor context to its children components.
 *
 * @param {TextEditorContextProviderProps} props - The component props
 * @returns {JSX.Element} The rendered TextEditorContextProvider component
 */
export const TextEditorContextProvider = ({
  children,
  defaultContent,
}: TextEditorContextProviderProps): JSX.Element => {
  // Initialize the editor with extensions and default content
  const editor = useEditor({
    extensions,
    content: defaultContent,
    immediatelyRender: false,
  });

  return <TextInterfaceContext.Provider value={{ editor }}>{children}</TextInterfaceContext.Provider>;
};

/**
 * useTextEditor hook
 *
 * Custom hook to access the text editor context.
 *
 * @returns {EditorType} The text editor context
 * @throws {Error} If used outside of a TextEditorContextProvider
 */
export const useTextEditor = (): EditorType => {
  const context = useContext(TextInterfaceContext);
  if (!context) throw new Error("useTextEditor must be used within a TextEditorContextProvider");
  return context;
};
