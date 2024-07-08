import { useQuery } from "@tanstack/react-query";
import { Link, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { fetchList } from "../api";
import { Helmet } from "react-helmet";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ConisList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.textColor};
  margin-bottom: 10px;

  border-radius: 15px;
  a {
    display: flex;
    align-items: center;
    transition: color 0.2s ease-in;
    padding: 20px;
  }

  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const IconImg = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

function Coins() {
  /* const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await axios("https://api.coinpaprika.com/v1/coins");
      setCoins(res.data.slice(0, 100));
      setLoading(false);
    })();
  }, []); */
  const { isLoading, data } = useQuery(["allList"], fetchList);
  //const { toggleDark } = useOutletContext();
  const toggleDark = useSetRecoilState(isDarkAtom);
  return (
    <Container>
      <Helmet>
        <title>Coin</title>
      </Helmet>
      <Header>
        <Title>Coin</Title>
        <button onClick={() => toggleDark((prev) => !prev)}>Toggle Mode</button>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <ConisList>
          {data.map((coin) => (
            <Coin key={coin.id}>
              <Link to={`coin/${coin.id}`} state={{ name: coin.name }}>
                <IconImg
                  src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                />
                {coin.name} &larr;
              </Link>
            </Coin>
          ))}
        </ConisList>
      )}
    </Container>
  );
}
export default Coins;
