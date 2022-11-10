import { useEffect, useState } from "react";
import { useGlobal } from "../../lib/context";
import { patch } from "../../utils/api";

export default function Text({ property }) {
  const { editingObject, setEditingObject, setIsSaving } = useGlobal();

  const [value, setValue] = useState();

  useEffect(() => {
    setIsSaving(true);
    // Save after 1.5 seconds
    const delayPatch = setTimeout(() => {
      if (value !== null) {
        setEditingObject({
          ...editingObject,
          data: { ...editingObject?.data, [property?.property]: value },
        });
        patch("objects", {
          objectId: editingObject?._id,
          data: { ...editingObject?.data, [property?.property]: value },
        }).then(() => setIsSaving(false));
      }
    }, 1500);

    return () => clearTimeout(delayPatch);
  }, [value]);

  return (
    <input
      type={"text"}
      value={value}
      className={"uk-input"}
      style={{ background: "none", paddingLeft: 0 }}
      placeholder={"Type your text here"}
      onChange={(event) => setValue(event.target.value)}
    />
  );
}
