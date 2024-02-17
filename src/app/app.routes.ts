import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        loadChildren: () => import('@fitness-crud/exercises').then(m => m.ExcercisesFeatRoutes)
    }
];
