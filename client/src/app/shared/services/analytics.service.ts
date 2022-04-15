import {HttpClient} from "@angular/common/http";
import {Order, OverviewPage} from "../interfaces";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AnalyticsService {

  constructor(private http: HttpClient) {
  }

  getOverview(): Observable<OverviewPage> {
    return this.http.get<OverviewPage>('/api/analytics/overview')
  }

  getAnalytics(params: {offset?: number, limit?: number}):Observable<Order[]> {
    return this.http.get<Order[]>('/api/order', { params})
  }
}
