import React from 'react';
import { Text, StyleSheet, Pressable, PressableProps } from 'react-native';

type ButtonProps = {
    onPress?: PressableProps['onPress'];
    title?: string;
};

export default function Button({ onPress, title = 'Save' }: ButtonProps) {

    return (
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'purple',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});
