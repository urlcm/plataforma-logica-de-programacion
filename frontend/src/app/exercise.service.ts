import { inject, Injectable } from "@angular/core";
import { Exercise } from "./Models/Exercise.model";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { UsersExercise } from "./Models/UserExercise.model";

@Injectable({
    providedIn: 'root'
})
export class exerciseServices {
    private urlBase = "http://localhost:8081/plataforma-programuat"

    private clientHttp = inject(HttpClient)

    private exerciseParam = new BehaviorSubject<Exercise>(new Exercise());
    exercise$ = this.exerciseParam.asObservable();

    setExercise(exerciseValue: Exercise) {
        this.exerciseParam.next(exerciseValue);
    }

    getExercise() {
        return this.exerciseParam.getValue();
    }

    getListExercises():Observable<Exercise[]>{
        return this.clientHttp.get<Exercise[]>(this.urlBase+"/get-exercises");
    }

    saveExercise(exerciseParam:Exercise):Observable<Exercise>{
        return this.clientHttp.post<Exercise>(this.urlBase+"/save-exercise",exerciseParam, { headers: { "Content-Type": "application/json" }});
    }



}