import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  recipeForm!: FormGroup;
  years: number[];

  constructor(private fb: FormBuilder) {
    this.years = this.getYears();
    this.recipeForm = this.fb.group({
      personalInfo: this.fb.group({
        firstname: ['', Validators.required],
        Lastname: ['', Validators.required],
        Nickname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        year: ['', Validators.required],
        Passport: ['', Validators.required]
      }),

      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipCode: ['', [Validators.required, Validators.pattern('[0-9]{5}')]],
      }),
      reciepe: this.fb.array([
        this.createItem()
      ]),
      skills: this.fb.record<boolean>({})
    });
  }

  private getYears(): number[] {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - 40)).fill('').map((_, idx) => now - idx)
  }
  // private buildSkillControls(skills:string){
  //   skills.forEach((skill: any) =>
  //      this.recipeForm.addControl(
  //     skill,new FormControl(false,{nonNullable:true})
  //   ))
  // }
  createItem(): FormGroup {
    return this.fb.group({
      PhoneSelect: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });
  }
  get itemControls() {
    return this.recipeForm.get('reciepe') as FormArray;
  }

  addItem(): void {
    this.itemControls.push(this.createItem());
  }

  submitForm() {
    console.log(this.recipeForm.value);
  }

  removeItem(index: number): void {
    this.itemControls.removeAt(index);
  }
}
