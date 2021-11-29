import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

export interface IAlertService {
    success(title: string, textMessage: string, textbutton: string) : any;
    error(title: string, textMessage: string, textbutton: string): any;
    warning(title: string, textMessage: string, textbutton: string): any;
    info(title: string, textMessage: string, textbutton: string) : any;
    question(title: string, textMessage: string, textbutton: string) : any;
}

@Injectable()
export class AlertService implements IAlertService {
    success(title: string, textMessage: string, textbutton: string) {
        return Swal.fire({
            icon: 'success',
            title: title,
            text: textMessage,
            confirmButtonText: textbutton
        })
    }

    error(title: string, textMessage: string, textbutton: string) {
        return Swal.fire({
            icon: 'error',
            title: title,
            text: textMessage,
            confirmButtonText: textbutton
        })
    }

    warning(title: string, textMessage: string, textbutton: string) {
        return Swal.fire({
            icon: 'warning',
            title: title,
            text: textMessage,
            confirmButtonText: textbutton
        })
    }

    info(title: string, textMessage: string, textbutton: string) {
        return  Swal.fire({
            icon: 'info',
            title: title,
            text: textMessage,
            confirmButtonText: textbutton
        })
    }

    question(title: string, textMessage: string, textbutton: string) {
        return Swal.fire({
            icon: 'question',
            title: title,
            text: textMessage,
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: textbutton
        })
    }
}