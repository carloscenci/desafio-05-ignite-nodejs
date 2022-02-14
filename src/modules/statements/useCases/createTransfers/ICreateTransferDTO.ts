export interface ICreateTransferDTO {
    amount: number;
    description: string;
    user_id: string;
    receiving_user_id: string;
    type?: string
}