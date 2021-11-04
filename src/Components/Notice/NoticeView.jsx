import React from 'react';

import './Notice.less';
import { NoticeItemView } from './templates/NoticeItemView';

const NoticeView = ({ allNotices, closeHandler }) => {
  if (!allNotices.length) return null;
  const notices = allNotices.map(({ id, type, content }) => {
    return (
      <NoticeItemView
        key={id}
        id={id}
        type={type}
        content={content}
        closeHandler={closeHandler}
      />
    );
  });
  return (
    <>
      <div className="Notice">{notices}</div>
    </>
  );
};

export { NoticeView };
