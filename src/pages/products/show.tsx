import {
  IResourceComponentsProps,
  useNavigation,
  useShow,
} from "@refinedev/core";
import React from "react";

export const ProductShow: React.FC<IResourceComponentsProps> = () => {
  const { list } = useNavigation();
  const { queryResult } = useShow({});
  const { data } = queryResult;

  const record = data?.message;

  console.log("record", record);

  return (
    <div style={{ padding: "16px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1>{"Show"}</h1>
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={() => list("products")}>{"List"}</button>
        </div>
      </div>
      <div>
        <div style={{ marginTop: "6px" }}>
          <h5>{"ID"}</h5>
          <div>{record?.id ?? ""}</div>
        </div>
        <div style={{ marginTop: "6px" }}>
          <h5>{"Title"}</h5>
          <div>{record?.title}</div>
        </div>
        <div style={{ marginTop: "6px" }}>
          <h5>{"Content"}</h5>
          <p>{record?.content}</p>
        </div>

        <div style={{ marginTop: "6px" }}>
          <h5>{"Status"}</h5>
          <div>{record?.status}</div>
        </div>
        <div style={{ marginTop: "6px" }}>
          <h5>{"Created at"}</h5>
          <div>
            {new Date(record?.createdAt).toLocaleString(undefined, {
              timeZone: "UTC",
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
