import {ElementRef} from "@angular/core";

declare var M: any

export interface ModalInstance {
  open?():void
  close?():void
  destroy?():void
}

export class MaterialService {
  static toast(message: string) {
    M.toast({html: message})
  }

  static initializeFloatingButton(ref: ElementRef) {
    M.FloatingActionButton.init(ref.nativeElement)
  }

  static updateTextInput() {
    M.updateTextFields()
  }

  static initModal(modalRef: ElementRef):ModalInstance {
    return M.Modal.init(modalRef.nativeElement)
  }
}
