import { useState, useEffect } from "react";
import { MenuCard } from "../components/MenuCard";
import { OrderSection } from "../components/OrderSection";

export const BACKEND_URL = "https://proxy.corsfix.com/?http://51.15.215.9:3000";

export interface Dish {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export interface OrderItem extends Dish {
  quantity: number;
}

export function Welcome() {
  const [menuItems, setMenuItems] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${BACKEND_URL}/products`);
        if (!response.ok) {
          throw new Error(`Failed to fetch menu items: ${response.statusText}`);
        }
        const data = await response.json();
        setMenuItems(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch menu items"
        );
        console.error("Error fetching menu items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

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
            <h2 className="text-3xl mb-8">Notre Menu</h2>

            {loading && (
              <div className="flex justify-center items-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Chargement du menu...</p>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-700 font-semibold">Erreur</p>
                <p className="text-red-600">{error}</p>
              </div>
            )}

            {!loading && menuItems.length === 0 && !error && (
              <div className="text-center py-12">
                <p className="text-gray-600">Aucun article disponible</p>
              </div>
            )}

            {!loading && menuItems.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems.map((dish) => (
                  <MenuCard
                    key={dish.id}
                    dish={dish}
                    onAddToOrder={addToOrder}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Section Commande */}
          <OrderSection orderItems={orderItems} />
        </div>
      </div>
    </div>
  );
}
