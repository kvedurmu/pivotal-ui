export default jasmine.createSpy('setImmediate').and.callFake((cb) => {
  setTimeout(cb, 0);
});