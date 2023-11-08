import { Typography, lightTheme } from "@strapi/design-system";
import { ImagePreview } from "./ImagePreview";

import { Props } from "./types";
import { ImageUpload } from "./ImageUpload";

export default function Index(props: Props) {
  const { name, value, required } = props;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        alignItems: "flex-start",
      }}
    >
      <Typography
        style={{ fontSize: "0.75rem", lineHeight: 1.33, fontWeight: 600 }}
        variant="pi"
      >
        {name}
        {required ? (
          <span style={{ color: lightTheme.colors.danger500 }}>*</span>
        ) : (
          ""
        )}
      </Typography>
      {value && value !== "null" ? (
        <ImagePreview {...props} />
      ) : (
        <ImageUpload {...props} />
      )}
    </div>
  );
}
