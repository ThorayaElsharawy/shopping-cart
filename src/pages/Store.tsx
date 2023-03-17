import { StoreItem } from "../components/StoreItem";
import storeItems from "../data/items.json";

export function Store() {

  return (
    <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4">
      {storeItems.map((item) => (
        <StoreItem key={item.id} item={item} />
      ))}
    </div>
  );
}
