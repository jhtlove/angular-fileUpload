import { LoginService } from './../service/login.service';
import { Component, OnInit } from '@angular/core';
import { MenuBean } from '../bean/MenuBean';
import { HiswsService } from '../hisws/hisws.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  selectedId: string;
  menus: MenuBean[];
  ygid: string;
  constructor(private menuService: HiswsService) { }

  ngOnInit() {
    this.ygid = sessionStorage.getItem('currentYGID');
    this.menuService.menuws(this.ygid).subscribe(
      data => {
        if (data && data.length) {
          this.menus = data;
          this.selectedId = data[0].menuid;
        } else {
          console.warn('没有获取菜单数据。');
        }
      }
    );
  }
  select(id: string) {
    this.selectedId = id;
  }

}