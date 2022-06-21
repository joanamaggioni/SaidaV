import { Request, Response } from "express";
import { GetAllOrdersService } from "../services/Order/GetAllOrdersService";
import { GetActiveOrdersService } from "../services/Order/GetActiveOrdersService";
import { ConcludeOrderService } from "../services/Order/ConcludeOrderService";
import { CreateOrderService } from "../services/Order/CreateOrderService";
import { UpdateActiveOrder } from "../services/Order/UpdateActiveOrder";
import { DeleteFromActiveOrder } from "../services/Order/DeleteFromActiveOrder";
class OrderController {
async listAll(req: Request, res: Response) {
const { is_admin: isAdmin, user_id: userId } = req;
const service = new GetAllOrdersService();
try {
const result = await service.execute(userId, isAdmin);
return res.json(result);
} catch (err)
{ return res
.status(err.code ?? 400)
.json({ error: err.error ?? err.message });
}
}
async getActive(req: Request, res: Response) {
const { user_id: userId } = req;
const service = new GetActiveOrdersService();
try {
const result = await service.execute(userId);
return res.json(result);
} catch (err)
{ return res
.status(err.code ?? 400)
.json({ error: err.error ?? err.message });
}
}
async create(req: Request, res: Response) {
const { is_admin: isAdmin, user_id: userId } = req;
const { products } = req.body;
const service = new CreateOrderService();
if (!isAdmin) {
try {
const result = await service.execute(userId, products);
return res.json(result);
} catch (err)
{ return res
.status(err.code ?? 400)
.json({ error: err.error ?? err.message });
}
} else
return res.status(401).json({ error: "Admins can't create orders." });
}

