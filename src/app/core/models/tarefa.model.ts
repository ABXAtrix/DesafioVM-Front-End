import { Usuario } from './usuario.model';
import { VirtualMachine } from './virtual-machine.model';

export interface Tarefa {
  id?: number;
  usuario: Usuario;
  virtualMachine?: VirtualMachine;
  nomeMaquina: string;
  acao: string; // "START", "STOP", "CREATE", "DELETE"
  dataHora: string | Date;
}