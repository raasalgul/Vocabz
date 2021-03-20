import FlashCards from "../components/FlashCards/FlashCards"
import EditCard from "../components/EditCard/EditCard"
import FlashDecks from "../components/FlashDecks/FlashDecks"
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
      }
];