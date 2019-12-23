import React, {useState} from 'react';
import {Checkbox, TextArea, } from '../../PartialComponents';
export default props => {
  const [isEnabled, setEnabled] = useState(false);
  const [ticketContent, setContent] = useState('You won 1% bonus');

  let onChecked = setEnabled;
  if(props.onChecked) {
    onChecked = (e) => {
      setEnabled(e);
      props.onChecked(e);
    }
  }

  let onContentChange = setContent;
  if(props.onContentChange) {
    onContentChange = (e) => {
      setContent(e.target.value)
      props.onContentChange(e);
    }
  }
  const label = 'Use bonus ticket as reward:';
  return (
    <div id="bonusTicketContainer">
      <Checkbox label={label} onChange={onChecked} />
      {isEnabled && (
        <TextArea
          storyline = {false}
          rows="1"
          cols="1"
          label="Enter ticket message:"
          placeholder="Congrats! You won 1% bonus for the next quiz"
          values={ticketContent}
          onChange={onContentChange}
        />
      )}
    </div>
  );
};
