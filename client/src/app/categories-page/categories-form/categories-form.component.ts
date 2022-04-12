import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoriesService} from "../../shared/services/categories.service";
import {of, switchMap} from "rxjs";
import {MaterialService} from "../../shared/classes/material.service";

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {
  isNew = true
  form: FormGroup

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
  ) {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    })
  }

  ngOnInit(): void {
    this.form.disable()
    this.route.params
      .pipe(
        switchMap((params) => {
          if (params['id']) {
            this.isNew = false
            return this.categoriesService.getById(params['id'])
          }
          return of(null)
        })
      )
      .subscribe(
        (category) =>{
          if(category){
            this.form.patchValue({
              name: category.name
            })
            MaterialService.updateTextInput()
          }
          this.form.enable()
        },
        (error) =>{},
      )
  }

  onSubmit() {

  }

}
