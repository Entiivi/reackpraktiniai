export default function ProductItem({ product, addToCart }) {
    return (
      <div className="product-item">
        <h3>{product.name}</h3>
        <p>Kaina: {product.price} €</p>
        <button onClick={() => addToCart(product)}>Pridėti į krepšelį</button>
      </div>
    );
  }
  