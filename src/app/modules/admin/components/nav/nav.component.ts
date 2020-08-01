import { Component, OnInit, NgZone } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
    isHandset$: Observable<boolean> = this.breakpointObserver
        .observe(Breakpoints.Handset)
        .pipe(
            map((result) => result.matches),
            shareReplay()
        );
    isHandset = false;

    public loggedAs: string;

    constructor(
        private breakpointObserver: BreakpointObserver,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit() {
        this.authService.getLoggedUser().subscribe((user) => {
            if (user) {
                this.loggedAs = user.email;
            }
        });

        this.isHandset$.subscribe((value) => {
            this.isHandset = value;
            console.log(this.isHandset);
        });
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
