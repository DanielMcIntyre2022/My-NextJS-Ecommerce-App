import { useState } from "react"
import Footer from "../components/Footer";
import Product from "../components/Product";
import Layout from  "../components/Layout";
import { initMongoose } from "../lib/mongoose";
import { findAllProducts } from "./api/products";

export default function Home({products}) {

  const [phrase, setPhrase] = useState('')

  const categoriesNames = [...new Set(products.map(product => product.category))];
  
  if (phrase) {
    products = products.filter(product => product.name.toLowerCase().includes(phrase));
  }

  return (
    <Layout>
      <input value={phrase} onChange={e => setPhrase(e.target.value)}type="text" placeholder="Search for products..." className="bg-gray-100 w-full py-2 px-4 rounded-xl"></input>
      <div>
        {categoriesNames.map(categoryName => (
          <div key={categoryName}>
            {products.find(products => products.category === categoryName) && (
              <div>
                <h2 className="text-2xl py-5 capitalize">{categoryName}</h2>
              <div className="flex -mx-5 overflow-x-scroll snap-x scrollbar-hide">
               {products.filter(product => product.category === categoryName).map(productInfo => (
                <div key={productInfo._id} className="px-5 snap-start">
                  <Product {...productInfo}/>
                </div>
               ))}
              </div>
              </div>
            )}  
          </div>
        ))}
      </div>

      </Layout>
  )
}

export async function getServerSideProps() {
  await initMongoose();
  const products = await findAllProducts();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    }
  }
}
