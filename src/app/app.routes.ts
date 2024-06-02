import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'ar',
    pathMatch: 'full',
  },
  {
    path: ':language',
    resolve: {
      translate: (route: ActivatedRouteSnapshot) => {
        const language = route.params['language'];
        const translateService = inject(TranslateService);
        return translateService.use(language!);
      },
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'public',
      },

      {
        path: 'public',
        loadChildren: () =>
          import('./public-pages/public-pages-routing.module').then((m) => m.PublicPagesRoutingModule),
      },
    ],
  },
];
