import React, { useState } from "react";
import {View, Button, Text, SectionList, TouchableOpacity, Alert, StyleSheet,} from "react-native";

const Home = ({ navigation }) => {
    const [grades, setGrades] = useState([
        { title: "Module Grades", data: [{ course: "C346 Mobile App Development", grade: "A" }] },
    ]);

    const calculateGPA = () => {
        const gradeToPoint = {
            DIST: 4.0,
            A: 4.0,
            "B+": 3.5,
            B: 3.0,
            "C+": 2.5,
            C: 2.0,
            "D+": 1.5,
            D: 1.0,
            NGP: 1.0,
            F: 0.0,
        };

        const allGrades = grades[0].data.map((item) => gradeToPoint[item.grade] || 0);
        if (allGrades.length === 0) {
            Alert.alert("No Module Grades", "Please add module grades to calculate GPA.");
            return;
        }

        const gpa = (allGrades.reduce((sum, points) => sum + points, 0) / allGrades.length).toFixed(2);
        Alert.alert("GPA", `Your GPA is: ${gpa}`);
    };

    const deleteGrade = (index) => {
        const updatedGrades = [...grades];
        updatedGrades[0].data.splice(index, 1);
        setGrades(updatedGrades);
    };

    const handleSave = (newGrade, index) => {
        const updatedGrades = [...grades];
        if (index !== undefined) {
            updatedGrades[0].data[index] = newGrade;
        } else {
            updatedGrades[0].data.push(newGrade);
        }
        setGrades(updatedGrades);
    };

    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            style={styles.gradeItem}
            onPress={() =>
                navigation.navigate("ModifyGrade", {
                    grade: item.grade,
                    course: item.course,
                    index,
                    editMode: true,
                    onSave: handleSave,
                })
            }
        >
            <Text style={styles.gradeText}>{`${item.course}: ${item.grade}`}</Text>
            <Button title="Delete" onPress={() => deleteGrade(index)} color="red" />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Button
                title="Add Module Grade"
                onPress={() =>
                    navigation.navigate("ModifyGrade", {
                        onSave: handleSave,
                    })
                }
            />
            <Button title="Calculate GPA" onPress={calculateGPA} />
            <SectionList
                sections={grades}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.header}>{title}</Text>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    gradeItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
    },
    gradeText: {
        fontSize: 16,
    },
});

export default Home;
