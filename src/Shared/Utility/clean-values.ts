export class CleanValues {
  static clean<T = any>(data: T): T {
    if (typeof data === "object" && Array.isArray(data) && data !== null) {
      return CleanValues.clearArray(data) as T;
    } else if (
      typeof data === "object" &&
      !Array.isArray(data) &&
      data !== null
    ) {
      return CleanValues.cleanObject(data) as T;
    } else {
      return data;
    }
  }

  static clearArray(data: any): any {
    const newArray: any = [];
    for (const item of data) {
      if (typeof item === "object" && Array.isArray(item) && item !== null) {
        const newItem = CleanValues.clearArray(item);
        if (newItem.length) {
          newArray.push(newItem);
        }
      } else if (
        typeof item === "object" &&
        !Array.isArray(item) &&
        item !== null
      ) {
        const newItem: object = CleanValues.cleanObject(item);
        if (Object.values(newItem).length) {
          newArray.push(newItem);
        }
      } else if (item !== undefined && item !== null && item !== "") {
        newArray.push(item);
      }
    }
    return newArray;
  }

  static cleanObject(data: any): any {
    const copyObject = { ...data };
    for (const key in copyObject) {
      if (
        typeof copyObject[key] === "object" &&
        !Array.isArray(copyObject[key]) &&
        copyObject[key] !== undefined &&
        copyObject[key] !== null &&
        copyObject[key].constructor.name === "Object"
      ) {
        const newItem = CleanValues.cleanObject(copyObject[key]);
        if (Object.values(newItem).length) {
          copyObject[key] = newItem;
        } else {
          delete copyObject[key];
        }
      } else if (
        typeof copyObject[key] === "object" &&
        Array.isArray(copyObject[key]) &&
        copyObject[key] !== undefined &&
        copyObject[key] !== null
      ) {
        const newItem = CleanValues.clearArray(copyObject[key]);
        if (newItem.length) {
          copyObject[key] = newItem;
        } else {
          delete copyObject[key];
        }
      } else if (
        copyObject[key] === null ||
        (copyObject[key] === undefined && copyObject[key] === "")
      ) {
        delete copyObject[key];
      }
    }
    return copyObject;
  }
}
