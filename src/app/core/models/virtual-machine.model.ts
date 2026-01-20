import { StatusVm } from './status-vm.enum';

export interface VirtualMachine {
    id?: number;            // O '?' indica que o campo é opcional (no cadastro não temos ID ainda)
    nome: string;
    cpu: number;
    memoria: number;        // BigDecimal vira number
    disco: number;          // BigDecimal vira number
    dataCriacao?: string;   // ISO format vindo do LocalDateTime
    status: StatusVm;
}