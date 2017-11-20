import React from 'react';


const Header = ({victory, waitingForPair}) =>
    (<div>
        {victory && <h1>Victory!</h1>}

        {waitingForPair && <h1>One more please...</h1>}

    </div>);

export default Header;
