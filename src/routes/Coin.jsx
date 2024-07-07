import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;
function Coin() {
  const { coinId } = useParams();
  const [loading, setLoading] = useState(true);
  const { state } = useLocation();

  const [info, setInfo] = useState({});
  const [price, setPrice] = useState({});
  console.log(state);
  useEffect(() => {
    (async () => {
      const infoData = await axios(
        `https://api.coinpaprika.com/v1/coins/${coinId}`
      );
      console.log(infoData.data);
      const priceData = await axios(
        `https://api.coinpaprika.com/v1/tickers/${coinId}`
      );
      console.log(priceData.data);
      setInfo(infoData.data);
      setPrice(priceData.data);
      setLoading(false);
    })();
  }, []);
  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading..."}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : <span>{info}</span>}
    </Container>
  );
}
export default Coin;
