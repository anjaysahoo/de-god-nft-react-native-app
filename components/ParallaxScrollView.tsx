import type {PropsWithChildren, ReactElement} from 'react';
import {StyleSheet, useColorScheme} from 'react-native';
import Animated, {
    AnimatedScrollViewProps,
    interpolate,
    useAnimatedRef,
    useAnimatedStyle,
    useScrollViewOffset,
} from 'react-native-reanimated';

import {ThemedView} from '@/components/ThemedView';

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
    headerImage: ReactElement;
    headerBackgroundColor: { dark: string; light: string };
    onScroll?: AnimatedScrollViewProps['onScroll'];
}>;

export default function ParallaxScrollView({
                                               children,
                                               headerImage,
                                               headerBackgroundColor,
                                               onScroll,
                                           }: Props) {
    const colorScheme = useColorScheme() ?? 'light';
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOffset = useScrollViewOffset(scrollRef);

    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrollOffset.value,
                        [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                        [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
                    ),
                },
                {
                    scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
                },
            ],
        };
    });

    return (
        <ThemedView style={styles.container}>
            <Animated.ScrollView
                ref={scrollRef}
                scrollEventThrottle={50}
                onScroll={onScroll}
            >
                <Animated.View
                    style={[
                        styles.header,
                        {backgroundColor: headerBackgroundColor[colorScheme]},
                        headerAnimatedStyle,
                    ]}
                >
                    {headerImage}
                </Animated.View>
                <ThemedView style={styles.content}>{children}</ThemedView>
            </Animated.ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 250,
        overflow: 'hidden',
    },
    content: {
        flex: 1,
        padding: 32,
        gap: 16,
        overflow: 'hidden',
    },
});
