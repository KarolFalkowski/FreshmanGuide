import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { Constants } from 'src/app/constants';
import { Reply } from 'src/app/models/reply';
import { HandleErrorService } from '../handle-error.service';

@Injectable({
  providedIn: 'root',
})
export class RepliesService {
  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) {}

  public getAllFromReplies(): Observable<Reply[]> {
    return this.http
      .get<Reply[]>(`${Constants.backendApiUrl}Main/GetAllReplies`)
      .pipe(retry(1), catchError(this.handleErrorService.handleError));
  }

  public getOneFromReplies(replyID: number): Observable<Reply> {
    return this.http
      .get<Reply>(`${Constants.backendApiUrl}Main/GetReply/${replyID}`)
      .pipe(retry(1), catchError(this.handleErrorService.handleError));
  }

  public postReply(reply: Reply): Observable<Reply> {
    return this.http
      .post<Reply>(`${Constants.backendApiUrl}Main/PostReply`, reply)
      .pipe(catchError(this.handleErrorService.handleError));
  }
}
