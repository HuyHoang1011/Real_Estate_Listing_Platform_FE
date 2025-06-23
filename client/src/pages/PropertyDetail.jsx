import React from "react";
import { useParams } from "react-router-dom";

export default function PropertyDetail() {
  const { id } = useParams();

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Property Detail - ID: {id}</h1>
      {/* TODO: Hiển thị chi tiết bất động sản theo id */}
    </div>
  );
}
