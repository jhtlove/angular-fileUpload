import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.css']
})
export class FileInputComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.initFileUpload();
  }

  initFileUpload() {
    const inputElem: any = $('#input-id');
    inputElem.fileinput({
      //.81.131
      uploadUrl: 'http://192.168.81.131:8080/EzaRest/grwj/save.do',
      language: 'zh',
      // uploadAsync:false, // 是否异步上传;异步：同时发送多个请求
      maxFileCount: 5,
      maxFileSize: 3000,
      previewFileType: 'any',
      crossDomain: true
    });
  }

}
