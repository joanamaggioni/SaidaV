async update(req: Request, res: Response) {
const { id } = req.params;
const { name, value, image, description, quantities, categories } =
req.body;
const { is_admin: isAdmin } = req;
if (isAdmin) {
if (
!name &&
!value &&
!image &&
!description &&
!quantities &&
!categories
) {
return res.status(400).json({
error: {
message: `Some field is required: name, value, image, quantities, categories`,
},
});
}
const service = new UpdateProductService();
try {
const result = await service.execute(
id,
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
.json({ error: "Only admins can update products." });
}
async delete(req: Request, res: Response) {
const { id } = req.params;
const { is_admin: isAdmin } = req;
if (isAdmin) {
const service = new DeleteProductService();
try {
const result = await service.execute(String(id));
return res.json(result);
} catch (err) {
return res
.status(err.code ?? 400)
.json({ error: err.error ?? err.message });
}
} else
return
res
.status(401)
.json({ error: "Only admins can delete products." });
}
