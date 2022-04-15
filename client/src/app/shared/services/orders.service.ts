import {HttpClient} from "@angular/common/http";
import {Order} from "../interfaces";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({providedIn: "root"})
export class OrdersService {

  constructor(private http: HttpClient) {
  }

  create(order: Order): Observable<Order> {
    return this.http.post<Order>('/api/order', order)
  }

  fetch(params: {offset?: number, limit?: number}):Observable<Order[]> {
    return this.http.get<Order[]>('/api/order', { params})
  }
}
