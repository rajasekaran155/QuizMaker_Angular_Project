import { Component, OnInit } from '@angular/core';
import { CategoryOptions } from 'src/app/shared/interfaces/category-options';
import { ListCategoriesService } from 'src/app/shared/services/list-categories.service';
import { DropDown } from 'src/app/shared/interfaces/drop-down';
import { QuestionSection } from 'src/app/shared/interfaces/question-section';
import { WrapperTemplate } from 'src/app/shared/interfaces/wrapper-template';
import { Router } from '@angular/router';
import { SelectedOptions } from 'src/app/shared/interfaces/selected-options';
import { Category } from 'src/app/shared/interfaces/category';

@Component({
  selector: 'app-quiz-maker',
  templateUrl: './quiz-maker.component.html',
  styleUrls: ['./quiz-maker.component.css']
})
export class QuizMakerComponent implements OnInit {
  difficultyOptions: DropDown[] = [{
    value: 'Easy'
  },
  {
    value: 'Medium'
  },
  {
    value: 'Hard'
  }]
  categoryOptions: DropDown[] = [];
  selectedCategoryOption: number|string = 'undefined';
  selectedDifficultyOption: string = 'undefined';
  isQuestionSection: boolean = false;
  dataSource: QuestionSection[] = [];
  selectedOptions: SelectedOptions[]=[];
  isEnabled: boolean = false;
  constructor(private service: ListCategoriesService,private route:Router) { }
  ngOnInit(): void {
    this.service.getListCategories().subscribe((data: CategoryOptions) => {
      let array:Category[] = data.trivia_categories;
      for (let i = 0; i < array.length; i++) {
        this.categoryOptions.push({id:array[i].id,value:array[i].name});
      }
    })
  }
  categoryOption(value: number|string) :void {
    this.selectedCategoryOption = value;
  }
  difficultyOption(value: string) :void{
    this.selectedDifficultyOption = value.toLowerCase();
  }
  onClickCreate():void{
    this.isQuestionSection=false;
     this.service.getQuizQuestions(this.selectedCategoryOption,this.selectedDifficultyOption).subscribe((data:WrapperTemplate)=> this.createQuestionSection(data));
  }
  decodeString(str:string) :string{
    let text:HTMLTextAreaElement = document.createElement("textarea");
    text.innerHTML = str;
    return text.value;
  }    
  createQuestionSection(data:WrapperTemplate):void{
    this.dataSource=[];
    this.isEnabled=false;
    this.selectedOptions=[];
    data.results.map((row)=>{
      let options:string[] = row.incorrect_answers.map((option)=> this.decodeString(option));
      options.push(this.decodeString(row.correct_answer));
      this.dataSource.push({
        question: this.decodeString(row.question),
        options: this.generateRandomOptions(options),
        correctAnswer: this.decodeString(row.correct_answer),
      })
    })
    this.isQuestionSection=true;
  }
  generateRandomOptions(questions:string[]):string[]{
    let prevArray: string[]= questions;
    let shuffleArray: number[] =[];
    let randomArray:string[] = [];
    let i=0;
    while(i<questions.length){
      let randomIndex = Math.floor(Math.random() * questions.length);
      if(!shuffleArray.includes(randomIndex)){
          randomArray.push(prevArray[randomIndex]);
          shuffleArray.push(randomIndex);
          i++;
      }
    }
    return randomArray;
  }
  saveAnswer(answer:string,row:number,col:number):void{
    let idValue:string='';
    let flag:number=0;
    this.selectedOptions.forEach((data)=>{
      if(data.row==row){
         flag=1;
         idValue='row'+data.row+'col'+data.col;
         data.row=row;
         data.col=col;
         (<HTMLButtonElement>document.getElementById(idValue)).style.backgroundColor = 'white';
      }
    });
    if(flag==0)
    this.selectedOptions.push({row:row,col:col});
     if(this.selectedOptions.length==5)
       this.isEnabled=true; 
    this.dataSource[row].selectedAnswer=answer;
    idValue='row'+row+'col'+col;
    (<HTMLButtonElement>document.getElementById(idValue)).style.backgroundColor = 'green';
  }
  onSubmit():void{
    this.service.setQuizData(this.dataSource);
     this.route.navigate(['result']);
  }
}
