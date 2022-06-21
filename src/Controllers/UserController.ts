const service = new UpdateUserService();
try {
const result = await service.execute(
user_id,
email,
password,
name,
adress,
phone,
last_name
);
return res.json(result);
} catch (err)
{ return res
.status(err.code ?? 400)
.json({ error: err.error ?? err.message });
}
}
async listAll(req: Request, res: Response) {
const { is_admin: isAdmin } = req;
const service = new GetAllUsersService();
if (isAdmin) {
try {
const result = await service.execute();
return res.json(result);
} catch (err)
{ return res
.status(err.code ?? 400)
.json({ error: err.error ?? err.message });
}
} else
return res.status(401).json({ error: "Only admins can create sizes." });
}
}
export { UserController };
