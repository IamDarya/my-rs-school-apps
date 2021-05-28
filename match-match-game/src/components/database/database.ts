import { User } from '../antities/user';

export class DatabaseIamDarya {
  request: IDBOpenDBRequest | undefined;

  db: IDBDatabase | undefined;

  async load(): Promise<void> {
    const promise = new Promise<void>((resolve) => {
      this.request = window.indexedDB.open('IamDarya', 2);

      this.request.onsuccess = (event) => {
        const e = event.target as unknown as { result: IDBDatabase };
        this.db = e.result as IDBDatabase;
        resolve();
      };

      this.request.onupgradeneeded = (event) => {
        const e = event.target as unknown as { result: IDBDatabase };
        this.db = e.result as IDBDatabase;
        this.db.createObjectStore('users', { keyPath: 'email' });
        resolve();
      };
    });
    return promise;
  }

  async transaction(user: User): Promise<void> {
    const promise = new Promise<void>((resolve, reject) => {
      const transaction = this.db?.transaction('users', 'readwrite');
      const users = transaction?.objectStore('users');
      const request = users?.add(user);

      request!.onsuccess = function adduser() {
        resolve();
        // console.log('User added to the store', request.result);
      };

      request!.onerror = function adduserError() {
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

      request.onsuccess = function existUser() {
        resolve(request.result);
        // console.log('User in the store', request.result);
      };

      request.onerror = function newUser() {
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

      request.onsuccess = function updateUser() {
        resolve();
        // console.log('User in the store', request.result);
      };

      request.onerror = function updateUserError() {
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

      request.onsuccess = function allUsersget() {
        resolve(request.result);
        // console.log('ALL USERS', request.result);
      };

      request.onerror = function allUsersGetError() {
        reject(request.error);
        // console.log('Error while reading all users', request.error);
      };
    });
    return promise;
  }
}
