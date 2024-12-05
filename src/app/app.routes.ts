import { Routes } from '@angular/router';
import { DonorAuthComponent } from './Auth/donor-auth/donor-auth.component';
import { OrganiserAuthComponent } from './Auth/organiser-auth/organiser-auth.component';
import { RecipientAuthComponent } from './Auth/recipient-auth/recipient-auth.component';
import { OtpComponent } from './Auth/otp/otp.component';
import { DonorComponent } from './Pages/donor/donor.component';
import { CampaignComponent } from './Pages/donor/campaign/campaign.component';
import { DonationComponent } from './Pages/donor/donation/donation.component';
import { AuthGuard } from './Guards/auth.guard';
import { DonationResponseComponent } from './Pages/donor/donation-response/donation-response.component';

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
    {
        path: '', component: DonorComponent,
        children: [
            { path: 'campaign', component: CampaignComponent },
            { path: 'donation', component: DonationComponent, canActivate: [AuthGuard], data: { permittedRoles: ['donor'] } },
            { path: 'donation/:paymentresult', component: DonationResponseComponent, canActivate: [AuthGuard], data: { permittedRoles: ['donor'] } },
            { path: '', redirectTo: 'campaign', pathMatch: 'full' },
        ]
    },
    { path: 'auth/donor', component: DonorAuthComponent },
    { path: 'auth/organiser', component: OrganiserAuthComponent },
    { path: 'auth/recipient', component: RecipientAuthComponent },
    { path: 'auth/otp', component: OtpComponent }
];
