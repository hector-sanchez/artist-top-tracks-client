import React, {Component} from 'react';

import Layout from './components/Layout/Layout';
import ArtistTopTrackRequestForm from './containers/ArtistTopTrackRequestForm/ArtistTopTrackRequestForm';

class App extends Component {
  render() {
    return (
      <Layout>
        <ArtistTopTrackRequestForm />
      </Layout>
    );
  }
}

export default App;
