import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

// import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

// const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);

// Path: Route URI
// Component: The component to bind to the route path
const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./layout/layout.module').then((m) => m.LayoutModule),
    },
    {
        path: 'admin',
        loadChildren: () =>
            import('./modules/admin/admin.module').then((m) => m.AdminModule),
    },
    {
        path: '**',
        loadChildren: () =>
            import('./modules/page-not-found/page-not-found.module').then(
                (m) => m.PageNotFoundModule
            ),
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            preloadingStrategy: PreloadAllModules,
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
