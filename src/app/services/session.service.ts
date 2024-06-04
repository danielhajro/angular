import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private storagePrefix = 'app_'; // Prefix to avoid conflicts

  constructor() {}

  setSession<T>(key: string, value: T): void {
    try {
      localStorage.setItem(this.storagePrefix + key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting session data:', error);
    }
  }

  getSession<T>(key: string): T | null {
    const value = localStorage.getItem(this.storagePrefix + key);
    if (value) {
      try {
        return JSON.parse(value) as T;
      } catch (error) {
        console.error('Error parsing session data:', error);
        return null;
      }
    }
    return null;
  }

  clearSession(): void {
    Object.keys(localStorage)
      .filter(key => key.startsWith(this.storagePrefix))
      .forEach(key => localStorage.removeItem(key));
  }

  removeSessionItem(key: string): void {
    localStorage.removeItem(this.storagePrefix + key);
  }
}
