export interface Usuario {
    id?: number;
    nome: string;
    email: string;
    senha?: string; // Opcional para não vir no GET
}