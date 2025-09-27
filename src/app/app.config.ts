import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';

// 👇 ICONS
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { UserOutline, LockOutline, MailOutline } from '@ant-design/icons-angular/icons';
import { NZ_I18N, en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

registerLocaleData(en); // ✅ NgZorro English

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({
      eventCoalescing: true
    }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),

    // 👇 Register icons here (best practice)
    {
      provide: NZ_ICONS,
      useValue: [UserOutline, LockOutline, MailOutline]
    },
    {
      provide: NZ_I18N,
      useValue: en_US
    }, provideNzI18n(en_US), importProvidersFrom(FormsModule), provideAnimationsAsync(), provideHttpClient()
  ]
};
