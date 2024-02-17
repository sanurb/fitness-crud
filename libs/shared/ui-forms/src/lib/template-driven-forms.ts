import { FormsModule } from '@angular/forms';
import { ControlWrapperComponent } from './components/ui/control-wrapper/control-wrapper.component';
import { FormDirective } from './directives/form.directive';
import { FormModelDirective } from './directives/form-model.directive';
import { FormModelGroupDirective } from './directives/form-model-group.directive';


export const templateDrivenForms = [ControlWrapperComponent, FormDirective, FormsModule, FormModelDirective, FormModelGroupDirective];
