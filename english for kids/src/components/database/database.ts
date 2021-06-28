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

      request.onsuccess = function existWord() {
        resolve(request.result);
        // console.log('Word in the store', request.result);
      };

      request.onerror = function newWord() {
        reject(request.error);
        // console.log('New word', request.error);
      };
    });
    return promise;
  }

  async update(word: WordStatistic): Promise<void> {
    const promise = new Promise<void>((resolve, reject) => {
      const transaction = this.db!.transaction('words', 'readwrite');
      const words = transaction.objectStore('words');
      const request = words.put(word);

      request.onsuccess = function updateWord() {
        resolve();
        // console.log('Word in the store', request.result);
      };

      request.onerror = function updateWordError() {
        reject();
        // console.log('New word', request.error);
      };
    });
    return promise;
  }

  async getAllWords(): Promise<Array<WordStatistic>> {
    const promise = new Promise<Array<WordStatistic>>((resolve, reject) => {
      const transaction = this.db!.transaction('words', 'readwrite');
      const words = transaction.objectStore('words');
      const request = words.getAll();

      request.onsuccess = function allWordsget() {
        resolve(request.result);
        // console.log('ALL WORDS', request.result);
      };

      request.onerror = function allWordsGetError() {
        reject(request.error);
        // console.log('Error while reading all words', request.error);
      };
    });
    return promise;
  }
}