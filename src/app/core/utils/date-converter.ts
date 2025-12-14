import { Timestamp } from 'firebase/firestore';

export function convertTimestampsToDates(data: any): any {
  if (!data) return data;
  if (data instanceof Timestamp) return data.toDate();
  if (Array.isArray(data)) {
    return data.map(item => convertTimestampsToDates(item));
  }
  if (typeof data === 'object' && data !== null) {
    const convertedData: { [key: string]: any } = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        convertedData[key] = convertTimestampsToDates(data[key]);
      }
    }
    return convertedData;
  }
  return data;
}