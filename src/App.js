import { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Album from "./Albums";
import Home from "./Home";
import Navbar from "./Navbars";
import Newalbum from "./NewAlbum";
import UpdateAlbum from "./UpdateAlbum";
function App() {
  const [albums, setAlbums] = useState([]);
  useEffect(() => {
    getAlbums();
  }, []);

  useEffect(() => {
    console.log(
      albums.sort((a, b) => a.id - b.id),
      "albums"
    );
  });

  const getAlbums = () => {
    fetch("https://jsonplaceholder.typicode.com/albums").then((result) => {
      result.json().then((resp) => {
        setAlbums(resp);
      });
    });
  };

  const handleChangeAlbum = (updatedAlbums) => {
    setAlbums(updatedAlbums);
  };

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/album">
          <Album albums={albums} handleChangeAlbum={handleChangeAlbum} />
        </Route>

        <Route exact path="/newalbum">
          <Newalbum albums={albums} handleChangeAlbum={handleChangeAlbum} />
        </Route>

        <Route exact path="/album/:id">
          <UpdateAlbum albums={albums} handleChangeAlbum={handleChangeAlbum} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
