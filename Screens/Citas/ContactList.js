import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator} from 'react-native';
import {SearchBar } from 'react-native-elements'
// import ArticuloRow from './ArticuloRow'
// import { connect } from 'react-redux';
// import * as articuloAction from '../../reduxStore/actions/articulo'
import {API_URL_GRAL} from '../../Constantes/constants'

class ArticuloList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      error: null,
      name: '',
      value:''
    };
    
    this.arrayholder = [];     
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  componentDidUpdate()
  {
  }

  makeRemoteRequest = async () => {
    // const url = `${API_URL_GRAL}GetAppArticulos?TipoConsulta=1&ArticuloBusqueda=`
    // this.setState({ loading: true });
    
    // fetch(url)
    //   .then(res => res.json())
    //   .then(res => {
    //     this.setState({
    //       data: res,
    //       loading: false,
          
    //     });
        

    //     this.arrayholder = res;
    //     this.props.loadArticulos(this.state.data)
    //   })
    //   .catch(error => {
    //     this.setState({ error, loading: false });
    //   });
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  searchFilterFunction = text => {
    // this.setState({
    //   value: text,
    // });
    // const url = `${API_URL}GetAppArticulos?TipoConsulta=1&ArticuloBusqueda=` + text
    // fetch(url)
    //   .then(res => res.json())
    //   .then(res => {
        

    //     this.setState({
    //       data: res,
    //       loading: false,
    //     });

    //     this.arrayholder = res;
    //     // this.props.loadArticulos(this.state.data)
    //   })
    //   .catch(error => {
    //     this.setState({ error, loading: false });
    //   });
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
 
      <View style={{ flex: 1 }}>

        <SearchBar
          placeholder="Codigo - Articulo..."
          lightTheme
          round
          //onChangeText={text => this.searchFilterFunction(text)}
          autoCorrect={false}
          value={this.state.value}
          blurOnSubmit={false}
          
        />
        {/* <FlatList
          data={this.state.data}
          renderItem={({ item, index }) => (
            <ArticuloRow index={index} navigation={this.props.navigation} articuloRow={item} />
          )}
          keyExtractor={item => item.title}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          blurOnSubmit={false}
          keyboardShouldPersistTaps='handled'
        /> */}
      </View>
    );
  }
}

// const mapStateToProps = (state, ownProps) => {
//   return {
//     user: state.user,
//     articulos: state.articulo.articulos,
//     articulo: state.articulo.articulo,
//   }
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     loadArticulos: articulos => dispatch(articuloAction.loadArticulos(articulos)),
//     selectArticulo: articulo => dispatch(articuloAction.selectArticulo(articulo)),
//   }
// };

export default ArticuloList
//connect(mapStateToProps, mapDispatchToProps)(ArticuloList);