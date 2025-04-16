import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { store } from "./store/store";
import Experience from "./components/Experience";
import PersonalInfo from "./components/Personalnfo";
import Education from "./components/Education";
import Skills from "./components/Skills";
import References from "./components/References";
import Summary from "./components/Summary";
import FormLayout from "./components/FormLayout";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <FormLayout>
          <Routes>
            <Route path="/" element={<PersonalInfo />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/education" element={<Education />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/references" element={<References />} />
            <Route path="/summary" element={<Summary />} />
          </Routes>
        </FormLayout>
      </Router>
    </Provider>
  );
}

export default App;
