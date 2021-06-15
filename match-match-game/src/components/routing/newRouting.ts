export class NewRout {
  routes: Array<{ path: string; cb: () => void }> = [];

  root = '/';

  current: string;

  constructor() {
    this.current = this.root;
    this.listenForChanges();
  }

  add(path: string, cb: () => void): NewRout {
    this.routes.push({ path, cb });
    return this;
  }

  static clearSlashes(path: string): string {
    return path.toString().replace(/\/$/, '').replace(/^\//, '');
  }

  static getfragment(): string {
    let fragment = '';
    const match = window.location.href.match(/#(.*)$/);
    fragment = match ? match[1] : '';
    return NewRout.clearSlashes(fragment);
  }

  navigate(path = ''): NewRout {
    window.location.href = `${window.location.href.replace(
      /#(.*)$/,
      '',
    )}#${path}`;
    return this;
  }

  listenForChanges(): void {
    setInterval(() => this.interval(), 50);
  }

  interval(): void {
    if (this.current === NewRout.getfragment()) return;
    this.current = NewRout.getfragment();

    this.routes.some((route) => {
      const match = this.current === route.path;
      if (match) {
        route.cb.apply({});
        return match;
      }
      return false;
    });
  }

  cleanHref(): void {
    this.navigate('');
    this.current = '';
  }
}
