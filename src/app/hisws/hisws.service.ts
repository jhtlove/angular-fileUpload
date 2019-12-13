import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CxBean } from '../bean/CxBean';
import { SaveOutputBean } from '../bean/SaveOutputBean';
import { LoginBean } from '../bean/LoginBean';
import { FileBean } from '../bean/FileBean';
import { MenuBean } from '../bean/MenuBean';
import { FileContent } from '../bean/FileContent';
import { Router } from '@angular/router';
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
@Injectable({
	providedIn: 'root'
})
export class HiswsService {
	//
	private wsurl = 'http://111.22.14.74:8889/EzaRest/';
	constructor(
		private http: HttpClient,
		private router: Router) { }
	public loginws(loginBean: LoginBean): Observable<SaveOutputBean> {
		console.log("调用login服务");
		var surl = this.wsurl + 'login/' + loginBean.userid + '.do';
		console.log(surl);
		return this.http.post<SaveOutputBean>(surl, loginBean, httpOptions).pipe(
			tap((saveBean: SaveOutputBean) => {
				console.log(saveBean);
			}),
			catchError(this.handleError<any>('loginws'))
		);
	}
	public grwjfilews(userid: string): Observable<FileBean[]> {
		console.log("调用WS服务");
		return this.http.get<FileBean[]>(this.wsurl + 'grwj/selectWjml.do?ygid=' + userid)
			.pipe(
				tap(
					data => {
						console.log("返回结果是");
						console.log(data);
					}
				)
			);
	}
	public getwjnrws(spath: String): Observable<FileContent> {
		let lurl = this.wsurl + spath + '.do';
		console.log("调用WS服务:" + lurl);
		return this.http.get<FileContent>(lurl)
			.pipe(
				tap(
					data => {
						console.log("返回结果是");
						console.log(data);
					}
				)
			);
	}
	public menuws(ygid: String): Observable<MenuBean[]> {
		let lurl = this.wsurl + 'login/getMenu/' + ygid + '.do';
		console.log("调用WS服务:" + lurl);
		return this.http.get<MenuBean[]>(lurl)
			.pipe(
				tap(
					data => {
						console.log("返回结果是");
						console.log(data);
					}
				)
			);
	}
	public wjsave(fileBean: FileBean): Observable<SaveOutputBean> {
		console.log("调用base64save服务");
		var surl = this.wsurl + 'grwj/base64save.do';
		console.log(surl);
		return this.http.post<SaveOutputBean>(surl, fileBean, httpOptions).pipe(
			tap((saveBean: SaveOutputBean) => {
				console.log(saveBean);
			}),
			catchError(this.handleError<any>('wjsave'))
		);
	}
	private handleError<T>(operation = 'operation', result?: T) {
		console.log("错误处理");
		return (error: any): Observable<T> => {
			console.error(error);
			console.log('${operation} failed: ${error.message}');
			return of(result as T);
		};
	}
}