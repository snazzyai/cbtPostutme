import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ActivationScreenHeader from "../components/ActivationScreenHeader/ActivationScreenHeader"


class ActivationScreenOne extends Component {
    state = {}
    render() {
        return (
            <View>
                <ActivationScreenHeader processNumber={"One"} />
                <View>
                    <Text>Question</Text>
                </View>
            </View>

        );
    }
}

export default ActivationScreenOne;