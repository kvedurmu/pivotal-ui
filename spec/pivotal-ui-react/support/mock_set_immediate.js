export default jasmine.createSpy('setImmediate').and.callFake(function(cb) {
  setTimeout(cb, 0);
});