import { Type } from '@angular/core';

export interface Application {
  category: AppCategory;
  label: string;

  /**
   * SVG string or component class
   */
  icon: Type<any>;

  /**
   * Application component
   */
  app: Type<any>;
  contextMenu?: [];
}

export interface ApplicationInstalled extends Application {
  id: string;
  idGrid: string;
}

export enum AppCategory {
  Social = 1,
  ProductivityAndFinances = 2,
  Utilities = 3,
  Creativity = 4,
  ShoppingAndFood = 5,
  InfoAndReading = 6,
  Entertainment = 7,
  Games = 8,
  Other = 9
}
