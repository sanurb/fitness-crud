import { DeepRequired } from "@fitness-crud/shared/type-advanced";

export type ValidExerciseFormModel = {
    name: string;
    type: string;
    muscle: string;
    equipment: string;
    difficulty: string;
    instructions: string;
};

export type ExerciseFormModel = Partial<ValidExerciseFormModel>;

export const exerciseForm: DeepRequired<ExerciseFormModel> = {
    name: '',
    type: '',
    muscle: '',
    equipment: '',
    difficulty: '',
    instructions: '',
};