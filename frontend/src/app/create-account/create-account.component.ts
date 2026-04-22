import { Component, inject } from '@angular/core';
import { User } from '../Models/user.model';
import { UserService } from '../user.service';
import { test } from '../Models/test.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {
  constructor(private router:Router){}

  user: User = new User();
  test: test = new test();
  confirmPassword: String = "";
  private userServices = inject(UserService);

  selectedTopics = {
    begginer: [] as string[],
    medium: [] as string[],
    advanced: [] as string[]
  };
  error = "";

  isHidden = true;
  isHiddenNext = false;
  isHiddenBack = true;

  isItemHidden = false;

  isSelectBegginer = false;
  isSelectMedium = false
  isSelectAdvanced = false;
  isError = false;

  idHiddenQuest = false;
  nextPage() {
    this.isHidden = false;
    this.isHiddenNext = true;
    this.isHiddenBack = false;
    this.isItemHidden = true;
    this.idHiddenQuest = true;
    console.log(this.user);
    console.log("Confirm password", this.confirmPassword)
  }

  backPage() {
    this.isHidden = true;
    this.isHiddenNext = false;
    this.isHiddenBack = true;
    this.isItemHidden = false;
    this.idHiddenQuest = false;
  }

  clickBegginer() {
    this.isSelectBegginer = true;
    this.isSelectMedium = false;
    this.isSelectAdvanced = false;
    this.isError = false;
    this.test.level = "Principiante"
  }

  clickMedium() {
    this.isSelectBegginer = false;
    this.isSelectMedium = true;
    this.isSelectAdvanced = false;
    this.isError = false;
    this.test.level = "Intermedio";
  }

  clickAdvanced() {
    this.isSelectBegginer = false;
    this.isSelectMedium = false;
    this.isSelectAdvanced = true;
    this.isError = false;
    this.test.level = "Avanzado";
  }

  createAccount() {
    if (this.isSelectBegginer || this.isSelectMedium || this.isSelectAdvanced) {
      if (this.saveTest()) {
        this.userServices.saveUser(this.user).subscribe({
          next: (data) => {console.log("La data es: ",data)
            this.router.navigate(['/login']);
          },
          error: (erro) => console.error("El error es: ",erro)
        })
      }
      else {
        this.isError = true;
        this.error = "Debes seleccionar al menos dos casillas"
      }
    }
    else {
      this.error = "Debe seleccionar un nivel";
      this.isError = true;
    }

  }

  saveTest() {
    this.user.test = this.test;
    if (this.isSelectBegginer && this.selectedTopics.begginer.length >= 2) {
      this.user.test.answers = this.selectedTopics.begginer.join("*");
      console.log("Paso por b")
    }
    else if (this.isSelectMedium && this.selectedTopics.medium.length >= 2) {
      this.user.test.answers = this.selectedTopics.medium.join("*");
      console.log("Paso por m")
    }
    else if (this.isSelectAdvanced && this.selectedTopics.advanced.length >= 2) {
      this.user.test.answers = this.selectedTopics.advanced.join("*");
      console.log("Paso por a")
    }
    else {
      return false;
    }
    console.log(this.user.test.answers);
    return true;
  }

  onCheckboxChange(event: any, topic: string, level: 'begginer' | 'medium' | 'advanced') {
    const checked = event.target.checked;
    const list = this.selectedTopics[level];

    if (checked) {
      if (!list.includes(topic)) list.push(topic);
    } else {
      this.selectedTopics[level] = list.filter(t => t !== topic);
    }

    localStorage.setItem('selectedTopics', JSON.stringify(this.selectedTopics));
  }

}