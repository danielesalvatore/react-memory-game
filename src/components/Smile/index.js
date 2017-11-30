import React from 'react';
import {Image} from 'react-bootstrap'
import PropTypes from 'prop-types';
import Victory from './img/smiles/happy-6.png'
import Standard from './img/smiles/happy-4.png'
import Waiting from './img/smiles/shocked-1.png'
import Looking from './img/smiles/looking.png'

const Smile = ({victory, matchIsStarted, waitingForPair}) =>
    (<div>

        {!matchIsStarted && <Image src={Looking} alt="Victory" responsive/>}

        {victory && <Image src={Victory} alt="Victory" responsive/>}

        {waitingForPair && <Image src={Waiting} alt="Waiting" responsive/>}

        {(!waitingForPair && !victory && matchIsStarted) && <Image src={Standard} alt="Standard" responsive/>}

    </div>);

Smile.propTypes = {
    victory: PropTypes.bool.isRequired,
    waitingForPair: PropTypes.bool,
    matchIsStarted: PropTypes.bool
};

export default Smile;