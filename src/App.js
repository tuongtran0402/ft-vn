import React, { useEffect, useState } from 'react';
import FamilyTree from './familytree/mytree';
import { getAllData } from './db/user';
import Loading from './container/loading';

const App = () => {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllData();
        console.log('Fetched nodes:', data);
        setNodes(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!nodes || nodes.length === 0) {
    return <div><Loading /></div>;
  }
  console.log(nodes,'nodes');
  

  return (
    <div style={{ height: '100%' }}>
      <FamilyTree nodes={nodes} />
    </div>
  );
};

export default App;
