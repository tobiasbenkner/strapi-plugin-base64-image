import { IconButton } from "@strapi/design-system";
import { Trash } from "@strapi/icons";
import { Props } from "./types";

export function ImagePreview(props: Props) {
  const { name, value, onChange, attribute } = props;

  const src =
    value && value.startsWith("data:image/webp")
      ? value
      : "http://localhost:1337" + value;
  console.log(value);

  if (!value) {
    return null;
  }

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <img src={src} style={{ width: "100%", borderRadius: 4 }} />
      <div
        style={{
          position: "absolute",
          zIndex: 1,
          top: 4,
          right: 4,
        }}
      >
        <IconButton
          onClick={() =>
            onChange({ target: { name, value: null, type: attribute.type } })
          }
          label="Delete"
          icon={<Trash />}
        />
      </div>
    </div>
  );
}
