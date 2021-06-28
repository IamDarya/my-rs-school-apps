import { WordStatistic } from './word-statist';

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
        this.db.createObjectStore('words', { keyPath: 'id' });
        resolve();
      };
    });
    return promise;
  }

  async transaction(word: WordStatistic): Promise<void> {
    const promise = new Promise<void>((resolve, reject) => {
      const transaction = this.db?.transaction('words', 'readwrite');
      const words = transaction?.objectStore('words');
      const request = words?.add(word);

      request!.onsuccess = function addword() {
        resolve();
      };

      request!.onerror = function addwordError() {
        reject();
      };
    });
    return promise;
  }

  async getWord(id: string): Promise<WordStatistic> {
    const promise = new Promise<WordStatistic>((resolve, reject) => {
      const transaction = this.db!.transaction('words', 'readwrite');
      const words = transaction.objectStore('words');
      const request = words.get(id);

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

  async update(user: WordStatistic): Promise<void> {
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

  async getAllUsers(): Promise<Array<WordStatistic>> {
    const promise = new Promise<Array<WordStatistic>>((resolve, reject) => {
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
