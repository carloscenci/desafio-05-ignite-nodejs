import { IStatementsRepository } from './../../repositories/IStatementsRepository';
import { inject, injectable } from 'tsyringe';
import { CreateStatementError } from '../createStatement/CreateStatementError';


interface IRequest {
    amount: number;
    description: string;
    user_id: string;
    receiving_user_id: string
} 

@injectable()
class CreateTransfersUseCase {

    constructor(
        @inject('StatementsRepository')
        private statementsRepository: IStatementsRepository
    ){}

    async execute({ amount, description, user_id, receiving_user_id}: IRequest){
        
        const { balance } = await this.statementsRepository.getUserBalance({
            user_id,
            with_statement: true
        });

        if (balance < amount) {
            throw new CreateStatementError.InsufficientFunds()
        }

        const transfer = await this.statementsRepository.transfer({
            amount,
            description,
            receiving_user_id,
            user_id,
        })

        return transfer;

    }

}

export { CreateTransfersUseCase }