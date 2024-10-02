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

export const TextInterfaceContext = createContext<EditorType | null>(null);

export const TextEditorContextProvider = ({ children, defaultContent }: TextEditorContextProviderProps) => {
  const editor = useEditor({
    extensions,
    content: defaultContent,
    immediatelyRender: false,
  });

  return <TextInterfaceContext.Provider value={{ editor }}>{children}</TextInterfaceContext.Provider>;
};

export const useTextEditor = () => {
  const context = useContext(TextInterfaceContext);
  if (!context) throw new Error("useTextEditor must be used within a TextEditorContextProvider");

  return context;
};
