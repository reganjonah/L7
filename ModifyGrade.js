import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";

const ModifyGrade = ({ route, navigation }) => {
    const { grade, course, index, editMode, onSave } = route.params || {};
    const [currentCourse, setCurrentCourse] = useState(course || "");
    const [currentGrade, setCurrentGrade] = useState(grade || "A");

    const handleSave = () => {
        if (!currentCourse) {
            Alert.alert("Error", "Please enter a module name.");
            return;
        }
        onSave({ course: currentCourse, grade: currentGrade }, index);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Module Name"
                value={currentCourse}
                onChangeText={setCurrentCourse}
            />
            <Picker
                selectedValue={currentGrade}
                style={styles.picker}
                onValueChange={(itemValue) => setCurrentGrade(itemValue)}
            >
                {["DIST", "A", "B+", "B", "C+", "C", "D+", "D", "NGP", "F"].map((grade) => (
                    <Picker.Item key={grade} label={grade} value={grade} />
                ))}
            </Picker>
            <Button
                title={editMode ? "Update Grade" : "Add Grade"}
                onPress={handleSave}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
    },
    picker: {
        height: 50,
        width: "100%",
        marginBottom: 20,
    },
});

export default ModifyGrade;
