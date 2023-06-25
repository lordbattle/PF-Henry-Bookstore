const { useState } = require("react")

const useFilters = () => {
    const [filters, setFilters] = useState({
        rating: "all",
        price: "all",
        genre: "all"
    })


    const filtersBooks = (arr) => {
        return arr.filter(book => {
            return (
                filters.genre === "all" || book
            )
        })

    }

}