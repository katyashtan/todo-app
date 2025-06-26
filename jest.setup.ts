function storageMock() {
  let storage: Record<string, string> = {};

  return {
    setItem: function (key: string, value: string) {
      storage[key] = String(value);
    },
    getItem: function (key: string) {
      return Object.prototype.hasOwnProperty.call(storage, key) ? storage[key] : null;
    },
    removeItem: function (key: string) {
      delete storage[key];
    },
    get length() {
      return Object.keys(storage).length;
    },
    key: function (i: number) {
      const keys = Object.keys(storage);
      return keys[i] || null;
    },
    clear: function () {
      storage = {};
    },
  };
}

Object.defineProperty(window, 'localStorage', {
  value: storageMock(),
  writable: true,
});
