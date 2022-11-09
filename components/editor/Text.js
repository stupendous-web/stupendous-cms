import { useEffect, useState } from "react";
import { useGlobal } from "../../lib/context";
import { patchObject } from "../../utils/api";

export default function Text({ property }) {
  const { editingObject } = useGlobal();

  const [value, setValue] = useState();

  useEffect(() => {
    // Save after three seconds
    const delayPatch = setTimeout(() => {
      value !== null &&
        patchObject({
          objectId: editingObject?._id,
          data: { ...property?.data, [property?.property]: value },
        });
    }, 3000);

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
