import { LoginComponent } from './components/login/login.component';
import { LogarComponent } from './components';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

export const LoginRoutes: Routes = [
    {
        path: 'login',
        component: LogarComponent,
        children: [{path: '', component: LoginComponent}]
    }
];

@NgModule({
    imports: [RouterModule.forChild(LoginRoutes)],
    exports: [ RouterModule ]
})
export class LoginRoutingModule {
}
