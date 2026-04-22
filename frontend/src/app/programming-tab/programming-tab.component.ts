import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { exerciseServices } from '../exercise.service';
import { Exercise } from '../Models/Exercise.model';
import { Subscription } from 'rxjs';
import { CSharpExecutionService } from '../CSharpExecution.service';
import { ollamaServices } from '../ollama.services';
import { UsersExercise } from '../Models/UserExercise.model';
import { UserService } from '../user.service';
import { User } from '../Models/user.model';
import { UserExerciseService } from '../UserExercise.sevice';

interface TestCase {
  input: any;
  output: any;
}

interface FunctionData {
  function: string;
  argument?: string;
  testCases: TestCase[];
}

@Component({
  selector: 'app-programming-tab',
  templateUrl: './programming-tab.component.html',
  styleUrl: './programming-tab.component.css'
})
export class ProgrammingTabComponent implements OnInit {
  private ollamaService = inject(ollamaServices);

  result: string = "";
  results: string[] = [];
  loading: boolean = false;
  inputsOutputs: FunctionData | null = null;
  expectOut: any = [];
  IsDisabled: boolean = false;//cambair a true

  tabExercise: boolean = true;
  tabResult: boolean = false;

  userServices = inject(UserService);
  private subscriptionUserServices: Subscription;
  user: User = new User();

  userExercise: UsersExercise = new UsersExercise();
  userExerciseServices = inject(UserExerciseService);

  public code: string = `using System;
class Program {
      //Escribe aqui la funcion principal con los posibles argumentos para realizar la prueba
        
    
}`;

  changeTabToResult() {
    this.tabExercise = false;
    this.tabResult = true;
  }

  changeTabToExercise() {
    this.tabResult = false;
    this.tabExercise = true;
  }

  public codeTest: string = `using System;
class Program {
    static void Main() {
            //Escribe aqui el nombre de tu función con sus posibles argumentos
    }
}`;

  constructor(private router: Router, private csharpService: CSharpExecutionService) {
  }


  exerciseService = inject(exerciseServices);
  exerciseSubcription: Subscription;
  exercise = new Exercise();

  ngOnInit(): void {
    this.getSubcriptionUser()
    this.getSubcription();
    this.getOutputsAndInputs();
    console.log("Ejercicio antes de guardar:", this.exercise);
    this.exerciseService.saveExercise(this.exercise).subscribe(
      {
        next: (data) => {
          console.log("Se guardo el ejercicio", data)
          this.exercise = data;
          this.setSubcriptionExercise();
        },
        error: (error) => {
          console.error("El error es",error);
          console.log("Item mandado con error", this.exercise)
        }
      }
    );
    //this.startTimer((time) => {console.log(time);});
  }
  setSubcriptionExercise() {
    //console.log("Ejercicio a pasar: " + this.exercise.description);
    this.exerciseService.setExercise(this.exercise);
  }

  setSubcriptionUserExercise(){
    this.userExerciseServices.setUserExercise(this.userExercise);
  }

    handleKeydown(event: KeyboardEvent) {
    const textarea = event.target as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    // TAB -> insertar 4 espacios
    if (event.key === 'Tab') {
      event.preventDefault();
      this.codeTest =
        this.codeTest.substring(0, start) +
        '    ' +
        this.codeTest.substring(end);
      // mover cursor
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }

    // ENTER -> mantener la indentación de la línea anterior
    if (event.key === 'Enter') {
      event.preventDefault();

      const valueBefore = this.codeTest.substring(0, start);
      const lastLine = valueBefore.split('\n').pop() || '';
      const indentMatch = lastLine.match(/^\s*/); // espacios al inicio de la línea
      const indent = indentMatch ? indentMatch[0] : '';

      this.codeTest =
        this.codeTest.substring(0, start) +
        '\n' +
        indent +
        this.codeTest.substring(end);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1 + indent.length;
      }, 0);
    }
  }

  saveUserExercise() {
    this.userExercise.solution = this.codeTest;
    this.userExercise.time;
    this.userExercise.user = this.user;
    this.userExercise.exercise = this.exercise;
    this.userExerciseServices.saveUserExercise(this.userExercise).subscribe(
      {
        next: (data) => {
          console.log("Se guarda", data);
          this.setSubcriptionUserExercise();
        },
        error: (error) => {
          console.log("Lo que se manda", this.userExercise)
          console.error("El Error ", error)}
      }
    );
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

  getOutputsAndInputs() {
    this.ollamaService.getOutputs(this.exercise.description).subscribe({
      next: (data) => {
        let cleanText = data
          .replace(/```json/i, "")
          .replace(/```/g, "")
          .trim();

        const dataJSONParsed = JSON.parse(cleanText)
        console.log(dataJSONParsed);
        this.inputsOutputs = dataJSONParsed;
        console.log("InpOut: ", this.inputsOutputs);
        this.expectOut = this.inputsOutputs?.testCases.map(testCase => testCase.output);

        this.updateCodeWithTestCases();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  updateCodeWithTestCases() {
    // 🔥 Validación más robusta
    if (!this.inputsOutputs) {
      console.error('inputsOutputs es null o undefined');
      return;
    }

    if (!this.inputsOutputs.testCases) {
      console.error('inputsOutputs.testCases no existe:', this.inputsOutputs);
      return;
    }

    if (!Array.isArray(this.inputsOutputs.testCases)) {
      console.error('inputsOutputs.testCases no es un array:', this.inputsOutputs.testCases);
      return;
    }

    if (this.inputsOutputs.testCases.length === 0) {
      console.warn('El array testCases está vacío');
      return;
    }

    // 🔥 Ahora sí podemos usar forEach con seguridad
    const functionName = this.inputsOutputs.function || 'MiFuncion';
    const argumentName = this.inputsOutputs.argument || 'input';

    let testCasesComment = `        /*\n         * Función: ${functionName}(${argumentName})\n         * Casos de prueba:\n`;

    this.inputsOutputs.testCases.forEach((prueba, index) => {
      // 🔥 Validar cada prueba individualmente
      if (!prueba) return;

      const inputStr = this.displayValue(prueba.input);
      const outputStr = this.displayValue(prueba.output);
      testCasesComment += `         * ${index + 1}. ${functionName}(${inputStr}) = ${outputStr}\n`;
    });

    testCasesComment += '         */\n\n';

    this.codeTest = `using System;
class Program {
    static void Main() {
${testCasesComment}        // Ejemplo: ${this.inputsOutputs.function}("tu_parametro_aqui");
    }
}`;

    console.log('✅ Código actualizado correctamente');

  }

  displayValue(value: any): string {
    if (value === null || value === undefined) return 'null';
    if (Array.isArray(value)) return `[${value.map(item => this.displayValue(item)).join(', ')}]`;
    if (typeof value === 'object') return JSON.stringify(value);
    if (typeof value === 'string') return `"${value}"`;
    return String(value);
  }


  goToSolvingTab() {
    this.saveUserExercise();

    this.router.navigate(['solving-tab']);
  }

  getSubcription() {
    this.exerciseSubcription = this.exerciseService.exercise$.subscribe(
      {
        next: (exerciseReceive) => {
          this.exercise = exerciseReceive;
        }
      }
    )
  }


  executeCode() {
    this.loading = true;
    this.result = '';
    this.tabExercise = false;

    this.csharpService.executeCode(this.codeTest).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success) {
          this.result = response.output;
          console.log(response)
          console.log("El programa paso por next")
          this.results = response.output.split("\n");
          console.log("Resultados separados", this.results);
          //console.log("Casos: "+ this.compareOutputs(this.results,this.inputsOutputs?.testCases));
          console.log('🔍 User Results:', this.results);
          console.log('🔍 Expected Outputs:', this.expectOut);

          // Ahora pasar arrays de strings simples a compareOutputs
          const allPassed = this.compareOutputs(this.results, this.expectOut);
          console.log("¿Todos los tests pasaron?:", allPassed);
          //this.IsDisabled = !allPassed
        } else {
          this.result = `Error: ${response.error}`;
        }
        //console.log("El resultado es: "+this.result)
      },
      error: (error) => {
        this.loading = false;
        this.result = `Error del servidor: ${error.message}`;

      }
    });
  }

  compareOutputs(userOutput: any, expectedOutput: any): boolean {
    // Ahora solo recibe arrays de strings o valores simples

    if (Array.isArray(userOutput) && Array.isArray(expectedOutput)) {
      if (userOutput.length !== expectedOutput.length) return false;

      return userOutput.every((item, index) => {
        const userClean = typeof item === 'string' ? item.trim() : item;
        const expectedClean = typeof expectedOutput[index] === 'string' ? expectedOutput[index].trim() : expectedOutput[index];

        console.log(`🔍 Comparando [${index}]:`);
        console.log('  User:', userClean);
        console.log('  Expected:', expectedClean);

        return userClean == expectedClean;
      });
    }

    // Para valores individuales
    const userClean = typeof userOutput === 'string' ? userOutput.trim() : userOutput;
    const expectedClean = typeof expectedOutput === 'string' ? expectedOutput.trim() : expectedOutput;

    return userClean === expectedClean;
  }

  timerInterval: any;
  elapsedSeconds = 0;

  startTimer(updateCallback?: (formattedTime: string) => void) {
    if (this.timerInterval) return; // evitar múltiples timers

    this.timerInterval = setInterval(() => {
      this.elapsedSeconds++;
      if (updateCallback) {
        updateCallback(this.formatTime(this.elapsedSeconds));
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timerInterval);
    this.timerInterval = null;
  }

  resetTimer() {
    this.stopTimer();
    this.elapsedSeconds = 0;
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  getExplain(){
    this.changePseudo = true;
    this.changeCodeTab = false;
    this.ollamaService.getExplain(this.codeTest).subscribe(
      {
      next: (data) => {
        let cleanText = data
          .replace(/```/i, "")
          .replace(/```/g, "")
          .trim();
          console.log("Data: "+cleanText)
        this.pseudocodigoString = cleanText.toString();
        }

      }
    )
  }

  changeCode(){
    this.changeCodeTab = true;
    this.changePseudo = false;
  }

  changeCodeTab = true;
  changePseudo = false;
  pseudocodigoString: string = "";
}

/*compareOutputs(userOutput: any, expectedOutput: any): boolean {
  // Caso 1: Ambos son null/undefined
  if (userOutput == null && expectedOutput == null) return true;
  if (userOutput == null || expectedOutput == null) return false;
 
  // Caso 2: Ambos son arrays
  if (Array.isArray(userOutput) && Array.isArray(expectedOutput)) {
    if (userOutput.length !== expectedOutput.length) return false;
    
    return userOutput.every((item, index) => {
      console.log("Output User: ",item);
      console.log("Output expect: ",expectedOutput[index].output)
      this.compareOutputs(item, expectedOutput[index].output)
    }
    );
  }
 
  // Caso 3: Ambos son objetos
  if (typeof userOutput === 'object' && typeof expectedOutput === 'object') {
    const userKeys = Object.keys(userOutput);
    const expectedKeys = Object.keys(expectedOutput);
    
    if (userKeys.length !== expectedKeys.length) return false;
    
    return userKeys.every(key => 
      expectedKeys.includes(key) && 
      this.compareOutputs(userOutput[key], expectedOutput[key])
    );
  }
 
  // Caso 4: Valores simples - usar == para conversión de tipos (1 == "1")
  return userOutput == expectedOutput;
}*/

  /*private compareValues(userValue: any, expectedValue: any): boolean {
    // Caso 1: null/undefined
    if (userValue == null && expectedValue == null) return true;
    if (userValue == null || expectedValue == null) return false;
  
    // Caso 2: Ambos son arrays
    if (Array.isArray(userValue) && Array.isArray(expectedValue)) {
      console.log('🔄 Comparando arrays...');
      if (userValue.length !== expectedValue.length) {
        console.log('❌ Arrays de diferente longitud');
        return false;
      }
      
      return userValue.every((item, index) => {
        console.log(`  🔍 Elemento ${index}:`);
        console.log('    User:', item);
        console.log('    Expected:', expectedValue[index]);
        return this.compareValues(item, expectedValue[index]);
      });
    }
  
    // Caso 3: Uno es array y el otro no
    if (Array.isArray(userValue) !== Array.isArray(expectedValue)) {
      console.log('❌ Uno es array y el otro no');
      return false;
    }
  
    // Caso 4: Ambos son objetos (pero no arrays)
    if (typeof userValue === 'object' && typeof expectedValue === 'object' && 
        userValue !== null && expectedValue !== null) {
      console.log('🔄 Comparando objetos...');
      const userKeys = Object.keys(userValue);
      const expectedKeys = Object.keys(expectedValue);
      
      if (userKeys.length !== expectedKeys.length) {
        console.log('❌ Objetos con diferente cantidad de propiedades');
        return false;
      }
      
      return userKeys.every(key => {
        console.log(`  🔍 Propiedad "${key}":`);
        console.log('    User:', userValue[key]);
        console.log('    Expected:', expectedValue[key]);
        return expectedKeys.includes(key) && 
               this.compareValues(userValue[key], expectedValue[key]);
      });
    }
  
    // Caso 5: Valores simples
    console.log('🔍 COMPARACIÓN FINAL:');
    console.log('userValue:', userValue, 'Tipo:', typeof userValue);
    console.log('expectedValue:', expectedValue, 'Tipo:', typeof expectedValue);
    
    // Para strings, hacer trim antes de comparar
    if (typeof userValue === 'string' && typeof expectedValue === 'string') {
      return userValue.trim() === expectedValue.trim();
    }
    
    return userValue == expectedValue;
  }*/
