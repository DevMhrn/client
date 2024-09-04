import React from 'react'
// import Quiz from './Quizes';
import { BrowserRouter, Routes, Route,Link  } from "react-router-dom";

function Home(){

    return(
        <div>
            Home
            {/* <Quiz/> */}
            {/* <Link>
                <Routes>
                    
                    <Route path="/quizzes" element={<Quiz />} />
                   
                </Routes>
            </Link> */}
            
        </div>
    )
}
export default Home;