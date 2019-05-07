import React, { Component } from 'react';
import { View, Text } from 'react-native';


class ShowAlert extends Component {
    state = {
        open: true
    }

    componentDidMount() {
        this.onTimeout()
    }

    onTimeout = async () => {
        await setTimeout(() => this.setState({ open: false }), 4000)
    }
    render() {
        if (this.state.open) {
            return (
                <View key={this.props.mainkey}>
                    <Text style={{ color: "#b73131", fontSize: 18 }}>{this.props.ErrorMessage}</Text>
                </View>
            );
        }
        return false

    }


}


export default ShowAlert