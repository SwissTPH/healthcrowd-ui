ReactiveDict = function (init) {
  this.keys = {};
  this.deps = {};

  init = init || {};
  for (var i in init)
    if (init.hasOwnProperty(i))
      this.set(i, init[i]);
};

ReactiveDict.prototype = {
  set: function (key, value) {
    this.ensureDeps(key);
    this.keys[key] = value;
    this.deps[key].changed();
  },

  get: function (key) {
    this.ensureDeps(key);
    this.deps[key].depend();
    return this.keys[key];
  },

  ensureDeps: function (key) {
    if (! this.deps[key]) {
      this.deps[key] = new Tracker.Dependency();
    }
  }
};
