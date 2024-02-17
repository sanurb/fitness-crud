import { Injectable } from '@angular/core';
import { EntityStateLocalStorage } from '@fitness-crud/shared/data-access-crud-state';

interface IExercise {
  id: string;
  name: string;
  type: string;
  muscle: string;
  equipment: string;
  difficulty: string;
  instructions: string;
}

@Injectable({ providedIn: 'root' })
export class ExercisesState extends EntityStateLocalStorage<IExercise> {

}