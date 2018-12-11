import React from 'react';

function ImageComponent({ component }) {
  return <img src={component.imageData} alt={component.title} />;
}

export default ImageComponent;
