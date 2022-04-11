import {Injectable} from "@angular/core"
import {User} from "../interfaces"
import {HttpClient} from "@angular/common/http"
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token?: string

  constructor(private http: HttpClient) {
  }

  register(user: User) {

  }

  login(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/api/auth/login', user)
      .pipe(tap(({token}) => {
        localStorage.setItem('token', token)
        this.setToken(token)
      }))
  }

  setToken(token?: string) {
    this.token = token
  }

  getToken(): string | undefined {
    return this.token
  }

  isAuthenticated(): boolean {
    return Boolean(this.token)
  }

  logout() {
    this.setToken(undefined)
    localStorage.clear()
  }
}
