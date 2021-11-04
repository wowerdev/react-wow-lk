import { makeObservable, observable, action } from 'mobx';

class NoticeStore {
  constructor() {
    makeObservable(this);
  }

  @observable allNotices = [];

  @action addNotice = (noticeProps) => {
    NoticeStore.lastId++;
    this.allNotices = [
      ...this.allNotices,
      { ...noticeProps, id: NoticeStore.lastId },
    ];
  };

  @action deleteNotice = (id) => {
    const index = this.allNotices.findIndex((item) => item.id === id);
    const allNotices = [...this.allNotices];
    if (index !== -1) {
      allNotices.splice(index, 1);
    }
    this.allNotices = allNotices;
  };

  static lastId = 1;
}

// const noitce = {
//   id: 1,
//   content: '',
//   type: ''
// }

export default new NoticeStore();
