import React from "react";
import "./style.css";
import "antd/dist/antd.css";
import { Table, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import Header from "./header.js";
const url = "https://breakingbadapi.com/api/characters";

class App extends React.Component {
  state = {
    searchText: "",
    searchedColumn: "",
    data: "",
    loading: "true",
    sortedInfo: null,
  };

  fetchAPI = () => {
    this.setState({ loading: true });
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        this.setState({ data: result });
        this.setState({ loading: false });
      })
      .catch((exception) => {
        console.log(exception);
        this.setState({ loading: false });
      });
  };

  componentDidMount() {
    this.fetchAPI();
  }

  handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    this.setState({
      // filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              this.handleSearch(selectedKeys, confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{ color: filtered ? "#1890ff" : undefined }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    let { sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};

    if (this.state.loading) {
      console.log("loading");
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
        sorter: (a, b) => a.char_id - b.char_id,
        sortOrder:
          sortedInfo.columnKey === "char_id" && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: "img",
        dataIndex: "img",
        render: (img) => (
          <img
            src={img}
            alt="Default name"
            height={100}
            width={100}
          />
        ),
        key: "img",
      },

      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "30%",
        ...this.getColumnSearchProps("name"),
      },

      {
        title: "birthday",
        dataIndex: "birthday",
        key: "birthday",
        render: function () {
          return Math.floor(Math.random() * 100);
        },
        sorter: (a, b) => a.birthday - b.birthday,
        sortOrder:
          sortedInfo.columnKey === "birthday" && sortedInfo.order,
        ellipsis: true,
      },

      {
        title: "occupation",
        dataIndex: "occupation",
        render: (occupation) =>
          occupation.map((name, index) => (
            <h4 key={index}>{name}</h4>
          )),
        key: "occupation",
        width: "30%",

        ...this.getColumnSearchProps("occupation"),
      },
    ];

    return (
      <>
        <Header />
        <Table
          rowKey={(record) => record.char_id}
          columns={columns}
          dataSource={this.state.data}
          onChange={this.handleChange}
        />
        ;
      </>
    );
  }
}

export default App;
