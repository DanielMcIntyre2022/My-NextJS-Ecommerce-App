import { ProductsContext, ProductsContextProvider } from '../components/ProductContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ProductsContextProvider>
      <Component {...pageProps} />
    </ProductsContextProvider>
  ); 
}

export default MyApp
