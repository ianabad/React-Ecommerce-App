import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";


export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        agent.Catalog.list()
        .then(products => setProducts(products))
        .catch(error => console.log(error))
    }, [])

    return (
        <>
            <ProductList products={products} />
        </>

    )
}