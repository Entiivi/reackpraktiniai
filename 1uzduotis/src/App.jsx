import { useState } from "react";
import ProductList from "./components/Produktasar";
import Cart from "./components/Cart";
import GuessGame from "./components/GuessGame";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

export default function App() {
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState([]);
  const [tasks, setTasks] = useState([]);

  // Shopping Cart Functions
  const addToCart = (product) => {
    const uniqueItem = { ...product, cartId: Date.now() };
    setCart([...cart, uniqueItem]);
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter((item) => item.cartId !== cartId));
  };

  const products = [
    { id: 1, name: "Knyga", price: 10 },
    { id: 2, name: "Pelė", price: 20 },
    { id: 3, name: "Klaviatūra", price: 30 },
  ];

  // Task List Functions
  const addTask = (taskText) => {
    setTasks([...tasks, { id: Date.now(), text: taskText, completed: false }]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <>
      <h1>Ignas Sakalauskas PI22B</h1>

      <div>
        <div className="card" style={{ display: 'flex', flex: 1 }}>
          <button onClick={() => setCount(count + 1)}>
            count is {count}
          </button>
        </div>
      </div>

      {/* Task List */}
      <h2>Užduočių Sąrašas</h2>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />

      {/* Product List */}
      <h2>Prekių Sąrašas</h2>
      <ProductList products={products} addToCart={addToCart} />

      {/* Shopping Cart */}
      <h2>Krepšelis</h2>
      <Cart cart={cart} removeFromCart={removeFromCart} />

      {/* Number Guessing Game */}
      <h2>Skaičių Spėjimo Žaidimas</h2>
      <GuessGame />
    </>
  );
}
