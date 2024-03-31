import React from 'react';

function CafeTable({ cafes, onEditCafe, onDeleteCafe }) {
  return (
    <section className="menu" id="menu">
      <h1 className="heading-admin">Lista de Cafés</h1>
      <div className="box-container">
        {cafes.map(cafe => (
          <div className="box" key={cafe.id}>
            <div className="content">
              <h3>{cafe.name}</h3>
              {/* Asegúrate de manejar correctamente las imágenes */}
              <div className="image-gallery">
                <img src={cafe.image} alt={cafe.name} />
              </div>
              <p>{cafe.description}</p>
              <p>Ubicación: {cafe.address}</p>
              <div className="btn-group">
                {/* Usa nombres de botones que reflejen claramente su función */}
                <button className='btn-perfil' onClick={() => onEditCafe(cafe)}>Activar</button>
                <button className='btn-perfil' onClick={() => onDeleteCafe(cafe.id)}>Desactivar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CafeTable;
