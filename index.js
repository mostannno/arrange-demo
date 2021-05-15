class Notify {
  constructor(name) {
    if (!name) throw Error('need a name to notify');
    this.index = 0; // 表示新任务应该插入任务队列的位置，waitFirst 函数会将该指针重置到任务队列的起点
    this.jobs = []; // 任务队列
    this.setLogJob(`${name} is notified`)
  }
  addJob(job, newIndex) {
    if (typeof newIndex === 'number' && newIndex >= 0) this.index = newIndex;
    if (job) {
      this.jobs.splice(this.index, 0, job);
      this.index++;
    }
  }
  setLogJob(log) {
    if (!log) return;
    const logJob = () => new Promise(resolve => {
      console.log(`${log}\n`);
      resolve();
    });
    this.addJob(logJob);
  }
  getTimeJob(time) {
    return () => new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, time * 1000);
    });
  }
  wait = (time) => {
    if (time >= 0) {
      const job = this.getTimeJob(time);
      this.addJob(job)
    }
    return this;
  }
  waitFirst = (time) => {
    if (time >= 0) {
      const job = this.getTimeJob(time);
      this.addJob(job, 0);
    }
    return this;
  }
  // 按需执行任务队列
  do = (action) => {
    if (action) {
      this.setLogJob(`Start to ${action}`);
    }
    return this.jobs.reduce((prev, value) => {
      return prev.then(() => value());
    }, Promise.resolve());
  }
}

module.exports = function arrange(someone) {
  return new Notify(someone);
}
