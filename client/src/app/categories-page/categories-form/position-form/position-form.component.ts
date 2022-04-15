import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core'

import {PositionsService} from "../../../shared/services/positions.service"
import {Position} from "../../../shared/interfaces"
import {MaterialService, MaterialInstance} from "../../../shared/classes/material.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

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
  modal?: MaterialInstance
  form: FormGroup
  private positionId?: string

  constructor(private positionService: PositionsService) {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(1, [Validators.required, Validators.min(1)])
    })
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
        (error) => MaterialService.toast(error.error.message)
      )
  }

  ngAfterViewInit(): void {
    if (!this.modalRef) {
      return
    }
    this.modal = MaterialService.initModal(this.modalRef)
  }

  onSelectPosition({_id, name, cost}: Position) {
    this.positionId = _id
    this.form.reset({name, cost})
    this.modal?.open?.()
    MaterialService.updateTextInput()
  }

  onAddPosition() {
    this.positionId = undefined
    this.form.reset({cost: 1})
    this.modal?.open?.()
    MaterialService.updateTextInput()
    this.modal?.open?.()
  }

  onDeletePosition(event: Event, position: Position) {
    event.stopPropagation()
    const decision = window.confirm(`Удалить позицию ${position.name}`)
    if (!decision) {
      return
    }
    this.positionService.remove(position)
      .subscribe(
        (response) => {
          const index = this.positions.findIndex(({_id}) => _id === position._id)
          this.positions.splice(index, 1)
          MaterialService.toast(response.message)
        },
        (error) => MaterialService.toast(error.error.message),
      )
  }

  onCancel() {
    this.modal?.close?.()
  }

  onSubmit() {
    this.form.disable()
    const newPosition: Position = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId,
    }

    const completed = () => {
      this.modal?.close?.()
      this.form.enable()
    }

    if (this.positionId) {
      newPosition._id = this.positionId
      this.positionService.update(newPosition).subscribe(
        (position) => {
          const index = this.positions.findIndex(({_id}) => _id === position._id)
          this.positions[index] = position
          MaterialService.toast('Изменения сохранены')
        },
        (error) => MaterialService.toast(error.error.message),
        completed
      )
    } else {
      this.positionService.create(newPosition).subscribe(
        (position) => {
          MaterialService.toast('Позиция создана')
          this.positions.push(position)
        },
        (error) => MaterialService.toast(error.error.message),
        completed
      )
    }
  }
}
