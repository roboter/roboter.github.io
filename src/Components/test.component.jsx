import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';
import {UncontrolledTooltip} from 'reactstrap';

const TestComponent = ()=>
<div>
    TestComponent
    <FontAwesomeIcon icon={faUserCircle}/>
    <div>Somewhere in here is a <div id="UncontrolledTooltipExample">tooltip</div>.</div>
      <UncontrolledTooltip placement="right" target="UncontrolledTooltipExample">
        Hello world!
      </UncontrolledTooltip>
</div>; 

export default TestComponent;




