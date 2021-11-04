import React, { useState } from 'react';
import Input from '../../Components/Input/Input';
import Title from '../../Components/Title/Title';
import Button from '../../Components/Button/Button';
import './Feedback.less';
import { sendMailApi } from '../../api/account';
import NoticeStore from '../../stores/NoticeStore';

const { addNotice } = NoticeStore;

const FeedbackView = () => {
  const [themeInput, setThemeInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [msgInput, setMsgInput] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    sendMailApi({
      theme: themeInput,
      email: emailInput,
      message: msgInput,
    }).then((res) => {
      addNotice({
        type: 'ok',
        content: res,
      });
    });
  };

  return (
    <div className="Feedback">
      <Title className="platform-Title--page">Обратная связь</Title>
      <form className="Feedback__form" onSubmit={onSubmitHandler}>
        <div className="Feedback__form-row">
          <Input
            label="Тема письма:"
            placeholder="Введите тему"
            value={themeInput}
            onChange={(e) => {
              setThemeInput(e.target.value);
            }}
            required
            maxlenght={100}
          />
        </div>
        <div className="Feedback__form-row">
          <Input
            label="Email для ответа:"
            placeholder="Введите ваш email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            type="email"
            required
          />
        </div>
        <div className="Feedback__form-row">
          <Input
            className="Feedback__textarea"
            label="Ваше сообщение:"
            placeholder="Введите ваше сообщение"
            isTextArea
            value={msgInput}
            onChange={(e) => setMsgInput(e.target.value)}
            required
            maxlenght={500}
          />
          <Button>Отправить</Button>
        </div>
      </form>
    </div>
  );
};

export { FeedbackView };
