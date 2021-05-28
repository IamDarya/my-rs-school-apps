import { User } from '../antities/user';

export class DatabaseIamDarya {
  request: IDBOpenDBRequest;

  db: IDBDatabase | undefined;

  constructor() {
    this.request = window.indexedDB.open('IamDarya', 2);

    this.request.onsuccess = (event) => {
      const e = event.target as unknown as { result: IDBDatabase };
      this.db = e.result as IDBDatabase;
    };

    this.request.onupgradeneeded = (event) => {
      const e = event.target as unknown as { result: IDBDatabase };
      this.db = e.result as IDBDatabase;
      this.db.createObjectStore('users', { keyPath: 'email' });
    };
  }

  async transaction(user: User): Promise<void> {
    const promise = new Promise<void>((resolve, reject) => {
      const transaction = this.db?.transaction('users', 'readwrite');
      const users = transaction?.objectStore('users');
      const request = users?.add(user);

      request!.onsuccess = function () {
        resolve();
        // console.log('User added to the store', request.result);
      };

      request!.onerror = function () {
        reject();
        // console.log('Error', request.error);
      };
    });
    return promise;
  }

  async getUser(email: string): Promise<User> {
    const promise = new Promise<User>((resolve, reject) => {
      const transaction = this.db!.transaction('users', 'readwrite');
      const users = transaction.objectStore('users');
      const request = users.get(email);

      request.onsuccess = function () {
        resolve(request.result);
        // console.log('User in the store', request.result);
      };

      request.onerror = function () {
        reject(request.error);
        // console.log('New user', request.error);
      };
    });
    return promise;
  }

  async update(user: User): Promise<void> {
    const promise = new Promise<void>((resolve, reject) => {
      const transaction = this.db!.transaction('users', 'readwrite');
      const users = transaction.objectStore('users');
      const request = users.put(user);

      request.onsuccess = function () {
        resolve();
        // console.log('User in the store', request.result);
      };

      request.onerror = function () {
        reject();
        // console.log('New user', request.error);
      };
    });
    return promise;
  }

  async getAllUsers(): Promise<Array<User>> {
    const promise = new Promise<Array<User>>((resolve, reject) => {
      const transaction = this.db!.transaction('users', 'readwrite');
      const users = transaction.objectStore('users');
      const request = users.getAll();

      request.onsuccess = function () {
        resolve(request.result);
        // console.log('ALL USERS', request.result);
      };

      request.onerror = function () {
        reject(request.error);
        // console.log('Error while reading all users', request.error);
      };
    });
    return promise;
  }
}
