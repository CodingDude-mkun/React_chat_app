import MessageContainer from "../../Components/Messages/MessageContainer";
import Sidebar from "../../Components/sidebar/sidebar";

function Home() {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg bg-clip-padding bg-gray-400 overflow-hidden backdrop-blur-lg bg-opacity-15">
      <Sidebar />
      <MessageContainer />
    </div>
  );
}

export default Home;
