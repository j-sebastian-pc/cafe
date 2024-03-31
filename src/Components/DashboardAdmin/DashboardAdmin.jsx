// // Dashboard.js
// import React from 'react';
// import Sidebar from './Sidebar';
// import Topbar from './Topbar';
// import CafeTable from './CafeTable';
// import "./styles.css"

// function DashboardAdmin() {
//   return (
//     <div className="book1">
//     <div className="dashboard">
//       <Sidebar />
//       <div id="content-wrapper" className="d-flex flex-column">
//         <div id="content">
//           <Topbar />
//           <div className="container-fluid">
//             <CafeTable />
//           </div>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// }

// export default DashboardAdmin;

//
// DashboardAdmin.js USANDO TABLAS

// import React, { useState } from 'react';
// import Sidebar from './Sidebar';
// import Topbar from './Topbar';
// import CafeTable from './CafeTable';
// import CafeForm from './CafeForm';
// import "./styles.css"

// function DashboardAdmin() {
//   const [cafes, setCafes] = useState([
//     { id: 1, name: "Garden Cafe y Chocolate", location: "centro de armenia", description:"test a"},
//     { id: 2, name: "Cafe 1760", location: "Calarca", description:"test b"},
//     { id: 3, name: "Cafe Sorrento", location: "Calarca", description:"test c" },
//     // Agrega más datos según sea necesario
//   ]);
  

//   const handleAddCafe = (newCafe) => {
//     setCafes([...cafes, { id: Date.now(), ...newCafe }]);
//   };

//   const handleEditCafe = (editedCafe) => {
//     const updatedCafes = cafes.map((cafe) =>
//       cafe.id === editedCafe.id ? { ...cafe, ...editedCafe } : cafe
//     );
//     setCafes(updatedCafes);
//   };

//   const handleDeleteCafe = (id) => {
//     const updatedCafes = cafes.filter((cafe) => cafe.id !== id);
//     setCafes(updatedCafes);
//   };

//   return (
//     <div className="book1">
//       <div className="dashboard">
//         {/* <Sidebar /> */}
//         <div id="content-wrapper" className="d-flex flex-column">
//           <div id="content">
//             {/* <Topbar /> */}
//             <div className="container-fluid">
//               <CafeForm onSubmit={handleAddCafe} />
//               <CafeTable
//                 cafes={cafes}
//                 onEditCafe={handleEditCafe}
//                 onDeleteCafe={handleDeleteCafe}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DashboardAdmin;
import { useState, useEffect } from 'react';
import CafeTable from './CafeTable';
import CafeForm from './CafeForm';

const API_BASE_URL = 'http://localhost:8080/tuCafe/v1';

function DashboardAdmin() {
  const [cafes, setCafes] = useState([]);

  useEffect(() => {
    fetchCafes();
  }, []);

  const fetchCafes = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/client/listBusiness`);
      if (!response.ok) {
        throw new Error('Hubo un error al obtener los datos de los cafés.');
      }
      const data = await response.json();
      setCafes(data);
    } catch (error) {
      console.error('Error al obtener los cafés:', error);
    }
  };

  const handleAddCafe = async (newCafe) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/changeStatus/${newCafe.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCafe),
      });
      if (!response.ok) {
        throw new Error('Hubo un error al agregar el café.');
      }
      fetchCafes();
    } catch (error) {
      console.error('Error al agregar el café:', error);
    }
  };

  const handleEditCafe = async (editedCafe) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/editCafe/${editedCafe.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedCafe),
      });
      if (!response.ok) {
        throw new Error('Hubo un error al editar el café.');
      }
      fetchCafes();
    } catch (error) {
      console.error('Error al editar el café:', error);
    }
  };

  const handleDeleteCafe = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/deleteCafe/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Hubo un error al eliminar el café.');
      }
      fetchCafes();
    } catch (error) {
      console.error('Error al eliminar el café:', error);
    }
  };

  return (
    <div>
      <div>
        {/* <CafeForm onSubmit={handleAddCafe} /> */}
        <CafeTable
          cafes={cafes}
          onEditCafe={handleEditCafe}
          onDeleteCafe={handleDeleteCafe}
        />
      </div>
    </div>
  );
}

export default DashboardAdmin;
