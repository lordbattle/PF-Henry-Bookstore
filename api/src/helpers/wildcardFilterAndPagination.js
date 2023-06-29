const wildcardFilterAndPagination = (
  wildcard,
  orderTitle,
  orderPrice,
  orderStock,
  page,
  limit,
) => {
  console.log("probando funcion helper");

  wildcard.sort((a, b) => {
    if (orderPrice === "asc") {
      if (a.price !== b.price) {
        return a.price - b.price;
      } else {
        // If prices are the same, sort by title
        return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
      }
    } else if (orderPrice === "desc") {
      if (a.price !== b.price) {
        return b.price - a.price;
      } else {
        // If prices are the same, sort by title
        return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
      }
    }

    if (orderStock === "asc") {
      if (a.stock !== b.stock) {
        return a.stock - b.stock;
      } else {
        // If stock are the same, sort by title
        return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
      }
    } else if (orderStock === "desc") {
      if (a.stock !== b.stock) {
        return b.stock - a.stock;
      } else {
        // If stock are the same, sort by title
        return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
      }
    }

    // Order title
    if (orderTitle === "asc") {
      return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
    } else if (orderTitle === "desc") {
      return b.title.toLowerCase().localeCompare(a.title.toLowerCase());
    }
  });

  if (page && limit) {
    const pageInt = Number(page);
    const limitInt = Number(limit);
    const total = wildcard.length;

    if (pageInt === 0 || limitInt === 0)
      throw new Error("page or limit cannot be zero");
    if (total / limitInt === 0 && total / limitInt < pageInt)
      throw new Error("non-existent page number in the search");
    if (total / limitInt === 1 && pageInt > 1)
      throw new Error("non-existent page number in the search");
    if (total < limitInt && pageInt > 1)
      throw new Error("non-existent page number in the search");
    if (total % limitInt === 1 && pageInt > Math.floor(total / limitInt) + 1)
      throw new Error("non-existent page number in the search");
    if (total % limitInt === 0 && pageInt > total / limitInt)
      throw new Error("non-existent page number in the search");

    const indiceInicio = pageInt * limitInt - limitInt;
    const indiceFin = indiceInicio + limitInt;

    if (pageInt === 1 && total === 1) return wildcard[0];
    if (total / limit === 1) return wildcard;
    if (total < limit) return wildcard;
    if (total % limit === 1 && pageInt === Math.floor(total / limit) + 1) {
      if (indiceInicio === total - 1) return wildcard.slice(-1);

      return wildcard.slice(indiceInicio, total - 1);
    }
    return wildcard.slice(indiceInicio, indiceFin);
  }
};

module.exports = {
  wildcardFilterAndPagination,
};
