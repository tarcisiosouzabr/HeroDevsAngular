import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { DataService } from './data.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), DataService],
};
