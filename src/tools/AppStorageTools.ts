class AppStorageTools {
  get(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : undefined;
  }

  set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}

export const appStorage = new AppStorageTools();
