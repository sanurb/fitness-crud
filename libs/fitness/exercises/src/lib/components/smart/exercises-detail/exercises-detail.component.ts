import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseLayoutCrudUpdateUiComponent, ButtonUiComponent, DeleteModalUiComponent } from '@fitness-crud/shared/ui-design-system';
import { FormDirective } from '@fitness-crud/shared/ui-forms';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ExercisesState } from '@fitness-crud/data-access-exercises';
import { ExercisesFormUiComponent } from '../../ui/exercises-form/exercises-form.ui.component';
import { Exercise } from '../exercises/exercise.type';
import { ValidExerciseFormModel, exerciseForm } from '../../../models/exercise-form.model';
import { CrudUpdateState } from '@fitness-crud/shared/data-access-crud-state';
import { exerciseFormValidations } from '../../../validations/exercise-form.validations';

@Component({
  selector: 'fitness-crud-exercises-detail',
  standalone: true,
  imports: [
    CommonModule,
    ButtonUiComponent,
    FormDirective,
    FormsModule,
    ExercisesFormUiComponent,
    RouterLink,
    BaseLayoutCrudUpdateUiComponent,
    DeleteModalUiComponent,
  ],
  templateUrl: './exercises-detail.component.html',
  styleUrl: './exercises-detail.component.scss',
})
export class ExercisesDetailComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly exercisesState = inject(ExercisesState);

  private readonly mergeEntityWithForm = (
    entity: Exercise,
    formValue: Partial<ValidExerciseFormModel>
  ): ValidExerciseFormModel => {
    return {
      ...formValue,
      name: entity.name,
      type: entity.type,
      muscle: entity.muscle,
      equipment: entity.equipment,
      difficulty: entity.difficulty,
      instructions: entity.instructions,
    };
  };

  private readonly mapFormToEntity = (form: ValidExerciseFormModel): Exercise => {
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
  protected readonly updateState = new CrudUpdateState<
    Exercise,
    ValidExerciseFormModel
  >(
    this.exercisesState,
    this.activatedRoute,
    this.router,
    exerciseForm,
    this.mergeEntityWithForm,
    this.mapFormToEntity
  );

  protected readonly suite = exerciseFormValidations;

  private readonly fromDetailState = this.updateState.selectMany([
    'deleteOpen',
    'formValue',
    'loading',
    'loadingItem',
    'loadingItem',
    'acting',
    'formDirty',
  ]);

  private readonly viewModel = computed(() => {
    const { formValue, loadingItem, loading, acting, deleteOpen, formDirty } =
      this.fromDetailState();
    const someLoading = loading || loadingItem;
    return {
      form: formValue,
      formDisabled: someLoading || acting,
      submitDisabled: !formDirty,
      deleteOpen,
    };
  });

  protected get vm() {
    return this.viewModel();
  }

  protected async submit() {
    this.updateState.save();
  }
}
