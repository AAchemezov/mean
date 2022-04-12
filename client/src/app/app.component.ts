import {Component, OnInit} from '@angular/core';
import {AuthService} from "./shared/services/auth.service";

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
    const storageToken = localStorage.getItem('token')
    storageToken && this.auth.setToken(storageToken)
  }

}
