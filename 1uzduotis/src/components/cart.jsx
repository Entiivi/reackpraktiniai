export default function Cart({ cart, removeFromCart }) {
    // Calculate total items and total price
    const totalItems = cart.length;
    const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

    return (
        <div className="krep">
            <h2>Krepšelis</h2>

            {/* Display total items and total price */}
            <div className="cart-summary">
                <p>Viso prekių: {totalItems}</p>
                <p>Bendra kaina: {totalPrice.toFixed(2)} €</p>
            </div>

            {cart.length === 0 ? (
                <p>Krepšelis tuščias.</p>
            ) : (
                <div className="cart-list">
                    {cart.map((item) => (
                        <div key={item.cartId} className="cart-item">
                            <h4>{item.name}</h4>
                            <p>Kaina: {item.price} €</p>
                            <button onClick={() => removeFromCart(item.cartId)}>
                                Pašalinti
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
