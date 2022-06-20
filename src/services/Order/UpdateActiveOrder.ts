import prismaClient from "../../prisma";

interface IProducts {
  product_id: string;
  size_id: number;
  quantity: number;
}

class UpdateActiveOrder {
  async execute(user_id: string, products: IProducts[]) {
    const order = await prismaClient.orders.findFirst({
      where: {
        user_id,
        done: false,
      },
    });

    if (!order)
      throw {
        error: "Active order not found.",
        code: 404,
      };

    let orderValue = 0;

    for (const product of products) {
      const orderedProduct = await prismaClient.orderedProducts.findFirst({
        where: {
          order_id: order.id,
          product_id: product.product_id,
          size_id: product.size_id,
        },
      });

      if (orderedProduct) {
        await prismaClient.orderedProducts.update({
          data: {
            quantity: product.quantity,
          },
          where: {
            id: orderedProduct.id,
          },
        });
      } else {
        await prismaClient.orderedProducts.create({
          data: {
            order_id: order.id,
            product_id: product.product_id,
            size_id: product.size_id,
            quantity: product.quantity,
          },
        });
      }

      const { value } = await prismaClient.product.findFirst({
        where: {
          id: product.product_id,
        },
      });

      const prevQuantity = await prismaClient.quantity.findFirst({
        where: {
          product_id: product.product_id,
          size_id: product.size_id,
        },
      });

      if (!prevQuantity)
        throw {
          error: "Product Size not avaliable.",
          code: 400,
        };

      const newQuantity = orderedProduct
        ? prevQuantity.quantity + orderedProduct.quantity - product.quantity
        : prevQuantity.quantity - product.quantity;

      if (newQuantity < 0)
        throw {
          error: "Product Size quantity not avaliable.",
          code: 400,
        };

      if (newQuantity > 0) {
        await prismaClient.quantity.update({
          where: {
            id: prevQuantity.id,
          },
          data: {
            quantity: newQuantity,
          },
        });
      } else {
        await prismaClient.quantity.delete({
          where: {
            id: prevQuantity.id,
          },
        });
      }

      orderValue += value * product.quantity;
    }

    const updatedOrder = await prismaClient.orders.update({
      where: {
        id: order.id,
      },
      data: {
        value: orderValue,
      },
    });

    return updatedOrder;
  }
}

export { UpdateActiveOrder };
