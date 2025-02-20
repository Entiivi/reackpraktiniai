import ProductItem from "./Produktas";

export default function ProductList({ products, addToCart }) {
    return (
      <div className="product-list">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    );
  }
