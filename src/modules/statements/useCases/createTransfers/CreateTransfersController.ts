import { container } from 'tsyringe';
import { Request, Response } from "express"
import { CreateTransfersUseCase } from './CreateTransfersUseCase';


class CreateTransfersController {
    async handle(req: Request, res: Response){
        const { amount, description} = req.body;
        const receiving_user_id = req.params.user_id;

        const user_id = req.user.id;

        const createTransfer = container.resolve(CreateTransfersUseCase);

        const transfer = await createTransfer.execute({
            amount,
            description,
            receiving_user_id,
            user_id
        });

        res.status(201).json(transfer);

        
    }
}

export { CreateTransfersController }