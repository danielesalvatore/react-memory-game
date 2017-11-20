import React from 'react';
import {Button, Glyphicon} from 'react-bootstrap'
// import moment from 'moment'

const Toolbar = ({onRestart, status}) =>
    ( <div className="center-block">

        <Button onClick={onRestart} className="center-block">

            <Glyphicon glyph=" glyphicon glyphicon-refresh" />
        </Button>

    </div>);

export default Toolbar;

