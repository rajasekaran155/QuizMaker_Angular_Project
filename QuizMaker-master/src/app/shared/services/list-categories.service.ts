import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { CategoryOptions } from '../interfaces/category-options';
import { Observable } from 'rxjs';
import { WrapperTemplate } from '../interfaces/wrapper-template';
import { QuestionSection } from '../interfaces/question-section';
@Injectable({
  providedIn: 'root'
})
export class ListCategoriesService {

  constructor(private http:HttpClient) { }
  quizData: QuestionSection[] = [];
  getListCategories():Observable<CategoryOptions>{
     return this.http.get<CategoryOptions>('https://opentdb.com/api_category.php');
  }

  getQuizQuestions(category:number|string,difficulty:string):Observable<WrapperTemplate>{
     return this.http.get<WrapperTemplate>('https://opentdb.com/api.php?amount=5&category='+category+'&difficulty='+difficulty+'&type=multiple');
  }
  getQuizData():QuestionSection[]{
    return this.quizData;
  }
  setQuizData(data:QuestionSection[]):void{
    this.quizData=data;
  }
}
