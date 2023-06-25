  const bookFilterAndPagination = ( books , order , page, limit , price ) => {

    if (order) {
        if(price){
          switch (order) {
            case 'asc':
                books.sort((a, b) => a.price - b.price);
              break;
            default:
                books.sort((a, b) => a.price - b.price ).reverse();
              break;
          }
        }else{
          switch (order) {
            case 'asc':
                books.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
              break;
            default:
                books.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase())).reverse();
              break;
          }
        }    
      }
      if (page && limit) {
        const pageInt = Number(page);
        const limitInt = Number(limit);
        const total = books.length;
    
        if (pageInt === 0 || limitInt === 0)
          throw new Error('page or limit cannot be zero')
        if ((total / limitInt) === 0 && (total / limitInt) < pageInt)
          throw new Error('non-existent page number in the search')
        if ((total / limitInt) === 1 && pageInt > 1)
          throw new Error('non-existent page number in the search')
        if (total < limitInt && pageInt > 1)
          throw new Error('non-existent page number in the search')
        if ((total % limitInt) === 1 && pageInt > (Math.floor(total / limitInt) + 1))
          throw new Error('non-existent page number in the search')
        if ((total % limitInt) === 0 && pageInt > (total / limitInt))
          throw new Error('non-existent page number in the search')
    
    
        const indiceInicio = (pageInt * limitInt) - limitInt;
        const indiceFin = indiceInicio + limitInt;
    
        if (pageInt === 1 && total === 1)
          return books[0];
        if ((total / limit) === 1)
          return books;
        if (total < limit)
          return books;
        if ((total % limit) === 1 && pageInt === (Math.floor(total / limit) + 1)) {
          if (indiceInicio === (total - 1))
            return books.slice(-1);
    
          return books.slice(indiceInicio, (total - 1));
        }
        return books.slice(indiceInicio, indiceFin)
      }
}

module.exports = {
    bookFilterAndPagination
}