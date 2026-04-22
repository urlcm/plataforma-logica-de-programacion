import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { UsersExercise } from "./Models/UserExercise.model";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserExerciseService {
  private urlBase = "http://localhost:8081/plataforma-programuat"

  private clientHttp = inject(HttpClient);
  private userExerciseParam = new BehaviorSubject<UsersExercise>(new UsersExercise());
  userExercise$ = this.userExerciseParam.asObservable();

  setUserExercise(userExcerciseValue: UsersExercise) {
    this.userExerciseParam.next(userExcerciseValue);
  }

  getUserExercise() {
    return this.userExerciseParam.getValue();
  }

  saveUserExercise(userExercise: UsersExercise): Observable<UsersExercise> {
    return this.clientHttp.post<UsersExercise>(this.urlBase + "/save-user-exercise", userExercise);
  }
}