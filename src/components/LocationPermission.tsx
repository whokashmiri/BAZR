import React, { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { requestLocationPermission, getUserLocation, isWithinDeliveryRange } from '../utils/distanceCalculator';

const LocationPermission: React.FC = () => {
    const [locationStatus, setLocationStatus] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        checkLocation();
    }, []);

    const checkLocation = async () => {
        setLoading(true);
        const hasPermission = await requestLocationPermission();
        if (!hasPermission) {
            setLocationStatus("Permission Denied");
            setLoading(false);
            return;
        }

        try {
            const userLocation = await getUserLocation();
            const status = isWithinDeliveryRange(userLocation);
            setLocationStatus(status);
        } catch (error) {
            setLocationStatus("Location Error");
        }
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="blue" />
            ) : (
                <>
                    <Text style={styles.text}>{locationStatus || "Checking location..."}</Text>
                    <Button title="Check Again" onPress={checkLocation} />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export default LocationPermission;
