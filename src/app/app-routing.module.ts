import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MapPageComponent} from './map-page/map-page.component';
import {AboutComponent} from './about/about.component';


const routes: Routes = [
  {path: '', component: MapPageComponent},
  {path: 'about', component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
