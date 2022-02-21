import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { MyeventsComponent } from './pages/myevents/myevents.component';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { RankingComponent } from './pages/ranking/ranking.component';
import { FinalizedeventsComponent } from './pages/finalizedevents/finalizedevents.component';
import { AdministrationComponent } from './pages/administration/administration.component';
import { NofoundComponent } from './pages/nofound/nofound.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { ProfileAdministrationComponent } from './pages/profile-administration/profile-administration.component';
import { SlideshowComponent } from './components/slideshow/slideshow.component';
import { ValorationComponent } from './components/slideshow/valoration/valoration.component';
import { AttendanceComponent } from './components/slideshow/attendance/attendance.component';
import { CommentsComponent } from './pages/comments/comments.component';
import { AssistantsComponent } from './pages/assistants/assistants.component';
import { BackIconComponent } from './components/back-icon/back-icon.component';
import { EventFormComponent } from './pages/event-form/event-form.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ImageViewerComponent } from './components/gallery/image-viewer/image-viewer.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EventsAdministrationComponent } from './pages/events-administration/events-administration.component';
import { ErrorHandlerComponent } from './components/error-handler/error-handler.component';
import { DayEventsComponent } from './pages/calendar/day-events/day-events.component';
import { EventsByDateComponent } from './pages/events-by-date/events-by-date.component';
import { DayEventComponent } from './pages/calendar/day-events/day-event/day-event.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FileSaverModule } from 'ngx-filesaver';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MyeventsComponent,
    MenuComponent,
    FooterComponent,
    HeaderComponent,
    RankingComponent,
    FinalizedeventsComponent,
    AdministrationComponent,
    NofoundComponent,
    CalendarComponent,
    ProfileAdministrationComponent,
    SlideshowComponent,
    ValorationComponent,
    AttendanceComponent,
    CommentsComponent,
    AssistantsComponent,
    BackIconComponent,
    EventFormComponent,
    GalleryComponent,
    ImageViewerComponent,
    ProfileComponent,
    EventsAdministrationComponent,
    ErrorHandlerComponent,
    DayEventsComponent,
    EventsByDateComponent,
    DayEventComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SocialLoginModule,
    HttpClientModule,
    FormsModule,
    ScrollingModule,
    FileSaverModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '481491250235-j401vq8g5o73j1hmm75b67j7104u2t70.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('clientId')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
