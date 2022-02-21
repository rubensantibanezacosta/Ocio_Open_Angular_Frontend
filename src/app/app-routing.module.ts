import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessGuardGuard } from './guards/access-guard.guard';
import { AdministrationComponent } from './pages/administration/administration.component';
import { AssistantsComponent } from './pages/assistants/assistants.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { CommentsComponent } from './pages/comments/comments.component';
import { EventFormComponent } from './pages/event-form/event-form.component';
import { EventsAdministrationComponent } from './pages/events-administration/events-administration.component';
import { EventsByDateComponent } from './pages/events-by-date/events-by-date.component';
import { FinalizedeventsComponent } from './pages/finalizedevents/finalizedevents.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MyeventsComponent } from './pages/myevents/myevents.component';
import { NofoundComponent } from './pages/nofound/nofound.component';
import { ProfileAdministrationComponent } from './pages/profile-administration/profile-administration.component';
import { RankingComponent } from './pages/ranking/ranking.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent,  canActivate: [AccessGuardGuard],  },
  { path: 'myevents', component: MyeventsComponent,  canActivate: [AccessGuardGuard]  },
  { path: 'finalizedevents', component: FinalizedeventsComponent,  canActivate: [AccessGuardGuard]  },
  { path: 'comments/:event_id', component: CommentsComponent,  canActivate: [AccessGuardGuard]  },
  { path: 'assistants/:event_id', component: AssistantsComponent,  canActivate: [AccessGuardGuard]  },
  { path: 'administration', component: AdministrationComponent,  canActivate: [AccessGuardGuard]  },
  { path: 'ranking', component: RankingComponent,  canActivate: [AccessGuardGuard]  },
  { path: 'calendar', component: CalendarComponent,  canActivate: [AccessGuardGuard]  },
  { path: 'eventform/:event_id/:type', component: EventFormComponent,  canActivate: [AccessGuardGuard]  },
  { path: 'profileAdministration/:email', component: ProfileAdministrationComponent,  canActivate: [AccessGuardGuard]  },
  { path: 'eventsAdministration/:event_id', component: EventsAdministrationComponent,  canActivate: [AccessGuardGuard]  },
  { path: 'eventsbydate/:date', component: EventsByDateComponent,  canActivate: [AccessGuardGuard]  },
  { path: '', component: LoginComponent },
  { path: '**', component: NofoundComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
