import FlashCards from "../components/FlashCards/FlashCards"
import EditCard from "../components/EditCard/EditCard"
import FlashDecks from "../components/FlashDecks/FlashDecks"
import Login from "../components/Login/Login"
import Register from "../components/Signup/Register"
export let dashboardRoutes = [
    // {
    //   path: "/dashboard",
    //   name: "Dashboard",
    //   component: Dashboard
    // },
      {
        path: "/flash-decks",
        name: "FlashDecks",
        component: FlashDecks
      },
      {
        path: "/edit-card",
        name: "Edit Card",
        component: EditCard
      },
      {
        path: "/flash-cards",
        name: "Flash Cards",
        component: FlashCards
      },
      {
        path: "/login",
        name: "login",
        component: Login
      },
      {
        path: "/signup",
        name: "signup",
        component: Register
      }
];