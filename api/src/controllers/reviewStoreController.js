const { Book, ReviewStore, conn } = require("../db");

// Controller: create review store
const insertReviewStore = async (data) => {
  const transaction = await conn.transaction();

  try {
    const reviewStore = await ReviewStore.create(data, { transaction });
    const reviewStoreAverage = await ReviewStore.findAll({
      where: { bookId: data.bookId },
      attributes: ["bookId", [conn.fn("avg", conn.col("score")), "average"]],
      group: ["bookId"],
      transaction,
    });

    const average = Number(reviewStoreAverage[0].dataValues.average).toFixed(2);

    await Book.update(
      { averageRating: average },
      { where: { id: data.bookId }, transaction }
    );

    await transaction.commit();

    return reviewStore;
  } catch (e) {
    await transaction.rollback();
    console.log(e);
    throw Error(e.message);
  }
};

module.exports = {
  insertReviewStore,
};
