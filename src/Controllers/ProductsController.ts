async listAll(req: Request, res: Response) {
const { is_admin: isAdmin } = req;
const { size_id: sizeFilter, category_id: categoryFilter } = req.query;
const service = new GetAllTransactionsServices();
try {
const result = await service.execute(
Number(sizeFilter),
categoryFilter,
isAdmin
);
return res.json(result);
} catch (err)
{ return res
.status(err.code ?? 400)
.json({ error: err.error ?? err.message });
}
}
async find(req: Request, res: Response) {
const { id: productId } = req.params;
const service = new GetProductFromIdServices();
try {
const result = await service.execute(productId);
return res.json(result);
} catch (err)
{ return res
.status(err.code ?? 400)
.json({ error: err.error ?? err.message });
}
}
}
export { ProductsController };

