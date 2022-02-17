import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { HttpUtilService } from 'src/app/shared/services/http-util.service';


@Injectable({
    providedIn: 'root',
})
export class ErrorHandlerService extends ErrorHandler {
    constructor(
        private zone: NgZone,
        private injector: Injector,
        private alertService: AlertService
    ) {
        super();
    }

    override handleError(errorResponse: HttpErrorResponse | any): void {

        if (errorResponse instanceof HttpErrorResponse) {
            const router = this.injector.get(Router);

            this.zone.run(() => {
                switch (errorResponse.status) {
                    case 401:
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        this.alertService.error('', errorResponse.error, 'OK');
                        router.navigate(['/login']);
                        break;
                    default:
                        this.alertService.error('', errorResponse.error, 'OK');
                        break;
                }
            });
        }
        super.handleError(errorResponse);
    }
}
