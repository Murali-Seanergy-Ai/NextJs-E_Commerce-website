import CartProducts from "@/app/models/cart-products";


async function fixCartIndexes() {
  try {
    const indexes = await CartProducts.collection.indexes();

    const oldIndex = indexes.find(i => i.name === "productId_1");

    if (oldIndex) {
      console.log("Dropping old index productId_1...");
      await CartProducts.collection.dropIndex("productId_1");
    }

    console.log("Ensuring correct index...");
    await CartProducts.collection.createIndex(
      { productId: 1, user: 1 },
      { unique: true }
    );

  } catch (err) {
    console.error("Index fix error:", err);
  }
}

export default fixCartIndexes