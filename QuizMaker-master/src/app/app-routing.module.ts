import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizMakerComponent } from './feature/quiz-maker/quiz-maker.component';
import { QuizResultComponent } from './feature/quiz-result/quiz-result.component';

const routes: Routes = [
  {
    path: 'result',
    component: QuizResultComponent
  },
  {
    path: '',
    component: QuizMakerComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
