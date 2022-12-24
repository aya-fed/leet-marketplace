// Ethan Cullen

import { Item } from "./Item.jsx";
import { COMPANY, FAQ, RESOURCES, SUPPORT } from "./Menus.js";
function ItemsContainer() {
  return (
    <div className="grid grid-cols-1 gap-6 px-5 py-16 sm:grid-cols-3 lg:grid-cols-4 sm:px-8 ">
      <Item Links={FAQ} title="FAQ" />
      <Item Links={RESOURCES} title="RESOURCES" />
      <Item Links={COMPANY} title="COMPANY" />
      <Item Links={SUPPORT} title="SUPPORT" />
    </div>
  );
}

export { ItemsContainer };