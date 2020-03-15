import React, { Component } from 'react';

const CatContext = React.createContext();

class CatProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            name: '',
            age: 0,
            description: '',
            locationFound: '',
            image: '',
            imageName: ''
        }
    }

    loadCat(id){

    }

    updateCat(){

    }

    render() {
        const { children } = this.props;
        return (
            <CatContext.Provider
                value={{
                    loadCat: this.loadCat,
                    updateCat: this.updateCat,
                    ...this.state,
                }}
            >
                {children}
            </CatContext.Provider>
        );
    }
}

export const withContext = Component => {
    return props => {
        return (
            <CatContext.Consumer>
                {globalState => {
                    return <Component {...globalState} {...props} />;
                }}
            </CatContext.Consumer>
        );
    };
};

const CatConsumer = CatContext.Consumer;

export { CatProvider, CatConsumer, CatContext };
