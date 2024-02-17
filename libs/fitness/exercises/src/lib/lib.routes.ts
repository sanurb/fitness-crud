import { Route } from '@angular/router';
import { ExercisesComponent } from './components/smart/exercises/exercises.component';
import { ExercisesAddComponent } from './components/smart/exercises-add/exercises-add.component';
import { ExercisesDetailComponent } from './components/smart/exercises-detail/exercises-detail.component';


export const ExcercisesFeatRoutes: Route[] = [
  {
    path: '',
    component: ExercisesComponent,
    children: [
      {
        path: 'add',
        component: ExercisesAddComponent
      },
      // {
      //   path: 'search',
      //   component: SearchComponent
      // },
      {
        path: ':id',
        component: ExercisesDetailComponent
      }
    ]
  },
];
