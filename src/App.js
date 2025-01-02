import React, { useEffect, useState } from 'react';
import FamilyTree from './familytree/mytree';
import { getAllData } from './db/user';

const App = () => {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllData();
        console.log('Fetched nodes:', data); // Kiểm tra dữ liệu
        setNodes(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Gọi hàm fetchData trong useEffect
  }, []); // Empty dependency array, chạy chỉ 1 lần component mounted

  if (!nodes || nodes.length === 0) {
    return <div>Đang tải...</div>;
  }
  console.log(nodes,'nodes');
  

  return (
    <div style={{ height: '100%' }}>
      <FamilyTree nodes={nodes} />
    </div>
  );
};

export default App;
