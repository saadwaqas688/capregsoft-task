import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
// import { SingleImg } from "./singleimg";
import { Table } from "antd";
const url = "https://breakingbadapi.com/api/characters";
function App() {
  const [loading, setLoading] = useState(true);

  const [ca, setCa] = useState([]);

  const fetchCa = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const result = await response.json();
      // setLoading(false);
      setCa(result);
      // console.log(result[0]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCa();
  }, []);

  if (loading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  const columns = [
    {
      title: "char_id",
      dataIndex: "char_id",
      key: "char_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "birthday",
      dataIndex: "birthday",
      key: "birthday",
    },

    {
      title: "occupation",
      dataIndex: "occupation",
      render: (occupation) =>
        occupation.map((name, index) => <h4 key={index}>{name}</h4>),
      key: "occupation",
    },
    {
      title: "img",
      dataIndex: "img",
      render: (img) => (
        <img src={img} alt="Default name" height={100} width={100} />
      ),
      key: "img",
    },
    {
      title: "status",
      dataIndex: "status",

      key: "status",
    },
    {
      title: "nickname",
      dataIndex: "nickname",

      key: "nickname",
    },
    {
      title: "appearance",
      dataIndex: "appearance",
      render: (appearance) =>
        appearance.map((name, index) => <h4 key={index}>{name}</h4>),
      key: "appearance",
    },
    {
      title: "portrayed",
      dataIndex: "portrayed",

      key: "portrayed",
    },
    {
      title: "category",
      dataIndex: "category",

      key: "category",
    },
    {
      title: "better_call_saul_appearance",
      dataIndex: "better_call_saul_appearance",
      render: (better_call_saul_appearance) => {
        if (better_call_saul_appearance.length === 0) {
          return <h4>nill</h4>;
        } else {
          const result = better_call_saul_appearance.map(
            (name, index) => <h4 key={index}>{name}</h4>
          );
          return result;
        }
      },

      key: "better_call_saul_appearance",
    },
  ];

  return (
    <div>
      {/* <SingleImg ca={ca} /> */}
      <Table dataSource={ca} columns={columns} />;
    </div>
  );
}

export default App;
