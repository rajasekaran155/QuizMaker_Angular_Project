import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DropDownComponent } from './shared/reusableComponents/drop-down/drop-down.component';
import { QuizMakerComponent } from './feature/quiz-maker/quiz-maker.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { QuizResultComponent } from './feature/quiz-result/quiz-result.component';

@NgModule({
  declarations: [
    AppComponent,
    DropDownComponent,
    QuizMakerComponent, QuizResultComponent
  ],
  imports: [
    BrowserModule,ReactiveFormsModule,
    AppRoutingModule,HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
