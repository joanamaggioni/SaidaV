async create(req: Request, res: Response) {
const { email, password, name, adress, phone, last_name } = req.body;
const errors: String[] = [];
!email && errors.push("email");
!password && errors.push("password");
!name && errors.push("name");
!adress && errors.push("adress");
!phone && errors.push("phone");
if (errors.length !== 0) {
return
res.status(400).json({ error:
{
message:
errors.length === 1
? `Field is required: ${errors[0]}`
: `Fields are required: ${errors.join(", ")}`,
},
});
}
const service = new CreateUserService();
try {
const result = await service.execute(
email,
password
, name,
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
async update(req: Request, res: Response) {
const { user_id } = req;
const { email, password, name, adress, phone, last_name } = req.body;
if (!email && !password && !name && !last_name && !adress && !phone) {
return res.status(400).json({
error: {
message: `Some field is required: email, password, name, adress, phone, last_name`,
},
});
}
