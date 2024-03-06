
import { AppProvider } from "@/_components/AppContext";
import { Ratings } from "@/_components/Ratings";
import { ToastContainer  } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
export default function Home() 
{
  return (
    <AppProvider>
      <ToastContainer position="top-center" />
      <main className="h-screen flex justify-center items-center">
      <Ratings/>
    </main>
    </AppProvider>
  );
}
