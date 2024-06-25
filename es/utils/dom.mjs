import { Fragment } from "vue";
const filterEmpty = (children) => {
  const res = [];
  children.forEach((child) => {
    if (Array.isArray(child)) {
      res.push(...child);
    } else if (child.type === Fragment) {
      res.push(...child.children);
    } else {
      res.push(child);
    }
  });
  return res.filter((c) => !isEmptyElement(c));
};
const isEmptyElement = (c) => {
  return c && (c.type === Comment || c.type === Fragment && c.children.length === 0 || c.type === Text && c.children.trim() === "");
};
export {
  filterEmpty
};
