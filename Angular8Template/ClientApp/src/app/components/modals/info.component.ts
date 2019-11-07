import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'info-modal',
    templateUrl: './info.component.html'
})
export class InfoComponent implements OnInit {
    modalRef = null;
    message: string = null;
    @ViewChild('content', { static: true }) content: TemplateRef<any>;
    constructor(private modalService: NgbModal) { }
    open(m: string):any {
        this.message = m;
        this.modalRef = this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' });
        return this.modalRef;
    }

    onClose() {
        this.modalRef.close();
    }

    ngOnInit(): void {
    }
}
