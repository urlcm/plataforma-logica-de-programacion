import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ollamaServices {
  constructor() { }

  private urlBase = "http://localhost:8081/plataforma-programuat/api/v1/generate";

  private explain = "Explicame traducé el siguiente codigo de c# en pseudocodigo, solo dame el pseudocodigo, omite los comentarios: "

  private prompt =
    "Genera un ejercicio de programación para un nivel principiante. El objetivo es practicar: ej. bucles, condicionales, operaciones básicas con listas o cadenas. Instrucciones: Proporciona SOLO el enunciado del problema. No incluyas solución, código, pistas ni output de ejemplo. El problema debe ser sencillo, con una entrada y salida claramente definidas. El escenario debe ser fácil de entender y debe ser todo a nivel consola. Haz que la salida solo sea una"

  private clientHttp = inject(HttpClient)

  getExercise(): Observable<String> {
    const params = new HttpParams()
      .set('promptMessage', this.prompt);
    return this.clientHttp.get(this.urlBase, { params, responseType: 'text' });
  }

  changePromt(level: String, topics: String) {
    this.prompt = `Genera un ejercicio de programación para un nivel ${level}. El objetivo es practicar: ${topics}. Instrucciones: Proporciona SOLO el enunciado del problema. No incluyas solución, código, pistas ni output de ejemplo. El problema debe ser sencillo, con una entrada y una salida claramente definidas. El escenario debe ser fácil de entender y debe ser todo a nivel consola.`;
  }

  getOutputs(exercise: String): Observable<String> {
    const promptOutputs =
      `Del siguiente ejercicio:\n${exercise}\n` +
      `Dame únicamente los inputs y sus 3 respectivos outputs para probar que funciona correctamente el código y cumple su cometido, tambien debes agregar la funcion con su nombre y su argumento para probar los inputs y validar los outputs la sintaxis debe ser c#,ademas de que me lo debes de entregar en formato JSON y con estos nombres   function, argument y testCases`;

    const params = new HttpParams().set('promptMessage', encodeURIComponent(promptOutputs));

    // responseType: 'text' porque Ollama no siempre responde JSON estricto
    return this.clientHttp.get(this.urlBase, { params, responseType: 'text' });
  }

   getExplain(code: string): Observable<String> {
const params = new HttpParams()
  .set('promptMessage', encodeURIComponent(this.explain + code));
    return this.clientHttp.get(this.urlBase, { params, responseType: 'text' });
  }
}
