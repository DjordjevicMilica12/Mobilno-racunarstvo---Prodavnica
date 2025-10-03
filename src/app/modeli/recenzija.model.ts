export interface Recenzija {
  recenzijaID?: string;
  kupacID: string;
  proizvodID: string;
  tekst: string;
  slika?: string | File;
  datum?: Date | string;
}
