export interface Korisnik {
  kupacID: string;
  email: string;
  lozinka?: string;
  ime: string;
  prezime: string;
  adresa: string;
  brojTelefona: number | null
  token?: string;
}
