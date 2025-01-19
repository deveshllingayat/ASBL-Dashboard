import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  private loggedIn = new BehaviorSubject<boolean>(this.isAuthenticated());

  login(username: string, password: string) {
    if (username == 'inncircles' && password == 'inncircles') {
      localStorage.setItem('userLogin', 'true');
      this.loggedIn.next(true);
    } else {
      localStorage.setItem('userLogin', 'false');
      this.loggedIn.next(false);
    }
  }
  get isLoggedIn$() {
    return this.loggedIn.asObservable();
  }

  logout() {
    localStorage.removeItem('userLogin');
    this.loggedIn.next(false);
    alert('Logged Out Successfully');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    if (localStorage.getItem('userLogin') == 'true') return true;
    return false;
  }
}
