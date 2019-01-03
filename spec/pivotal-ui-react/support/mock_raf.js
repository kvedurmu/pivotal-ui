var callbacks = [];

var raf = jasmine.createSpy('raf').and.callFake((callback) => {
  callbacks.push(callback);
});

Object.assign(raf, {
  next() {
    callbacks.forEach((cb) => {
      cb();
      callbacks.splice(callbacks.indexOf(cb), 1);
    });
  },
  reset() {
    callbacks = [];
  }
});

export default raf;