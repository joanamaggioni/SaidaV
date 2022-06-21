async conclude(req: Request, res: Response) {
const { user_id: userId } = req;
const service = new ConcludeOrderService();
try {
const result = await service.execute(userId);
return res.json(result);
} catch (err)
{ return res
.status(err.code ?? 400)
.json({ error: err.error ?? err.message });
}
}
}
export { OrderController };


