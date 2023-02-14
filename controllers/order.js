const { Orders, Products, ProductOrders } = require("../models");

module.exports = {
  add: async (req, res) => {
    try {
      const payLoad = {
        address: "KPK",
        products: [
          {
            id: 8,
            qty: 4,
          },
          {
            id: 2,
            qty: 3,
          },
        ],
      };

      const savedOrder = await Orders.create(
        payLoad,
        { w: 1 },
        { returning: true }
      );
      payLoad.products.forEach(async (item) => {
        const po = {
          fk_order_Id: savedOrder.id,
          fk_product_Id: item.id,
          quantity: item.qty,
        };
        await ProductOrders.create(po, { w: 1 }, { returning: true });
      });

      return res.status(200).json(savedOrder);
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong!");
    }
  },

  get: async (req, res) => {
    try {
      const allOrders = await Orders.findOne({
        where: { id: 8 },
        attributes: ["id", "address"],
        include: [
          {
            model: Products,
            required: true,
            as: "products",
            attributes: ["id", "price"],
            through: {
              attributes: ["id"],
            },
          },
        ],
      });
      return res.status(200).json(allOrders);
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong!");
    }
  },
};
