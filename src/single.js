import React from "react";

const Single = ({ ca }) => {
  console.log(ca[0]);
  const result = (ca) =>
    ca.map((item) => <h4 key={index}>{item.birthday}</h4>);

  return (
    <div>
      <h1>i am single</h1>
    </div>
  );
};
export default Single;
