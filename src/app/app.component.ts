import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/core/services/auth/auth.service';

import Swal from 'sweetalert2';
import { takeLast, take } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    private demoEmail = 'demo@demo.com';
    private demoPwd = 'demodemo';

    constructor(
        private cookieService: CookieService,
        private authService: AuthService
    ) {
        const autoLogged = this.cookieService.get('autoLogged');

        if (!autoLogged) {
            this.autoLogin();
        }
    }

    autoLogin() {
        this.authService
            .getLoggedUser()
            .pipe(take(1))
            .subscribe(async (user) => {
                if (!user) {
                    try {
                        const credentials = await this.authService.login(
                            this.demoEmail,
                            this.demoPwd
                        );

                        Swal.fire({
                            icon: 'info',
                            title: 'Logged with demo account',
                            text: credentials.user.email,
                        });

                        const expires = new Date();
                        expires.setDate(expires.getDate() + 1);
                        this.cookieService.set(
                            'autoLogged',
                            '1',
                            expires,
                            null,
                            null,
                            true,
                            'Strict'
                        );
                    } catch (e) {
                        if (e.code === 'auth/user-not-found') {
                            await this.authService.createUser(
                                this.demoEmail,
                                this.demoPwd
                            );

                            this.autoLogin();
                        }
                    }
                }
            });
    }
}
