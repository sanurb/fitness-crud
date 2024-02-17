export const selectedObjToFilteredArray = (obj: { [key: string]: boolean }) =>
  Object.keys(obj).filter((key) => obj[key]);

export const convertListToBooleanObject = (
  items: { id: string }[]
): { [id: string]: boolean } => {
  return items.reduce((acc, item) => {
    acc[item.id] = true;
    return acc;
  }, {} as { [id: string]: boolean });
};
