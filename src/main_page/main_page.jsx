import "./main_page.css"
import Header from "./header/header"; 
import Sidebar from "./sidebar/sidebar";
import Main from "./main/main";

function MainPage() {
  return (
    <>
      <div className = 'main'>
        <Header></Header>
        <div className="row">
          <Sidebar></Sidebar>
          <Main></Main>
        </div>
        
      </div>
    </>
  );
}



export default MainPage;
