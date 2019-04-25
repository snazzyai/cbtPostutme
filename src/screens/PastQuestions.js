import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native'



class PastQuestions extends Component {
    state = {
        searchInput: ""
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.searchBarView}>
                    <TextInput onChangeText={this.searchChange} placeholder="search" style={styles.searchBar} />
                </View>
                <View>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center"
    },
})
export default PastQuestions;