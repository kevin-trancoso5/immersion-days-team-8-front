import { useState } from "react";
import { BACKEND_URL, type OrderItem } from "../welcome/welcome";

interface OrderSectionProps {
  orderItems: OrderItem[];
}

export function OrderSection({ orderItems }: OrderSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const totalPrice = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      fullName: formData.name,
      email: formData.email,
      phoneNumber: formData.phone,
      address: formData.address,
      productIds: orderItems.map((item) => String(item.id)),
    };

    try {
      const response = await fetch(`${BACKEND_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Request failed with ${response.status}`);
      }

      alert("Commande envoyée ! Merci pour votre commande.");
    } catch (error) {
      console.error("Order submit failed", error);
      alert("Echec d'envoi. Reessayez plus tard.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-3xl mb-6 text-gray-900">Votre Commande</h2>

      {/* Liste des plats commandés */}
      {orderItems.length > 0 && (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-xl mb-4">Plats sélectionnés</h3>
          <div className="space-y-3">
            {orderItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <span className="font-medium">{item.name}</span>
                  <span className="text-gray-600 ml-2">x{item.quantity}</span>
                </div>
                <span className="text-orange-600">
                  {(item.price * item.quantity).toFixed(2)} €
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t-2 border-orange-600 flex justify-between items-center">
            <span className="text-xl">Total</span>
            <span className="text-2xl text-orange-600">
              {totalPrice.toFixed(2)} €
            </span>
          </div>
        </div>
      )}

      {/* Formulaire de coordonnées */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-2 text-gray-900">
            Nom complet
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-2 text-gray-900">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 "
          />
        </div>

        <div>
          <label htmlFor="phone" className="block mb-2 text-gray-900">
            Téléphone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
          />
        </div>

        <div>
          <label htmlFor="address" className="block mb-2 text-gray-900">
            Adresse de livraison
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors text-lg mt-6 cursor-pointer"
        >
          Passer la commande
        </button>
      </form>
    </section>
  );
}
