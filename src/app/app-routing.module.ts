import { PermissionsComponent } from './pages/profile-administration/permissions/permissions.component';
import { MenuComponent } from './components/menu/menu.component';
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
import { LoginComponent } from './pages/login/login.component';
import { NofoundComponent } from './pages/nofound/nofound.component';
import { ProfileAdministrationComponent } from './pages/profile-administration/profile-administration.component';
import { RankingComponent } from './pages/ranking/ranking.component';

/*const routes: Routes = [
  { path: '', redirectTo: "menu", pathMatch: "full" },
  { path: 'menu', loadChildren: ()=>import("./components/menu/menu.module").then(m=>m.MenuModule) },
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
  
  { path: '**', component: NofoundComponent }


];
*/
const routes: Routes = [
  {
    path: '',
    redirectTo: "menu/home",
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent, data: { animation: 'loginPage' }
  },

  {
    path: 'menu',
    component: MenuComponent, data: [{ animation: 'menuPage' },],
    children: [
      {
        path: 'home', component: FinalizedeventsComponent, data: { animation: 'homePage'},

        children: [
          { path: 'eventform/:event_id/:type', component: EventFormComponent, data: { animation: 'eventFormPage'} },
          { path: 'comments/:event_id', component: CommentsComponent, data: { animation: 'CommentsPage'} },
          { path: 'assistants/:event_id', component: AssistantsComponent, data: { animation: 'assistantsPage'} },
        ]
      },
      {
        path: 'administration', component: AdministrationComponent,
        data: { animation: 'administrationPage'},
        children: [
          {
            path: 'profileAdministration/:email', component: ProfileAdministrationComponent,
            data: { animation: 'profileAdministrationPage'},
            children: [
              { path: 'eventsAdministration/:event_id', component: EventsAdministrationComponent, data: { animation: 'eventAdministrationPage'} },
              {
                path: 'permissions/:email', component: PermissionsComponent,
                data: { animation: 'permissionsPage'}
              },
            ]
          },
          {
            path: 'eventsAdministration/:event_id', component: EventsAdministrationComponent, data: { animation: 'eventAdministrationPage'}
          },
        ]
      },
      { path: 'ranking', component: RankingComponent },
      {
        path: 'calendar',
        component: CalendarComponent,
        data: { animation: 'calendarPage'},
        children: [
          { path: 'eventsbydate/:date', component: EventsByDateComponent, data: { animation: 'eventsByDatePage'} },
        ]
      },
      { path: '**', component: NofoundComponent }
    ]

  },

]
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
