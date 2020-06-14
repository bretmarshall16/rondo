import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { CounterComponent } from './components/counter/counter.component';


const counter: Route = {
  path: '',
  component: CounterComponent
};


const routes: Routes = [
  counter
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
