import { exclude } from "./exclude";
import { computeFullName } from "../helpers/computedName";

export const CleanData = (
  object: Object,
  excludeData: string[] = [],
  computed: boolean = false
) => {
  let obj: any = object;
  if (computed) {
    obj = computeFullName(obj);
  }

  if (excludeData.length) {
    excludeData.forEach((exc: any) => {
      obj = exclude(obj, exc);
    });
    return obj;
  }
};
