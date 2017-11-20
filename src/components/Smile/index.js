import React from 'react';
import {Image} from 'react-bootstrap'
import Victory from './img/smiles/happy-6.png'
import Standard from './img/smiles/happy-4.png'
import Waiting from './img/smiles/shocked-1.png'

const Smile = ({victory, waitingForPair}) =>
    (<div>
        {victory && <Image src={Victory} alt="Victory" responsive/>}

        {waitingForPair && <Image src={Waiting} alt="Waiting" responsive/>}

        {(!waitingForPair && !victory) && <Image src={Standard} alt="Standard" responsive/>}

    </div>);

export default Smile;