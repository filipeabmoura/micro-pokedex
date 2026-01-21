import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { authGuard } from './core/guards/auth.guard';
import { HomeComponent } from './features/pokedex/pages/home/home.component';
import { FavoritesComponent } from './features/pokedex/pages/favorites/favorites.component';
import { PrivateLayoutComponent } from './components/private-layout/private-layout.component';
import { PublicLayoutComponent } from './components/public-layout/public-layout.component';
import { publicGuard } from './core/guards/public.guard';

export const routes: Routes = [
    {
        path: 'auth',
        component: PublicLayoutComponent,
        canActivate: [publicGuard],
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
        ],
    },

    {
        path: '',
        component: PrivateLayoutComponent,
        canActivate: [authGuard],
        children: [
            { path: '', component: HomeComponent },
            { path: 'favorites', component: FavoritesComponent },
        ],
    },

    { path: '**', redirectTo: 'auth/login' },
];
