import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

@Injectable()
export class NavigationItem {
  public get() {
    var itens = [
      {
        id: 'Cadastros',
        title: 'Cadastro',
        type: 'group',
        icon: 'feather icon-layers',
        hidden: false,
        children: [
          {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard/analytics',
            icon: 'home',
            breadcrumbs: false,
            hidden: false
          },
          {
            id: 'professional',
            title: 'Profissionais',
            type: 'item',
            url: '/pages/professional',
            icon: 'supervisor_account',
            hidden: false
          }
        ]
      },
    ];

    return itens;
  }
}
