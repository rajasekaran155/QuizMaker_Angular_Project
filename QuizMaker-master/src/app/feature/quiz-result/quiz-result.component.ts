import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionSection } from 'src/app/shared/interfaces/question-section';
import { ListCategoriesService } from 'src/app/shared/services/list-categories.service';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.css']
})
export class QuizResultComponent implements OnInit{
  dataSource: QuestionSection[] = [];
  score:number= 0;
  backgroundColor: string = 'red';
  constructor(private service:ListCategoriesService,private route:Router){}
  ngOnInit():void{
    this.dataSource=this.service.getQuizData();
    this.dataSource.map((data)=>{
      if(data.selectedAnswer===data.correctAnswer)
        this.score++;
    })
    if(this.score<=1)
      this.backgroundColor='red';
    else if(this.score>=2 && this.score<=3)
      this.backgroundColor='yellow';
    else
     this.backgroundColor='green';
  }
  createQuiz():void{
    this.route.navigateByUrl('');
  }
}
