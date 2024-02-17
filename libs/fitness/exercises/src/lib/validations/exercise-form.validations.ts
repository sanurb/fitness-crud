import { create, enforce, only, test } from 'vest';
import { ExerciseFormModel } from '../models/exercise-form.model';

export const exerciseFormValidations = create(
  (model: ExerciseFormModel, field: string) => {
    only(field);

    test('name', 'Name is required', () => {
      enforce(model.name).isNotBlank();
    });

    test('type', 'Type is required', () => {
      enforce(model.type).isNotBlank();
    });

    test('muscle', 'Muscle group is required', () => {
      enforce(model.muscle).isNotBlank();
    });

    test('equipment', 'Equipment is required', () => {
      enforce(model.equipment).isNotBlank();
    });

    test('difficulty', 'Difficulty is required', () => {
      enforce(model.difficulty).isNotBlank();
    });

    test('instructions', 'Instructions are required', () => {
      enforce(model.instructions).isNotBlank();
    });
  }
);
