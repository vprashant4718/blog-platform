import { useMemo } from "react";
import JoditEditor from "jodit-react";

const EditorBlog = ({ value, onChange }) => {
  // Jodit configuration
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Write your blog content here...",
      height: 400,

      toolbarSticky: true,
      toolbarAdaptive: false,

      buttons: [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "ul",
        "ol",
        "|",
        "font",
        "fontsize",
        "paragraph",
        "|",
        "align",
        "outdent",
        "indent",
        "|",
        "link",
        "image",
        "table",
        "|",
        "undo",
        "redo",
        "|",
        "hr",
        "eraser",
        "source",
        "fullsize",
      ],

      uploader: {
        insertImageAsBase64URI: true, // simple, no backend needed
      },

      removeButtons: ["about"],
      showCharsCounter: true,
      showWordsCounter: true,
      showXPathInStatusbar: false,
    }),
    []
  );

  return (
    <div className="border rounded-lg overflow-hidden">
      <JoditEditor
        value={value}
        config={config}
        onBlur={(newContent) => onChange(newContent)} // update parent
      />
    </div>
  );
};

export default EditorBlog;
