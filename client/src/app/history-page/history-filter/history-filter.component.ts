import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, Output, ViewChild} from '@angular/core'

import {Filter} from '../../shared/interfaces'
import {MaterialDatepicker, MaterialService} from "../../shared/classes/material.service";

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.css']
})
export class HistoryFilterComponent implements OnDestroy, AfterViewInit {

  @Output() onFilter = new EventEmitter<Filter>()

  @ViewChild('start') startRef?: ElementRef
  start?: MaterialDatepicker
  @ViewChild('end') endRef?: ElementRef
  end?: MaterialDatepicker

  order?: number
  isValid = true

  private validate = () => {
    if (!this.start?.date || !this.end?.date) {
      this.isValid = true
      return
    }
    this.isValid = this.start.date < this.end.date
  }

  submitFilter() {
    const {order, end, start} = this
    const filter = {order, start: start?.date, end: end?.date}
    this.onFilter.emit(filter)
  }

  ngAfterViewInit(): void {
    this.start = this.startRef && MaterialService.initDatepicker(this.startRef, this.validate)
    this.end = this.endRef && MaterialService.initDatepicker(this.endRef, this.validate)
  }

  ngOnDestroy(): void {
    this.start?.destroy?.()
    this.end?.destroy?.()
  }
}
