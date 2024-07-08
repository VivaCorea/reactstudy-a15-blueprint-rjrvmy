import { useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Link,
  matchPath,
  Outlet,
  useLocation,
  useMatch,
  useOutletContext,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { fetchItemInfo, fetchItemTickers } from "../api";
import { Helmet } from "react-helmet";

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

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;
function Coin() {
  const { coinId } = useParams();
  const priceMatch = useMatch("coin/:coinId/price");
  const chartMatch = useMatch("coin/:coinId/chart");
  const { state } = useLocation();
  const { isLoading: infoLoading, data: infoData } = useQuery(
    ["info", coinId],
    () => fetchItemInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery(
    ["tickers", coinId],
    () => fetchItemTickers(coinId)
  );
  /*   const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({});
  const [price, setPrice] = useState({});

  useEffect(() => {
    (async () => {
      const infoData = await axios(
        `https://api.coinpaprika.com/v1/coins/${coinId}`
      );
      const priceData = await axios(
        `https://api.coinpaprika.com/v1/tickers/${coinId}`
      );
      //console.log("infoData", infoData.data);
      //console.log("priceData", priceData.data);
      setInfo(infoData.data);
      setPrice(priceData.data);
      setLoading(false);
    })();
  }, [coinId]);
 */
  const loading = infoLoading || tickersLoading;
  const info = infoData;
  const price = tickersData;
  //const ctx = useOutletContext();
  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading..." : info?.name}
        </title>
      </Helmet>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : info?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${info?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{info?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>
          <Description>{info?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{price?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{price?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`price`}>Price</Link>
            </Tab>
            <Outlet />
          </Tabs>
        </>
      )}
    </Container>
  );
}
export default Coin;
