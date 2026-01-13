import type { Dish } from "../welcome/welcome";

interface MenuCardProps {
  dish: Dish;
  onAddToOrder: (dish: Dish) => void;
}

export function MenuCard({ dish, onAddToOrder }: MenuCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <img
        src={dish.imageUrl}
        alt={dish.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl mb-2">{dish.name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-2xl text-orange-600">
            {dish.price.toFixed(2)} €
          </span>
          <button
            onClick={() => onAddToOrder(dish)}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors cursor-pointer"
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}
