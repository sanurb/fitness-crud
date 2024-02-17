import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ExercisesState } from '@fitness-crud/data-access-exercises';
import { BaseLayoutCrudCreateUiComponent, ButtonUiComponent, DrawerUiComponent } from '@fitness-crud/shared/ui-design-system';
import { FormDirective } from '@fitness-crud/shared/ui-forms';
import { ValidExerciseFormModel, exerciseForm } from '../../../models/exercise-form.model';
import { CrudCreateState } from '@fitness-crud/shared/data-access-crud-state';
import { Exercise } from '../exercises/exercise.type';
import { exerciseFormValidations } from '../../../validations/exercise-form.validations';
import { ExercisesFormUiComponent } from '../../ui/exercises-form/exercises-form.ui.component';

@Component({
  selector: 'fitness-crud-exercises-add',
  standalone: true,
  imports: [
    CommonModule,
    ButtonUiComponent,
    DrawerUiComponent,
    FormDirective,
    FormsModule,
    RouterLink,
    BaseLayoutCrudCreateUiComponent,
    ExercisesFormUiComponent
  ],
  templateUrl: './exercises-add.component.html',
  styleUrl: './exercises-add.component.scss',
})
export class ExercisesAddComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly exercisesState = inject(ExercisesState);


  private readonly mapFormToEntity = (form: ValidExerciseFormModel) => {
    return {
      id: this.activatedRoute.snapshot.params['id'],
      name: form.name,
      type: form.type,
      muscle: form.muscle,
      equipment: form.equipment,
      difficulty: form.difficulty,
      instructions: form.instructions,
    };
  };

  protected readonly createState = new CrudCreateState<
    Exercise,
    ValidExerciseFormModel
  >(
    this.exercisesState,
    this.activatedRoute,
    this.router,
    exerciseForm,
    this.mapFormToEntity
  );
  protected readonly suite = exerciseFormValidations;

  private readonly fromCreateState = this.createState.selectMany([
    'formValue',
    'acting',
  ]);

  private readonly viewModel = computed(() => {
    const { formValue, acting } = this.fromCreateState();
    return {
      form: formValue,
      formDisabled: acting,
    };
  });

  protected get vm() {
    return this.viewModel();
  }

  protected submit() {
    this.createState.save();
  }
}
