import React from 'react';
import { StyleSheet, View, Text } from 'react-native';


class ActivationScreenTwo extends Component {
    state = {}
    render() {
        return (
            <View>
                <ActivationScreenHeader processNumber={"Two"} />
                <View>
                    <Text>Question</Text>
                </View>
            </View>

        );
    }
}

export default ActivationScreenTwo;