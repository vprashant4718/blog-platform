import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const Editor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    }
  });

  if (!editor) return null;

  return (
    <div className="border rounded-lg p-3 min-h-[250px]">
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
