import React from 'react';
import classnames from 'classnames';

import './Input.less';

const InputView = ({
  label,
  onInput,
  isTextArea,
  className,
  ...inputProps
}) => {
  const classes = classnames({
    'platfotm-Input': true,
    [className]: className && true,
  });

  const inputEl = isTextArea ? (
    <textarea
      {...inputProps}
      className="platfotm-Input__input platfotm-Input__input--textarea"
      onInput={onInput}
    />
  ) : (
    <input
      {...inputProps}
      className="platfotm-Input__input"
      onInput={onInput}
    />
  );

  return (
    <div className={classes}>
      <label className="platfotm-Input__label">
        <span className="platfotm-Input__label-text">{label}</span>
        {inputEl}
      </label>
    </div>
  );
};

export { InputView };
