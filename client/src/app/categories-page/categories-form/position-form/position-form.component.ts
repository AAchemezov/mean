import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core'

import {PositionsService} from "../../../shared/services/positions.service"
import {Position} from "../../../shared/interfaces"
import {MaterialService, ModalInstance} from "../../../shared/classes/material.service";

@Component({
  selector: 'app-position-form',
  templateUrl: './position-form.component.html',
  styleUrls: ['./position-form.component.css']
})
export class PositionFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input('categoryId') categoryId = ''
  @ViewChild('modal') modalRef?: ElementRef
  positions: Position[] = []
  loading = false
  modal?: ModalInstance;

  constructor(private positionService: PositionsService) {
  }

  ngOnDestroy(): void {
        this.modal?.destroy?.()
    }

  ngOnInit(): void {
    this.loading = true
    this.positionService.fetch(this.categoryId)
      .subscribe(
        (positions) => {
          this.positions = positions
          this.loading = false
        },
        (error)=>MaterialService.toast(error.error.message)
      )
  }

  ngAfterViewInit(): void {
    if (!this.modalRef){
      return
    }
    this.modal = MaterialService.initModal(this.modalRef)
  }

  onSelectPosition(position: Position) {
    this.modal?.open?.()
  }

  onAddPosition() {
    this.modal?.open?.()
  }

  onCancel() {
    this.modal?.close?.()
  }
}
