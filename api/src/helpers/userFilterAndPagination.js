const userFilterAndPagination = (
  wildcard,
  orderUsername,
  orderName,
  orderEmail,
  page,
  limit
) => {
  if (orderUsername === "asc") {
    wildcard.sort((a, b) =>
      a.userName.toLowerCase().localeCompare(b.userName.toLowerCase())
    );
  } else if (orderUsername === "desc") {
    wildcard.sort((a, b) =>
      b.userName.toLowerCase().localeCompare(a.userName.toLowerCase())
    );
  }

  if (orderName === "asc") {
    wildcard.sort((a, b) =>
      a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    );
  } else if (orderName === "desc") {
    wildcard.sort((a, b) =>
      b.name.toLowerCase().localeCompare(a.name.toLowerCase())
    );
  }

  if (orderEmail === "asc") {
    wildcard.sort((a, b) =>
      a.email.toLowerCase().localeCompare(b.email.toLowerCase())
    );
  } else if (orderEmail === "desc") {
    wildcard.sort((a, b) =>
      b.email.toLowerCase().localeCompare(a.email.toLowerCase())
    );
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

  return wildcard;
};

module.exports = {
  userFilterAndPagination,
};
