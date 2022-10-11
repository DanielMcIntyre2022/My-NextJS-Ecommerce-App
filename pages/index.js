import { useEffect, useState } from "react"


export default function Home() {

  const [productsInfo, setProductsInfo] = useState([]);

  useEffect(() => {
    fetch('/api/products')
    .then(res => res.json())
    .then(json => setProductsInfo(json));
  },[]);
 

  const categoriesNames = [...new Set(productsInfo.map(product => product.category))];
  

  return (
    <div className="p-5">
      <div>
        {categoriesNames.map(categoryName => (
          <div key={categoryName}>
               <h2 className="text-2xl capitalize">{categoryName}</h2>
          </div>
        ))}
    
       <div className="py-4">
        <div className="w-64">
          <div className="bg-blue-100 p-5 rounded-xl">
            <img src="/products/iphone.png"/>
          </div>
          <div className="mt-2">
            <h3 className="font-bold text-lg">iphone 14 Pro</h3>
          </div>
          <p className="text-sm mt-1 leading-4"> 
          orem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id pharetra purus, id rutrum risus. Duis tortor sem, aliquet vitae tortor id, lobortis posuere nibh. Aenean enim nibh, consequat sed nulla nec, lacinia ultrices est. Pellentesque egestas.
          </p>
          <div className="flex mt-1">
            <div className="text-2xl font-bold grow">$899</div>
            <button className="bg-emerald-400 text-white py-1 px-3 rounded-xl">+</button>
          </div>
        </div>
       </div>
      </div>
    </div>
  )
}
