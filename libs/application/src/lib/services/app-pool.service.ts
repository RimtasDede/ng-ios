import { Injectable, signal } from '@angular/core';

import { ApplicationInstalled } from '../types';


@Injectable({
  providedIn: 'root'
})
export class AppPoolService {

  private poolApps: ApplicationInstalled[] = [];
  readonly apps = signal(this.poolApps);

  /**
   * Open app
   *
   * @param appId Unique app id
   * @param position Open animation starting point
   */
  open(app: ApplicationInstalled, { x, y }: { x: number, y: number }) {
    if (this.poolApps.find(val => val === app)) {
      // const appWindowRef = this.poolApps.get(app.id);
    } else {
      // const appWindowRef = this.poolViewContainerRef.createComponent(AppWindowComponent);

      // appWindowRef.setInput('x', x);
      // appWindowRef.setInput('y', y);
      this.poolApps.push(app);
      this.apps.set([ ...this.poolApps ]);

      console.log('apps', this.apps());

      // appWindowRef.instance.insertApp(app.app);
    }
  }

  /**
   * Close opened app but keep it in app pool
   */
  close(appId: string) {

  }

  /**
   * Remove opened app from app pool
   */
  remove(appId: string) {

  }

}
