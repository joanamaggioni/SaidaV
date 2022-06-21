async vinculateCategory(req: Request, res: Response) {
const { id } = req.params;
const { categories } = req.body;
const { is_admin: isAdmin } = req;
if (isAdmin) {
const service = new LinkProductToCategory();
try {
const result = await service.execute(id, categories);
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
.json({ error: "Only admins can vinculate products." });
}
async vinculateSize(req: Request, res: Response) {
const { id } = req.params;
const { quantities } = req.body;
const { is_admin: isAdmin } = req;
if (isAdmin) {
const service = new LinkProductToSize();
try {
const result = await service.execute(id, quantities);
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
.json({ error: "Only admins can vinculate products." });
}

