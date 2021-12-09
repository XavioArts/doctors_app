const StringifyJson = ({ json }) => {
  return (
    <div
      style={{ background: "#dddddd", padding: "10px", borderRadius: "10px" }}
    >
      <code>{JSON.stringify(json)}</code>
    </div>
  );
};

export default StringifyJson;
