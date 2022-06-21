import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/User/AuthenticateUserService";
import { CreateUserService } from "../services/User/CreateUserService";
import { UpdateUserService } from "../services/User/UpdateUserService";
import { GetAllUsersService } from "../services/User/GetAllUsersService";
class UserController {
async authenticate(req: Request, res: Response) {
const { email, password } = req.body;
const errors: String[] = [];
!email && errors.push("email");
!password && errors.push("password");
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
const service = new AuthenticateUserService();
try {
const result = await service.execute(email, password);
return res.json(result);
} catch (err)
{ return res
.status(err.code ?? 400)
.json({ error: err.error ?? err.message });
}
}

