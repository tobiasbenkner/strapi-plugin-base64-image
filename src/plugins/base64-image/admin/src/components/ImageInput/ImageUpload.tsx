import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import { Typography, lightTheme } from "@strapi/design-system";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "./image-input.css";

import { Props } from "./types";

registerPlugin(FilePondPluginImagePreview);
registerPlugin(FilePondPluginFileValidateType);

const pluginName = "strapi-plugin-base64-image";

export function ImageUpload(props: Props) {
  const { name, onChange, attribute, error } = props;
  return (
    <div style={{ width: "100%" }}>
      <FilePond
        allowMultiple={false}
        acceptedFileTypes={["image/*"]}
        maxFiles={1}
        server={{
          load: (src, load) => {
            fetch(src)
              .then((res) => res.blob())
              .then(load);
          },
          url: `http://localhost:1337/${pluginName}/upload?width=${attribute.options.width}&height=${attribute.options.height}`,
        }}
        credits={false}
        onprocessfile={(error, file) => {
          if (error) {
            onChange({
              target: { name, value: null, type: attribute.type },
            });
            console.log("error", error);
            return;
          }
          const response = file.serverId;
          onChange({
            target: { name, value: response, type: attribute.type },
          });
        }}
        // labelIdle={"Click or drop file here"}
        name="files"
      />
      {error && (
        <Typography
          variant="pi"
          style={{ color: lightTheme.colors.danger500, marginTop: -16 }}
        >
          {error}
        </Typography>
      )}
    </div>
  );
}
