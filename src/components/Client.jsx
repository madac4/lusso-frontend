import React from 'react';

const Client = ({ client }) => {
    const images = client.images;
    const imagesArr = [];
    const totalImages = 5;

    for (let i = 0; i < totalImages; i++) {
        const image = images[i];

        if (image === undefined) {
            imagesArr.push(<span key={i} className="empty"></span>);
        } else {
            imagesArr.push(<img key={i} src={image} alt="client-img" />);
        }
    }

    return (
        <div className="clients-card">
            <h5>{client.name}</h5>
            <a href={client.instagramUrl} target="_blank" rel="noreferrer">
                <span className="clients-card__instagram">{client.instagram}</span>
            </a>
            <p>{client.description}</p>
            <div className="clients-card__images">{imagesArr}</div>
        </div>
    );
};

export default Client;
