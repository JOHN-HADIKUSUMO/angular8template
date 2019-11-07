import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'confirm-modal',
    templateUrl: './confirm.component.html'
})
export class ConfirmComponent implements OnInit {
    modalRef = null;
    message: string = null;
    @ViewChild('content', { static: true }) content: TemplateRef<any>;
    constructor(private modalService: NgbModal) { }
    open(m: string):any {
        this.message = m;
        this.modalRef = this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' });
        return this.modalRef;
    }
    onOk() {
        this.modalRef.close(true);
    }

    onCancel() {
        this.modalRef.close(false);
    }

    ngOnInit(): void {

    }
}
