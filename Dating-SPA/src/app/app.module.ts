import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceprtorProvider } from './services/errorInterceprtor.service';
import { AlertifyService } from './services/alertify.service';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './guards/auth.guard';
import { JwtModule } from '@auth0/angular-jwt';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    ListsComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    JwtModule.forRoot({
      config: {
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/login'],
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
      },
    }),
  ],
  providers: [
    AuthService,
    ErrorInterceprtorProvider,
    AlertifyService,
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
