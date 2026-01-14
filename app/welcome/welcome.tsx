import { useState } from "react";
import { MenuCard } from "../components/MenuCard";
import { OrderSection } from "../components/OrderSection";

export interface Dish {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface OrderItem extends Dish {
  quantity: number;
}

const MENU_ITEMS: Dish[] = [
  {
    id: 1,
    name: "Pizza Margherita",
    price: 12.5,
    image:
      "https://images.unsplash.com/photo-1681567604770-0dc826c870ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMGZvb2R8ZW58MXx8fHwxNzY3OTIxODU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 2,
    name: "Pâtes Carbonara",
    price: 14.0,
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGRpc2h8ZW58MXx8fHwxNzY3ODk4NzI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 3,
    name: "Burger Maison",
    price: 15.5,
    image:
      "https://images.unsplash.com/photo-1688246780164-00c01647e78c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBmb29kfGVufDF8fHx8MTc2Nzk1MjYxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 4,
    name: "Salade César",
    price: 11.0,
    image:
      "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxhZCUyMGJvd2x8ZW58MXx8fHwxNzY3OTQxNDEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 5,
    name: "Tiramisu",
    price: 7.5,
    image:
      "https://images.unsplash.com/photo-1679942262057-d5732f732841?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNzZXJ0JTIwY2FrZXxlbnwxfHx8fDE3Njc5Mzk2NDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 6,
    name: "Fruits de Mer",
    price: 22.0,
    image:
      "https://images.unsplash.com/photo-1611464357429-a34ac648a5e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWFmb29kJTIwZGlzaHxlbnwxfHx8fDE3Njc4Njk3NTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

export function Welcome() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const addToOrder = (dish: Dish) => {
    setOrderItems((prev) => {
      const existing = prev.find((item) => item.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...dish, quantity: 1 }];
    });
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-50">
        {/* Bannière */}
        <header className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-8 px-6 shadow-lg">
          <h1 className="text-4xl text-center">La Belle Table</h1>
          <p className="text-center mt-2 text-orange-100">
            Restaurant Français
          </p>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Menu */}
          <section className="mb-16">
            <h2 className="text-3xl mb-8 text-gray-900">Notre Menu</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MENU_ITEMS.map((dish) => (
                <MenuCard key={dish.id} dish={dish} onAddToOrder={addToOrder} />
              ))}
            </div>
          </section>

          {/* Section Commande */}
          <OrderSection orderItems={orderItems} />
        </div>
      </div>
    </div>
  );
}
