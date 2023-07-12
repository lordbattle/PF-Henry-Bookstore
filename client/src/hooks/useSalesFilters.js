import { useState } from "react"


const useSalesFilters = () => {
    const [statusFilter, setStatusFilter] = useState({
      statusFil: "all"
    });
  
    const filterByStatus = (arr) => {
        if (!Array.isArray(arr)) {
            return [];
          }
      return arr.filter(stus => {
        return statusFilter.statusFil === 'all' || stus.status === statusFilter.statusFil;
      });
    };
  
    return { statusFilter, setStatusFilter, filterByStatus };
  };

export default useSalesFilters