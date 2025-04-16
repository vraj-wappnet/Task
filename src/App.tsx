import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { store } from "./store/store";
import Experience from "./components/pages/Experience";
import PersonalInfo from "./components/pages/Personalnfo";
import Education from "./components/pages/Education";
import Skills from "./components/pages/Skills";
import References from "./components/pages/References";
import Summary from "./components/pages/Summary";
import FormLayout from "./components/layout/FormLayout";

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
