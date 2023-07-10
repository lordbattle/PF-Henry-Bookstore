import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrders } from '../../../../redux/actions'


const SalesTable = () => {
        const dispatch = useDispatch()

       const orders = useSelector(state => state.orders)

       console.log(orders);
    useEffect(() => {
        dispatch(getAllOrders())
    }, [dispatch])

  return (
    <>
    <div>
        <h3>Orders</h3>
    </div>
    
    </>
  )
}

export default SalesTable