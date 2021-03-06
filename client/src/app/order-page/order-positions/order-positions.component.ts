import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {PositionsService} from "../../shared/services/positions.service";
import {Position} from "../../shared/interfaces";
import {map, switchMap} from "rxjs/operators";
import {OrderService} from "../order.service";
import {MaterialService} from "../../shared/classes/material.service";

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.css']
})
export class OrderPositionsComponent implements OnInit {

  positions$?: Observable<Position[]>

  constructor(
    private route: ActivatedRoute,
    private positionService: PositionsService,
    private order: OrderService,
  ) {
  }

  ngOnInit(): void {
    this.positions$ = this.route.params
      .pipe(
        switchMap((params) => this.positionService.fetch(params['id'])),
        map((positions) => positions.map((position) => ({...position, quantity: 1})))
      )
  }

  addToOrder(position: Position) {
    MaterialService.toast(`Добавлено x${position.quantity}`)
    this.order.add(position)
  }
}
