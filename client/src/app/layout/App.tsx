import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import AboutPage from "../../features/about/AboutPage";
import CartPage from "../../features/cart/CartPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetail from "../../features/catalog/ProductDetail";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import agent from "../api/agent";
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../util/util";
import Header from "./Header";

function App() {
  const {setCart} = useStoreContext();

  useEffect(() => {
    const buyerId = getCookie('buyerId');
    if (buyerId) {
      agent.Cart.get()
        .then(cart => setCart(cart))
        .catch(error => console.log(error))
    }
  }, [setCart])

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#2a2a2a'
      }
    }
  })

  function handleThemeChange() {
    setDarkMode(!darkMode);
  } 

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
      <Container>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/catalog' component={Catalog}/>
        <Route path='/catalog/:id' component={ProductDetail}/>
        <Route path='/about' component={AboutPage}/>
        <Route path='/contact' component={ContactPage}/>
        <Route path='/cart' component={CartPage}/>
        <Route path='/checkout' component={CheckoutPage}/>
      </Container>
    </ThemeProvider>
  );
}

export default App;
