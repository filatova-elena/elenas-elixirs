import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RecipePageComponent } from './pages/recipe-page/recipe-page.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'recipe',
        component: RecipePageComponent,
    },
    {
        path: '**',
        redirectTo: '',
    }
];
