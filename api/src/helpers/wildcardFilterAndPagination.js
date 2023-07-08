const wildcardFilterAndPagination = (
  wildcard,
  orderTitle,
  orderPrice,
  orderStock,
  page,
  limit
) => {
  if (orderTitle === "asc") {
    wildcard.sort((a, b) =>
      a.title.toLowerCase().localeCompare(b.title.toLowerCase())
    );
  } else if (orderTitle === "desc") {
    wildcard.sort((a, b) =>
      b.title.toLowerCase().localeCompare(a.title.toLowerCase())
    );
  }

  if (orderPrice === "asc") {
    wildcard.sort((a, b) => a.price - b.price);
  } else if (orderPrice === "desc") {
    wildcard.sort((a, b) => b.price - a.price);
  }

  if (orderStock === "asc") {
    wildcard.sort((a, b) => a.stock - b.stock);
  } else if (orderStock === "desc") {
    wildcard.sort((a, b) => b.stock - a.stock);
  }

  if (page && limit) {
    const pageInt = Number(page);
    const limitInt = Number(limit);
    const total = wildcard.length;

    if (pageInt === 0 || limitInt === 0) {
      throw new Error("page or limit cannot be zero");
    }
    if (total < limitInt && pageInt > 1) {
      throw new Error("non-existent page number in the search");
    }
    if (total % limitInt === 1 && pageInt > Math.floor(total / limitInt) + 1) {
      throw new Error("non-existent page number in the search");
    }
    if (total % limitInt === 0 && pageInt > total / limitInt) {
      throw new Error("non-existent page number in the search");
    }

    const startIndex = (pageInt - 1) * limitInt;
    const endIndex = startIndex + limitInt;

    return wildcard.slice(startIndex, endIndex);
  }
  if (limit) {
    const limitInt = Number(limit);

    if (limitInt === 0) {
      throw new Error("limit cannot be zero");
    }

    const slootsBooks = wildcard.slice(0, limitInt);

    return [slootsBooks.length];
  }

  return wildcard;
};

module.exports = {
  wildcardFilterAndPagination,
};
