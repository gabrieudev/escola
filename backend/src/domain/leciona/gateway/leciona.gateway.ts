import { Leciona } from "../entity/leciona";

export interface LecionaGateway {
    create(leciona: Leciona): Promise<Leciona>;
}
