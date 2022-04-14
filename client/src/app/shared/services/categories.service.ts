import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Category, Message} from "../interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private http: HttpClient) {
  }

  fetch(): Observable<Category[]> {
    return this.http.get<Category[]>('/api/category')
  }

  getById(id: string): Observable<Category> {
    return this.http.get<Category>(`/api/category/${id}`)
  }

  create(name: string, image?: File): Observable<Category> {
    const formdata = new FormData()
    if (image) {
      formdata.append('image', image, image.name)
    }
    formdata.append('name', name)
    return this.http.post<Category>('/api/category', formdata)
  }

  update(id: string, name: string, image?: File): Observable<Category> {
    const formdata = new FormData()
    if (image) {
      formdata.append('image', image, image.name)
    }
    formdata.append('name', name)
    return this.http.patch<Category>(`/api/category/${id}`, formdata)
  }

  remove(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/category/${id}`)
  }
}
