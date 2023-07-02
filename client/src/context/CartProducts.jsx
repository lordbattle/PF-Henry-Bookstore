import { createContext } from 'react';
import localStorage from "../components/LocalStorage/LocalStorage"

const { cart } = localStorage();

    let totalProducts = 0;

    cart.forEach((item)=>{
        totalProducts += item.stock;
    })

const productContext = createContext({
    cant: totalProducts
});

export default productContext

