import { useOutletContext } from "react-router-dom";

function Chart() {
  const { dark } = useOutletContext();
  return <h1>Chart and This mode is {dark ? "dark" : "light"}</h1>;
}
export default Chart;
