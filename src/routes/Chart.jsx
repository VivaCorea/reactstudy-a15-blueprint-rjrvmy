import { useOutletContext } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

function Chart() {
  const dark = useRecoilValue(isDarkAtom);
  return <h1>Chart and This mode is {dark ? "dark" : "light"}</h1>;
}
export default Chart;
