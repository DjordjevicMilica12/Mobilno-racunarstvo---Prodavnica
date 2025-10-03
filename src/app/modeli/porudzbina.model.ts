import { StavkaPorudzbine } from '../modeli/stavkaPorudzbine.model';

export interface Porudzbina {
  porudzbinaID?:string;
  kupacID: string;
  stavke: StavkaPorudzbine[]; 
  status: string;
  datum: Date;
}
