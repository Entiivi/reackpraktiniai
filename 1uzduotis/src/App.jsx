import { useState } from "react";
import ProductList from "./components/Produktasar";
import Cart from "./components/Cart";
import GuessGame from "./components/GuessGame";

export default function App() {
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState([]);

  // Add an item with a unique cartId (even for duplicates)
  const addToCart = (product) => {
    const uniqueItem = { ...product, cartId: Date.now() + Math.random() };
    setCart([...cart, uniqueItem]);
  };

  // Remove one specific item using cartId
  const removeFromCart = (cartId) => {
    setCart(cart.filter((item) => item.cartId !== cartId));
  };

  const products = [
    { id: 1, name: "Knyga", price: 10 },
    { id: 2, name: "Pelė", price: 20 },
    { id: 3, name: "Klaviatūra", price: 30 },
  ];

  return (
    <>
      <h1>Ignas Sakalauskas PI22B</h1>

      <div>
        <div className="card" style={{ display: 'flex', flex: 1 }}>
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
        </div>
      </div>

      {/* Prekių sąrašas */}
      <ProductList products={products} addToCart={addToCart} />

      {/* Krepšelis */}
      <Cart cart={cart} removeFromCart={removeFromCart} />

      {/* Skaičių spėjimo žaidimas */}
      <GuessGame />
    </>
  );
}
