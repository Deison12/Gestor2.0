import React from 'react'

const TablaTerceros =() =>{

  return (
    <div>
        {/* <!-- Table--> */}
    <div className="table-responsive container mt-5">
      <table className="table">
        <thead>
            <tr className='text-center'>
            <th scope="col">#</th>
            <th scope="col">Nit</th>
            <th scope="col">Nombre Cliente</th>
            <th scope="col">Direccion</th>
            <th scope="col">Ciudad</th>
            <th scope="col">Telefono</th>
            <th scope="col">Contacto</th>
            <th scope="col">Correo</th>
            <th scope="col">Comentarios</th>
            </tr>
        </thead>
        <tbody>
              <tr className='text-center'>
                <td>1</td>
                <td>12345</td>
                <td>Carlos Cifuentes</td>
                <td>CR 89 # 123-89</td>
                <td>Bogotá</td>
                <td>311123456</td>
                <td>Juan Perez</td>
                <td>Carlos_Cifuentes@gamil.com</td>
                <td>blablabla</td>
                
              </tr>
              <tr className='text-center'>
                <td>2</td>
                <td>23456</td>
                <td>Gildegart Ceballos</td>
                <td>Calle 67bis sur # 16-01</td>
                <td>Soacha</td>
                <td>380123456</td>
                <td>Tulia Alvarez</td>
                <td>Gil_Ceba@gamil.com</td>
                <td>blablabla2</td>
                
              </tr>
            
        </tbody>
        </table>
    </div>
    </div>
  )
}

export default TablaTerceros