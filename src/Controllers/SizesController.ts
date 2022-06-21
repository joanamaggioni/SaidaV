async delete(req: Request, res: Response) {
const { id } = req.params;
const { is_admin: isAdmin } = req;
if (isAdmin) {
const service = new DeleteSizeService();
try {
const result = await service.execute(Number(id));
return res.json(result);
} catch (err)
{ return res
.status(err.code ?? 400)
.json({ error: err.error ?? err.message });
}
} else
return res.status(401).json({ error: "Only admins can delete sizes." });
}
async listAll(req: Request, res: Response) {
const service = new GetAllSizesServices();
try {
const result = await service.execute();
return res.json(result);
} catch (err)
{ return res
.status(err.code ?? 400)
.json({ error: err.error ?? err.message });
}
}
}
export { SizesController };
