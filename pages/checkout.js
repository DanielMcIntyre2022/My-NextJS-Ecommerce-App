import { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout'
import { ProductsContext } from '../components/ProductContext';

export default function CheckoutPage() {

    const {selectedProducts} = useContext(ProductsContext);
    const [productsInfos, setProductsInfos] = useState([]);

    useEffect(() => {

        const uniqIds = [...new Set(selectedProducts)];
        fetch('/api/products?ids='+uniqIds.join(','))
        .then(res => res.json())
        .then(json => setProductsInfos(json));
    },[selectedProducts]);

    return (
        <Layout>
            {!productsInfos.length && (
                <div>no products in your shopping cart</div>
            )}
            {productsInfos.length && (
                <div></div>
            )}
        </Layout>
    );
}