import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Pocetna',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'Pocetna',
    loadChildren: () => import('./pocetna/pocetna.module').then( m => m.PocetnaPageModule)
  },
  {
    path: 'prijava',
    loadChildren: () => import('./nalogPrijava/nalog.module').then( m => m.NalogPageModule)
  },
  {
    path: 'korpa',
    loadChildren: () => import('./korpa/korpa.module').then( m => m.KorpaPageModule)
  },
  {
    path: 'registracija',
    loadChildren: () => import('./nalog-registracija/nalog-registracija.module').then( m => m.NalogRegistracijaPageModule)
  },
  {
    path: 'proizvod/:name',
    loadChildren: () => import('./proizvod/proizvod.module').then( m => m.ProizvodPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
