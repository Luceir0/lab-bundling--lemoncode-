import { useState } from "react";
import { coffees, type Coffee } from "./data";
import { API_BASE, SHOP_NAME, SHOW_OFFERS } from "./env.constants";
import coffeePhoto from "./assets/coffee.jpg";

export const App = () => {
  const [cart, setCart] = useState<Coffee[]>([]);

  return (
    <main>
      <h2>{SHOP_NAME}</h2>
      {SHOW_OFFERS && <p>Envío gratis este mes</p>}
      <h2>Cafés de octubre</h2>
      <img src={coffeePhoto} alt="" />
      <ul className="grid gap-4 sm:grid-cols-3">
        {coffees.map((coffee) => (
          <li key={coffee.id} className="rounded-lg border border-stone-200 p-4 shadow-md">
            <h3 className="font-semibold">{coffee.name}</h3>
            <p className="text-stone-600">{coffee.price.toFixed(2)} €</p>
            <button
              className="mt-3 rounded bg-amber-700 px-3 py-1 text-white hover:bg-amber-800"
              onClick={() => setCart((prev) => [...prev, coffee])}
            >
              Añadir
            </button>
          </li>
        ))}
      </ul>
      <p>Bolsas en el carrito: {cart.length}</p>
      <small>API: {API_BASE}</small>
    </main>
  );
};
