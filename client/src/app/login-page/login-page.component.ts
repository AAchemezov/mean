import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MaterialService} from "../shared/classes/material.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  })

  aSub: Subscription | undefined

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        MaterialService.toast("Теперь можно зайти в систему используя свои данные")
      } else if (params['accessDenied']) {
        MaterialService.toast("Для начала авторизуйтесь")
      } else if (params['sessionFailed']) {
        MaterialService.toast("Войдите в систему")
      }
    })
  }

  ngOnDestroy() {
    this.aSub?.unsubscribe()
  }

  onSubmit() {
    this.form.disable()
    this.aSub = this.auth.login(this.form.value).subscribe(
      () => {
        console.log('Login success')
        return this.router.navigate(['/overview'])
      },
      e => {
        MaterialService.toast(e.error.message)
        this.form.enable()
      }
    )
  }

}
