const ItemTitle = (item1 = "", item2 = "", title = "") => {
  let itemTitle = title || "";
  if (item1) {
    itemTitle = item1;
    if (item2) {
      itemTitle += ` - ${item2}`;
    }
  } else if (item2) {
    itemTitle = item2;
  }

  return itemTitle;
};

export default ItemTitle;
