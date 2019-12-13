import { LoginService, User } from '../service/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HiswsService } from '../hisws/hisws.service';
import { LoginBean } from '../bean/loginBean';
import { SaveOutputBean } from '../bean/saveOutputBean';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: LoginBean = new LoginBean();
  constructor(private loginService: HiswsService, private router: Router) { }

  ngOnInit() {
    const inputElem: any = $('#rememberMe');
    inputElem.iCheck({

      checkboxClass: 'icheckbox_square-blue',
      radioClass: 'iradio_square-blue',
      increaseArea: '20%'  // optional
    });
    const userName = localStorage.getItem('currentUser');
    const pwd = localStorage.getItem('currentPwd');
    if (userName) {
      this.user.userid = userName;
    }
    if (pwd) {
      this.user.password = pwd;
    }
  }

  onLogin() {
    const checkBox: any = document.getElementById('rememberMe');
    const isChecked = checkBox.checked;
    $('#btnLogin').attr('disabled', 'disabled');
    this.loginService.loginws(this.user).subscribe(
      data => {
        const res: SaveOutputBean = data;
        $('#btnLogin').removeAttr('disabled');
        if (!res) {
          alert('登录失败！');
          return;
        }

        if (res.state) {
          if (isChecked) {
            localStorage.setItem('currentUser', this.user.userid);
            localStorage.setItem('currentPwd', this.user.password);
          } else {
            localStorage.removeItem('currentUser');
            localStorage.removeItem('currentPwd');
          }
          sessionStorage.setItem('logSuccessed', 'true');
          sessionStorage.setItem('currentUser', this.user.userid);
          sessionStorage.setItem('currentYGID', res.a01);

          this.router.navigateByUrl('ihismain');
          // window.location.reload();
        } else {
          alert('登陆失败!');
          // console.error(res.errorMsg);
        }

      }
    );
  }

}
