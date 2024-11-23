import ProductCard from './ProductCard';

const ProductList = ({ products }) => (
  <div>
    {products.map(product => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
);

export default ProductList;
