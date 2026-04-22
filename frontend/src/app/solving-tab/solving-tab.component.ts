import { Component, inject } from '@angular/core';
import { exerciseServices } from '../exercise.service';
import { Subscription } from 'rxjs';
import { Exercise } from '../Models/Exercise.model';
import { UsersExercise } from '../Models/UserExercise.model';
import { UserExerciseService } from '../UserExercise.sevice';

@Component({
  selector: 'app-solving-tab',
  templateUrl: './solving-tab.component.html',
  styleUrl: './solving-tab.component.css'
})
export class SolvingTabComponent {
    exerciseService = inject(exerciseServices);
    exerciseSubcription: Subscription;
    exercise = new Exercise();

    userExerciseServices = inject(UserExerciseService);
    userExercise = new UsersExercise();
    userExerciseSubcription : Subscription;

    ngOnInit(){
      this.getSubriptionUserExercise();
    }

    getSubcriptionExercise() {
    this.exerciseSubcription = this.exerciseService.exercise$.subscribe(
      {
        next: (exerciseReceive) => {
          this.exercise = exerciseReceive;
        }
      }
    )
  }

  getSubriptionUserExercise(){
      this.userExerciseSubcription = this.userExerciseServices.userExercise$.subscribe(
        {
          next: (data) =>{
            this.userExercise = data
          },
          error: (error) => console.error(error)
        }
      )
    }
}
