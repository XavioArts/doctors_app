import StringifyJson from "./StringifyJson";

const List = ({ data, name, renderData }) => {
  return (
    <div style={{ border: "1px solid black", margin: "10px" }}>
      {name && <h3>{name}</h3>}
      {!renderData && <StringifyJson json={data} />}
      {renderData && data.map(renderData)}
    </div>
  );
};

export default List;
