import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { useState } from 'react';

export interface ProductsProps {
  products: ProductsItemsProps[]
}
export interface ProductsItemsProps {
  id: number;
  name: string;
  imageURL: string;
  listPrice: string;
  salePrice: string;
  favorite: boolean;
}

export default function Home({ products }: ProductsProps) {
  const [listProducts, setListProducts] = useState<ProductsItemsProps[]>(products);

  const handleFavoriteProduct = (productId: number) => {
    const newProductArray = listProducts.map((product: ProductsItemsProps) => (
      product.id === productId ? { ...product, favorite: !product.favorite } : product
    ));
    setListProducts(newProductArray);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Product List</title>
        <meta name="description" content="Product List" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Product_List</h1>
        {listProducts.map((product: ProductsItemsProps, index: number) => (
          <div key={`product-${index}`} className={styles.cardProduct}>
            <div className={styles.productContainer}>
              <Image 
                src={product.imageURL}
                alt={`image-${product.id}`}
                loading="lazy"
                width={200}
                height={200}
                className={styles.image}
              />
              {product.favorite 
                ? 
                  <MdFavorite 
                    className={styles.icon}
                    size={30}
                    color="red"
                    onClick={() => handleFavoriteProduct(product.id)}
                  /> 
                : 
                  <MdFavoriteBorder
                    className={styles.icon}  
                    size={30}
                    onClick={() => handleFavoriteProduct(product.id)}
                  />
              }
              <div className={styles.productDescription}>
                <span>{product.name}</span>
                <span>{product.listPrice}</span>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = () => {
  const products: ProductsItemsProps[] = [
    {
      id: 1,
      name: "TShirt Colors",
      imageURL: "https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80",
      listPrice: "49.90",
      salePrice: "49.90",
      favorite: true
    },
    {
      id: 2,
      name: "TShirt White",
      imageURL: "https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80",
      listPrice: "49.90",
      salePrice: "49.90",
      favorite: false
    },
    {
      id: 3,
      name: "Jacket",
      imageURL: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80",
      listPrice: "49.90",
      salePrice: "49.90",
      favorite: false
    },
    {
      id: 4,
      name: "Tricot",
      imageURL: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=705&q=80",
      listPrice: "49.90",
      salePrice: "49.90",
      favorite: true
    }
  ];

  return {
    props: {
      products
    },
    revalidate: 30
  }
}
