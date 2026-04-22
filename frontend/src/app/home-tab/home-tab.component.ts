import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Models/user.model';
import { ollamaServices } from '../ollama.services';
import { Exercise } from '../Models/Exercise.model';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { exerciseServices } from '../exercise.service';
import { Chart, registerables } from 'chart.js';
import { Difficulty } from '../Models/Difficulty.model,';

@Component({
  selector: 'app-home-tab',
  templateUrl: './home-tab.component.html',
  styleUrl: './home-tab.component.css'
})
export class HomeTabComponent implements OnInit {
  constructor(private router: Router) { }

  private ollamaService = inject(ollamaServices);
  public exercise: Exercise = new Exercise();
  public exercises: Exercise[] = [];

  userServices = inject(UserService);
  private subscriptionUserServices: Subscription;

  exerciseService = inject(exerciseServices);

  user: User = new User();

  countExercise = 0;
  countExerciseClick = 0;
  countExerciseDone = 0;

  ngOnInit() {
    //this.getProgramminProblemFromDatabase();
    this.getSubcriptionUser();
    this.ollamaService.changePromt(this.user.test.level, this.user.test.answers);
    this.setLevel();
    this.getProgrammingProblem();
    Chart.register(...registerables); // ✅ Register all chart components
  }

  getSubcriptionUser() {
    this.subscriptionUserServices = this.userServices.user$.subscribe(
      {
        next: (dataRecieve) => {
          this.user = dataRecieve;
          console.log(this.user)
        }
      }
    )
  }

  goToProgrammingTab() {
    this.setSubcriptionExercise();
    this.countExerciseClick++;
    this.router.navigate(['programming-tab']);
    
  }

  setLevel() {
    this.exercise.difficulty = new Difficulty();
    if (this.user.test.level == "Principiante") {
      this.exercise.difficulty.idDifficulty = 1;
    }
    if (this.user.test.level == "Intermedio") {
      this.exercise.difficulty.idDifficulty = 2;
    }
    else {
      this.exercise.difficulty.idDifficulty = 2;
    }
  }

  setSubcriptionExercise() {
    //console.log("Ejercicio a pasar: " + this.exercise.description);
    this.exerciseService.setExercise(this.exercise);
  }

  getProgrammingProblem() {
    this.ollamaService.getExercise().subscribe(
      {
        next: (dataExercise) => {
          console.log("Problema: " + dataExercise);
          this.exercise.description = dataExercise;
        },
        error: (error) => console.log(error)
      }
    )
    this.countExercise++;
  }

  getProgramminProblemFromDatabase() {
    this.exerciseService.getListExercises().subscribe({
      next: (Exercises) => {
        this.exercises = Exercises;
        console.log(this.exercises);
      }
    })
  }

  @ViewChild('my_chart') private barCanvas!: ElementRef;
  barChart: any;

  ngAfterViewInit(): void {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'doughnut', // Try 'line', 'pie', 'doughnut', etc.
      data: {
        labels: ['Ejercicios pasados',
          'Ejercicios completados',
          'Ejercicios vistos'],

        datasets: [{
          label: 'Cantidad de ejercicios',
          data: [this.countExerciseClick, 50, this.countExercise],
          backgroundColor: [
            '#013A63',
            '#2a9fd6',
            '#C6C6C6'
          ],
          hoverOffset: 4
        }]
        /*datasets:
        
         [
          {
            label: 'Ejercicios pasados',
            data: [1],
            backgroundColor: '#013A63',
          },
          
                   {
            label: 'Sales 2025',
            data: [65, 59, 80, 81, 56],
            backgroundColor: '#013A63',
          },
          
          {
            label: 'Ejercicios completados',
            data: [65,],
            backgroundColor: '#2a9fd6',
          },
          {
            label: 'Ejercicios vistos',
            data: [81],
            backgroundColor: '#C6C6C6',
          },
        ]*/
      },
      options: {
        responsive: true,
        maintainAspectRatio: true, // ✅ Keeps proportions when resizing
        aspectRatio: 2,            // Optional:
        plugins: {
          legend: { position: 'bottom' },
          title: {
            display: true,
            text: 'Cantidad de ejercicios'
          }
        }
      }
    });
  }
}
