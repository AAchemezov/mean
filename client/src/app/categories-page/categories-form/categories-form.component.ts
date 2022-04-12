import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoriesService} from "../../shared/services/categories.service";
import {of, switchMap} from "rxjs";
import {MaterialService} from "../../shared/classes/material.service";
import {Category} from "../../shared/interfaces";

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {

  @ViewChild('input') inputRef?: ElementRef

  isNew = true
  form: FormGroup
  category?: Category
  image?: File
  imagePreview?: string;

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
        (category) => {
          if (category) {
            this.category = category
            this.form.patchValue({
              name: category.name
            })
            this.imagePreview = category.imageSrc
            MaterialService.updateTextInput()
          }
          this.form.enable()
        },
        (error) => {
        },
      )
  }

  onSubmit() {
    let obs$
    this.form.disable()
    if (this.isNew) {
      obs$ = this.categoriesService.create(this.form.value.name, this.image)
    } else {
      obs$ = this.categoriesService.update(this.category?._id || '', this.form.value.name, this.image)
    }
    obs$.subscribe(
      (category) => {
        this.form.enable()
        MaterialService.toast("Изменения сохранены")
      },
      (e) => {
        this.form.enable()
        MaterialService.toast(e.error.message)
      }
    )
  }

  triggerClick() {
    this.inputRef?.nativeElement.click()
  }

  onFileUpload(event: Event | any) {
    const file = event.target.files[0]
    if (!file) {
      return
    }
    this.image = file
    const reader = new FileReader()
    reader.onload = () => {
      this.imagePreview = reader.result as string
    }
    reader.readAsDataURL(file)
  }
}
