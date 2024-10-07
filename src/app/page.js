"use client"
import Header from "./components/Header";
import OrderUs from "./components/OrderUs";
import { ThemeProvider } from '@mui/material/styles'; // Use Material-UI's ThemeProvider
import theme from './styles/theme';
import CarouselComponent from "./components/FeaturedPizza";
import RestaurantSlider from "./components/RestaurantSlider";
import PizzaGrid from "./components/PizzaCard";
import PizzaSlider from "./components/PizzaSlider";
import Feedback from "./components/Feedback";
import Footer from "./components/Footer";
import { toast } from "react-hot-toast";

export default function Home() {
  // const showToast = () => {
  //   toast.success("This is a success message!"); 
  // }
  return (
    <ThemeProvider theme={theme}>  
      <div
        style={{
          background: "linear-gradient(to bottom, white, #eb8934,white,rgba(252,176,69,0.42),white,rgba(252,176,69,0.42), white,rgba(252,176,69,0.42),white)",
          minHeight: "100vh", // Ensures the gradient fills the full height of the page
          display:"flex",
          flexDirection:"column",
          justifyContent:"space-evenly"
        }}
      >
        <Header />
        <OrderUs />
        <div style={{ display: 'flex', justifyContent: "center", width: "100%"}}>
          <CarouselComponent />
        </div>
        <div style={{ display: 'flex', justifyContent: "center", width: "100%",marginTop:"50px"}}>
        <RestaurantSlider/>
        </div>
        <div style={{ display: 'flex', justifyContent: "center", width: "100%",marginTop:"50px"}}>
        <PizzaGrid/>
        </div>
        <div style={{ display: 'flex', justifyContent: "center", width: "100%",marginTop:"50px"}}>

        <PizzaSlider/>
        </div>
        {/* <button onClick={showToast}>ff</button> */}
        <Feedback/>
        <Footer/>
      </div>
    </ThemeProvider>
  );
} 