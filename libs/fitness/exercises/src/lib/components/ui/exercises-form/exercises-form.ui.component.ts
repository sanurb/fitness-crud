import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlWrapperComponent, FormModelGroupDirective, templateDrivenForms } from '@fitness-crud/shared/ui-forms';
import { FormsModule } from '@angular/forms';
import { BadgeUiComponent, InputUiComponent, LabelUiComponent, SelectUiComponent, TextareaUiComponent } from '@fitness-crud/shared/ui-design-system';
import { ExerciseFormModel } from '../../../models/exercise-form.model';
import { templateDrivenFormsViewProviders } from '@fitness-crud/shared/util-forms';

@Component({
  selector: 'fitness-crud-exercises-form',
  standalone: true,
  imports: [
    CommonModule,
    templateDrivenForms,
    ControlWrapperComponent,
    FormModelGroupDirective,
    FormsModule,
    InputUiComponent,
    LabelUiComponent,
    SelectUiComponent,
    TextareaUiComponent,
    BadgeUiComponent,
  ],
  templateUrl: './exercises-form.ui.component.html',
  styleUrl: './exercises-form.ui.component.scss',
  viewProviders: [templateDrivenFormsViewProviders],
})
export class ExercisesFormUiComponent {
  @Input() public formValue: ExerciseFormModel = {};
}
