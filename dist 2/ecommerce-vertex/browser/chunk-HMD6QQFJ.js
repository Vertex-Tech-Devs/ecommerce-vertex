import {
  Timestamp
} from "./chunk-SDXAAYIW.js";

// src/app/core/utils/date-converter.ts
function convertTimestampsToDates(data) {
  if (!data)
    return data;
  if (data instanceof Timestamp)
    return data.toDate();
  if (Array.isArray(data)) {
    return data.map((item) => convertTimestampsToDates(item));
  }
  if (typeof data === "object" && data !== null) {
    const convertedData = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        convertedData[key] = convertTimestampsToDates(data[key]);
      }
    }
    return convertedData;
  }
  return data;
}

export {
  convertTimestampsToDates
};
//# sourceMappingURL=chunk-HMD6QQFJ.js.map
