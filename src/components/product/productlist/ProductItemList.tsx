import styled from "styled-components";
import ProductItem from "./ProductItem";
import { Product } from "@/types/products";
import EmptyMessage from "@/components/common/EmptyMessage";

interface ProductItemListProps {
  products: Product[];
  listCount: number;
}

const ProductItemList = ({ products, listCount }: ProductItemListProps) => {
  return products.length ? (
    <ProductItemListLayer $listCount={listCount}>
      {products &&
        products.map((product, idx) => {
          const key = idx.toString();
          return <ProductItem product={product} key={key} />;
        })}
    </ProductItemListLayer>
  ) : (
    <EmptyMessage />
  );
};

export default ProductItemList;

const ProductItemListLayer = styled.div<{ $listCount: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$listCount}, 1fr);
  gap: 20px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(${(props) => props.$listCount - 1}, 1fr);
  }
`;