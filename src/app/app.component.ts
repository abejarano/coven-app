import { Component, OnInit } from "@angular/core";
import * as firebase from "nativescript-plugin-firebase";
import {RequestAPI} from '~/app/services/requestAPI';

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {

    constructor(
        private http: RequestAPI
    ) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        const platf = 'ios';
        // Init your component properties here.
        firebase.init({
            showNotifications: true,
            showNotificationsWhenInForeground: true,
            onPushTokenReceivedCallback: (token) => {
                console.log('[Firebase] onPushTokenReceivedCallback:', { token });
            },
            onMessageReceivedCallback: (message: firebase.Message) => {
                console.log('[Firebase] onMessageReceivedCallback:', { message });
            }
        }).then(() => {
            console.log('[Firebase] Initialized');
        });
    }
}
