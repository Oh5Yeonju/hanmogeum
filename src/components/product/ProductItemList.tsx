import styled from "styled-components";
import ProductItem from "./ProductItem";
import { Product } from "@/types/products";

interface ProductItemListProps {
  products: Product[];
}

const ProductItemList = ({ products }: ProductItemListProps) => {
  return (
    <ProductItemListLayer>
      {products &&
        products.map((product, idx) => {
          const key = idx.toString();
          return <ProductItem product={product} key={key} />;
        })}
    </ProductItemListLayer>
  );
};

export default ProductItemList;

const ProductItemListLayer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;
