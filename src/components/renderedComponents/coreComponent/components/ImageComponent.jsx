import React from 'react';

function ImageComponent({ component }) {
  return <img src={component.data} alt={component.name} />;
}

export default ImageComponent;
