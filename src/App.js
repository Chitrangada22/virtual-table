import './App.css';
import 'react-virtualized/styles.css';

import { Column, Table } from 'react-virtualized';
import React, { useEffect, useState } from 'react';

import axios from 'axios';

function App() {
  const [showTable, setShowTable] = useState(false);
  const [data, setData] = useState([]);
  const url = 'http://universities.hipolabs.com/search?country=United+States';

  const fetchInfo = () => {
    return axios.get(url).then((res) => setData(res.data));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleClick = async () => {
    console.log(data);
    !!data && setShowTable(true);
  }

  return (
    <div className="App">
      <button
        className="App-link"
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
      >
        Load Universities
      </button>
      {showTable && !!data &&
      <div className='VirtualizedTable'>
        <Table
          className='table-css'
          width={500}
          height={1000}
          headerHeight={50}
          rowHeight={100}
          rowCount={data.length}
          rowGetter={({ index }) => data[index]}
        >
          <Column
            width={200}
            label='Name of University'
            dataKey='name'
          />
          <Column
            label='Country'
            dataKey='country'
            width={200}
          />

        </Table>
        </div>}

    </div>
  );
}

export default App;
