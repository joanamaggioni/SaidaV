import { Request, Response } from "express";
import { CreateProductService } from "../services/Products/CreateProductService";
import { GetAllTransactionsServices } from
"../services/Products/GetAllProductServices"; import { DeleteProductService } from
"../services/Products/DeleteProductService"; import { LinkProductToCategory } from
"../services/Products/LinkProductToCategory"; import { LinkProductToSize } from
"../services/Products/LinkProductToSize";
import { UpdateProductService } from "../services/Products/UpdateProductService";
import { GetProductFromIdServices } from "../services/Products/GetProductFromIdServices";
class ProductsController {
async create(req: Request, res: Response) {
const { name, value, image, description, quantities, categories } =
req.body;
const { is_admin: isAdmin } = req;
if (isAdmin) {
const errors: String[] = [];
!name && errors.push("name");
!value && errors.push("value");
!image && errors.push("image");
if (errors.length !== 0) {
return
res.status(400).json({ error:
errors.length === 1
? `Field is required: ${errors[0]}`
: `Fields are required: ${errors.join(", ")}`,
});
}
const service = new CreateProductService();
try {
const result = await service.execute(
name,
value,
image,
description
,
quantities,
categories
);
return res.json(result);
} catch (err)
{ return res
.status(err.code ?? 400)
.json({ error: err.error ?? err.message });
}
} else
return
res
.status(401)
.json({ error: "Only admins can create products." });
}
