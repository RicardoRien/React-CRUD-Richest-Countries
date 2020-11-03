import React, { useState } from 'react';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Button, Table, Modal, ModalBody, ModalHeader, ModalFooter, FormGroup} from 'reactstrap';

function App() {
  // Source: https://knoema.com/sijweyg/world-gdp-per-capita-ranking-2019-data-and-charts
  // Data:
  const countryData = [
    { rank: 1, name: "Luxembourg", gdp: 113196.5 },
    { rank: 2, name: "Switzerland", gdp: 83716.8 },
    { rank: 3, name: "Macao", gdp: 81151.9 },
    { rank: 4, name: "Norway", gdp: 77975.4 },
    { rank: 5, name: "Ireland", gdp: 77771.2 },
    { rank: 6, name: "Qatar", gdp: 69687.7 },
    { rank: 7, name: "Iceland", gdp: 67037 },
    { rank: 8, name: "United States", gdp: 65112 }
  ];
  // States ~
  const [data, setData] = useState(countryData);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    rank: '',
    name: '',
    gdp: ''
  });
  // Funcions = () =>
  const selectCountry = (element, modify) => {
    setSelectedCountry(element);
    (modify === 'Edit') ? setModalEdit(true) : setModalDelete(true);  
  };

  const handleChange= (e) => {
    const {name, value} = e.target;
    setSelectedCountry((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Funcions => Insert, edit, delete & order
  const openModalInsert = () => {
    setSelectedCountry(null); // Cleaning state.
    setModalInsert(true);
  };

  const insert = () => {
    let insertValue = selectedCountry;
    let newData = data;
    newData.push(insertValue);
    setData(newData);
    setModalInsert(false);
  };

  const edit = () => {
    let newData = data;
    newData.forEach( (country) => {
      if(country.rank === selectedCountry.rank) {
        country.gdp = selectedCountry.gdp;
        country.name = selectedCountry.name;
      };
    });
    setData(newData);
    setModalEdit(false);
  };

  const deleteCountry = () => {
    setData(data.filter( (country) => country.rank !== selectedCountry.rank) );
    setModalDelete(false);
  };

  const updateRank = () => {
    let countryDataUpdate = [...data];
    countryDataUpdate.sort((a,b) => a.gdp < b.gdp ? 1 : -1)
    .map((value, index) => {
      value.rank = index + 1;
      return value;
    });
    setData(countryDataUpdate);
  };

  const orderName = () => {
    let countryNameUpdate = [...data];
    countryNameUpdate.sort((a, b) => { 
      return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
    });
    setData(countryNameUpdate);    
  };

  return (
    //  |-------------- Table --------------|  //
    <Container>
      <h1>The Richest Countries in the World by GDP per capita (2019).</h1>
      <br />
      <Button className="btn btn-success btn-lg" onClick={() => openModalInsert()}>Insert</Button>{'   '}
      <Button className="btn btn-warning btn-lg" onClick={() => updateRank()}>Update Rank</Button>{'   '}
      <Button className="btn-lg" style={{background:"purple", color: "white", borderColor:"purple"}} onClick={() => orderName()}>
        Order by Name
      </Button>
      <br /> <br />
      <Table className="table table-borderer">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Country</th>
            <th>GDP (per capita)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((element) => (
            <tr>
              <td>{element.rank}</td>
              <td>{element.name}</td>
              <td>{'$'}{element.gdp.toLocaleString('es')}</td>
              <td>                                 {/* Edit and delete buttons */}
                <button className="btn btn-primary" onClick={() =>selectCountry(element, 'Edit')}>Edit</button>{' '}
                <button className="btn btn-danger" onClick={() =>selectCountry(element, 'Delete')}>Delete</button>
              </td>
            </tr>
            ))
          }
        </tbody>
      </Table>
      {/* ----------------- Modal Window ----------------- */}

      {/* ~~~~~ Insert Country ~~~~~ */}
      <Modal isOpen={modalInsert}>
        <ModalHeader>
          <div><h3>Insert country</h3></div>
        </ModalHeader>

        <ModalBody>
          <div className="form-group">
            <label>Rank</label>
            <input
              className="form-control"
              type="number"
              name="rank"
              value={selectedCountry ? selectedCountry.rank : ''}
              onChange={handleChange}
            />
            <br />
            <label>Country</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={selectedCountry ? selectedCountry.name : ''}
              onChange={handleChange}
            />
            <br />
            <label>GDP (per capita)</label>
            <input
              className="form-control"
              type="number"
              name="gdp"
              value={selectedCountry ? selectedCountry.gdp : ''}
              onChange={handleChange}        
            />
            <br />
          </div>
        </ModalBody>

        <ModalFooter>
          <Button className="btn btn-primary" onClick={() => insert()}>Insert</Button>
          <Button className="btn btn-danger" onClick={() => setModalInsert(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      {/* ~~~~~~~ Edit Character ~~~~~~~ */}
      <Modal isOpen={modalEdit}>
        <ModalHeader>
          <div><h3>Edit Country</h3></div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Rank:</label>
            <input className="form-control"
              readOnly
              name="rank"
              type="number" 
              value={selectedCountry && selectedCountry.rank}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Country:</label>
            <input className="form-control"
              name="name"
              type="text"
              value={selectedCountry && selectedCountry.name}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>GDP:</label>
            <input className="form-control" 
              name="gdp" 
              type="number" 
              value={selectedCountry && selectedCountry.gdp}
              onChange={handleChange}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => edit()}>Update</Button>
          <Button color="secondary" onClick={() => setModalEdit(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>
      
      {/* ~~~~ Delete Country ~~~~ */ } 
      <Modal isOpen={modalDelete}>
        <ModalBody>
          Do you really want to delete {selectedCountry && selectedCountry.name} from the list?
        </ModalBody>

        <ModalFooter>
          <Button className="btn btn-danger" onClick={() => deleteCountry()}>Yes</Button>
          <Button className="btn btn-secondary" onClick={() => setModalDelete(false)}>No</Button>
        </ModalFooter>
      </Modal>
      
    </Container>
  )
}


export default App