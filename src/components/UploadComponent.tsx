import React from "react";
import { Button, Upload, UploadProps } from "antd";
import Cookies from "js-cookie";

export function UploadComponent() {
  const token = Cookies.get("whats-front-token");

  const props: UploadProps = {
    name: "document",
    action: "https://whatsapi.webi9.com.br/files/file",
    headers: {
      authorization: `Bearer ${token}`,
    },

    onChange(info) {
      if(info.file.status === "done") {
        console.log(info.file)
      }
    }
  }

  return (
    <Upload {...props}>
      <Button>Click to Upload</Button>
    </Upload>
  );
}
