import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';




class PastQuestions extends Component {
    state = {
        schools: [
            {
                id: 1,
                typeName: "WAEC",
                imageSource: require("../../assets/images/unilag.png"),
                fullTypeName: "University of Lagos PostUtme"

            },
            {
                id: 2,
                typeName: "POSTUTME",
                imageSource: require("../../assets/images/unilag.png"),
                fullTypeName: "University of Lagos PostUtme"
            },
            {
                id: 3,
                typeName: "UNILAG",
                imageSource: require("../../assets/images/unilag.png"),
                fullTypeName: "University of Lagos PostUtme"
            },
            {
                id: 4,
                typeName: "UNILAG",
                imageSource: require("../../assets/images/unilag.png"),
                fullTypeName: "University of Lagos PostUtme"
            },
            {
                id: 5,
                typeName: "UNILAG",
                imageSource: require("../../assets/images/unilag.png"),
                fullTypeName: "University of Lagos PostUtme"
            },
            {
                id: 6,
                typeName: "UNILAG",
                imageSource: require("../../assets/images/unilag.png"),
                fullTypeName: "University of Lagos PostUtme"
            },

        ]

    }

    onSelectType = (id, type) => {

        this.props.navigation.navigate('Payment', {
            id: id,
            type: type
        })

    }

    searchFilter = () => {

    }

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.searchBarView}>
                    <TextInput style={styles.searchBarInput} placeholder="search..." onChangeText={this.searchFilter} />
                </View>
                <View style={styles.scrollView}>
                    <ScrollView keyboardShouldPersistTaps='always'>
                        {this.state.schools.map(type => (
                            <TouchableOpacity style={styles.typesView} onPress={() => this.props.navigation.navigate('Payment')} >
                                <View style={styles.imageView}>
                                    <Image source={type.imageSource} style={styles.image} />
                                </View>
                                <View style={styles.detailsView}>
                                    <Text>{type.typeName}</Text>
                                    <Text style={styles.fullTypeName}>{type.fullTypeName}</Text>
                                </View>
                            </TouchableOpacity>
                        ))
                        }
                    </ScrollView>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    searchBarView: {
        justifyContent: "center",
        width: "90%",
        height: 45,
        borderRadius: 10,
        elevation: 3,
        paddingLeft: wp("8%"),
        marginTop: hp('8%')
    },
    searchBarInput: {
        fontSize: 18,
        paddingTop: 10,
        color: "#000000"
    },
    imageView: {
        borderRadius: 50,
    },
    image: {
        height: 70,
        width: 70,
        borderRadius: 50,
        backgroundColor: "blue"

    },
    scrollView: {
        padding: 20
    },
    detailsView: {
        paddingLeft: 20
    },
    typesView: {
        flexDirection: "row",
        padding: 20,
        margin: 10,
        backgroundColor: 'green'
    },
    fullTypeName: {
        paddingTop: 10
    }

})

export default PastQuestions;