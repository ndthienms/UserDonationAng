import { Routes } from '@angular/router';
import { DonorAuthComponent } from './Auth/donor-auth/donor-auth.component';
import { OrganiserAuthComponent } from './Auth/organiser-auth/organiser-auth.component';
import { RecipientAuthComponent } from './Auth/recipient-auth/recipient-auth.component';
import { OtpComponent } from './Auth/otp/otp.component';

export const routes: Routes = [
    // {
    //     path: '', component: PagesComponent,
    //     children: [
    //         {
    //             path: 'users', component: UsersComponent,
    //             children: [
    //                 { path: 'admin', component: AdminComponent },
    //                 { path: 'donor', component: DonorComponent },
    //                 { path: 'organiser', component: OrganiserComponent },
    //                 { path: 'recipient', component: RecipientComponent },
    //                 { path: 'uncensored', component: UncensoredComponent },
    //                 { path: '', redirectTo: 'admin', pathMatch: 'full' },
    //             ]
    //         },
    //         { path: 'campaign', component: CampaignComponent },
    //         // {path:'transference', component:TransferenceComponent},
    //         { path: 'post', component: PostComponent },
    //         { path: 'map', component: MapComponent },
    //         { path: '', redirectTo: 'users', pathMatch: 'full' },
    //     ],
    //     canActivate: [AuthGuard], data: { permittedRoles: ['admin'] }
    // },
    { path: 'auth/donor', component: DonorAuthComponent },
    { path: 'auth/organiser', component: OrganiserAuthComponent },
    { path: 'auth/recipient', component: RecipientAuthComponent },
    { path: 'auth/otp', component: OtpComponent }
];
