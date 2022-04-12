import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Category, Message, Position} from "../interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PositionsService {
  constructor(private http: HttpClient) {
  }

  fetch(categoryId: string): Observable<Position[]> {
    return this.http.get<Position[]>(`/api/position/${categoryId}`)
  }

  getById(id: string): Observable<Category> {
    return this.http.get<Category>(`/api/category/${id}`)
  }

  create(name: string, image?: File) {
    const formdata = new FormData()
    if (image) {
      formdata.append('image', image, image.name)
    }
    formdata.append('name', name)
    return this.http.post<Category>('/api/category', formdata)
  }

  update(id: string, name: string, image?: File) {
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
