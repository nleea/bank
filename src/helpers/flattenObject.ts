export function flattenObj(obj: any, res: any = {}) {
  for (let key in obj) {
    let propName = key;
    if (typeof obj[key] == "object") {
      flattenObj(obj[key], res);
    } else {
      res[propName] = obj[key];
    }
  }
  return res;
}
