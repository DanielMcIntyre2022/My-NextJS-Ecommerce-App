import { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout'
import { ProductsContext } from '../components/ProductContext';

export default function CheckoutPage() {

    const {selectedProducts} = useContext(ProductsContext);
    const [productsInfos, setProductsInfos] = useState([]);

    useEffect(() => {
        const uniqIds = [...new Set(selectedProducts)];
        fetch('/api/products?ids='+uniqIds.join(','))
          .then(response => response.json())
          .then(json => setProductsInfos(json));
      }, [selectedProducts]);

    return (
        <Layout>
            {!productsInfos.length && (
                <div>no products in your shopping cart</div>
            )}
            {productsInfos.length && productsInfos.map(productsInfo => (
                <div className='flex mb-5'>
                    <div className='bg-gray-100 p-3 rounded-xl shrink-0'>
                        <img className='w-24' src={productsInfo.picture} alt=""/>
                    </div>
                    <div className='pl-4'>
                        <h3 className='font-bold text-lg'>{productsInfo.name}</h3>
                        <p className='text-sm leading-4 text-gray-500'>{productsInfo.description}</p>
                        <div className='flex'>
                            <div className='grow'>${productsInfo.price}</div>
                            <div>
                                <button className='border border-emerald-500 px-2'>-</button>
                                {selectedProducts.filter(id => id === productsInfo._id).length}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </Layout>
    );
}