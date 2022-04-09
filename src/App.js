import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import { animals } from "./data/animals";
import React from "react";

class App extends React.Component {
  state = {
    search: "",
  };

  changeHandler = (event) => {
    this.setState({
      search: event.target.value,
    });
  };

  render() {
    return (
      <Router>
        <div>
          <main>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route
                path="/animals"
                element={<AnimalList search={this.state.search} />}
              />
              <Route path="/animals/:animalName" element={<SingleAnimal />} />
              {/* <Route path="/about" element={<About />} /> */}
            </Routes>
          </main>
        </div>
      </Router>
    );
  }
}

const Home = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/animals">Animals</Link>
          </li>
        </ul>
      </nav>
      <h1>Welcome Home</h1>
      
    </div>
  );
};

class AnimalList extends React.Component {
  render() {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/animals">Animals</Link>
            </li>
          </ul>
        </nav>
        <div className="card-list">
          {this.props.search === ""
            ? animals.map((animal) => (
                <AnimalCard key={animal.name} name={animal.name} />
              ))
            : animals.filter((animal) =>
                animal.name
                  .toLowerCase()
                  .includes(this.props.search.toLowerCase())
                  .map((item) => (
                    <AnimalCard name={item.name} key={item.name} />
                  ))
              )}
        </div>
      </div>
    );
  }
}

const AnimalCard = (props) => {
  return (
    <div className="card">
      <h2>{props.name}</h2>
      <img
        src={`https://source.unsplash.com/1600x900/?${props.name}`}
        alt="animal"
      />
      <Link to={`/animals/${props.name}`}>Read more</Link>
    </div>
  );
};

const SingleAnimal = () => {
  let { animalName } = useParams();
  let navigate = useNavigate();
  const handleClick = () => {
    navigate("/animals");
  };
  return (
    <div className="cardContainerHolder">
      <div className="cardContainer">
        <div className="card">
          <h2>{animalName}</h2>
          <img
            src={`https://source.unsplash.com/1600x900/?${animalName}`}
            alt="animal"
          />
        </div>
        <button onClick={handleClick}>Go Back</button>
      </div>
    </div>
  );
};

export default App;
