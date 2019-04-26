import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ImageBackground } from 'react-native'
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

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <ImageBackground source={require('../../assets/images/background.jpg')} style={styles.topView}>
                        <View style={styles.textHeaderView}>
                            <Text style={styles.textHeader}>SELECT A CATEGORY</Text>
                        </View>
                        <View style={styles.searchBar}>
                            <TextInput style={styles.searchBarInput} placeholder="Search..." onChangeText={this.searchFilter} />
                        </View>
                    </ImageBackground>
                    <View style={styles.textCategoryView}>
                        <Text style={styles.textCategory}>CATEGORIES</Text>
                    </View>
                    {this.state.schools.map(type => (
                        <TouchableOpacity key={type.id} style={styles.typesView} onPress={() => this.props.navigation.navigate('Payment', {
                            id: type.id,
                            name: type.typeName
                        })} >
                            <View style={styles.imageView}>
                                <Image source={type.imageSource} style={styles.image} />
                            </View>
                            <View style={styles.detailsView}>
                                <Text style={styles.typeName}>{type.typeName}</Text>
                                <Text style={styles.fullTypeName}>{type.fullTypeName}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                    }
                </View>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f7f7f7"
    },
    topView: {
        height: 200,
        alignItems: "center",
        paddingTop: 20
    },
    textHeaderView: {
        padding: 30
    },
    textHeader: {
        color: "#ffffff",
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: 'sans-serif',
    },
    searchBar: {
        borderRadius: 20,
        width: "90%",
        height: 40,
        elevation: 3,
        backgroundColor: "#ffffff",
        paddingLeft: wp("5%"),

    },
    searchBarInput: {
        fontSize: 16,
        color: "#000000"
    },
    textCategoryView: {

    },
    textCategory: {
        color: "#000000",
        fontSize: 16,
        paddingTop: 25,
        paddingLeft: 15,
        fontWeight: "bold"

    },
    imageView: {
        borderRadius: 50,
    },
    image: {
        height: 60,
        width: 60,
        borderRadius: 50

    },
    scrollView: {
        padding: 10,
        marginTop: 30

    },
    detailsView: {
        paddingLeft: 20
    },
    typesView: {
        flexDirection: "row",
        padding: 10,
        elevation: 2,
        borderRadius: 5,
        backgroundColor: '#fff',
        margin: 10
        // elevation: 10
    },
    typeName: {
        color: "black",
        fontWeight: "bold",
        fontSize: 18
    },
    fullTypeName: {
        paddingTop: 10,
        color: "#000"
    }

})

export default PastQuestions;