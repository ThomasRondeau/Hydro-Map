import React, { useState } from 'react';
import HeaderComp from './HeaderComp'; 

function HomePage() {
    const [pageStatus, setPageStatus] = useState(1);

    const changePageStatus = (newStatus) => {
        setPageStatus(newStatus);
    };

    return (
        <div>
            <h2>Hydro Map</h2>
            <HeaderComp onPageChange={changePageStatus} />
            <h2>Contenu de la page d'accueil</h2>
        </div>
    );
}

export default HomePage;
