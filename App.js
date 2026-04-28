import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, TextInput, ScrollView,
  StyleSheet, Linking, Alert
} from 'react-native';

export default function App() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Express Interior');
  const [vehicle, setVehicle] = useState('Sedan');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [history, setHistory] = useState([]);

  const getPrice = () => {
    if (service === 'Express Interior') {
      if (vehicle === 'Sedan') return 79;
      if (vehicle === 'SUV') return 99;
      return 119;
    }
    if (service === 'Full Interior') return 130;
    if (service === 'Premium Detail') return 400;
    return 79;
  };

  const bookNow = () => {
    if (!name || !phone || !date || !time) {
      Alert.alert('Missing info', 'Please fill name, phone, date and time.');
      return;
    }

    const booking = {
      name,
      phone,
      service,
      vehicle,
      date,
      time,
      price: getPrice(),
    };

    setHistory([booking, ...history]);

    Alert.alert('Booking saved', 'Your booking has been added to history.');
  };

  const openWhatsApp = () => {
    const message =
      `Hello Medjira Car Wash, I want to book:\n` +
      `Name: ${name}\n` +
      `Phone: ${phone}\n` +
      `Service: ${service}\n` +
      `Vehicle: ${vehicle}\n` +
      `Date: ${date}\n` +
      `Time: ${time}\n` +
      `Price: $${getPrice()}`;

    Linking.openURL(
      `https://wa.me/18254045664?text=${encodeURIComponent(message)}`
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.logo}>MEDJIRA</Text>
      <Text style={styles.header}>Car Wash & Detailing</Text>

      <Text style={styles.section}>Select Service</Text>

      {['Express Interior', 'Full Interior', 'Premium Detail'].map((item) => (
        <TouchableOpacity
          key={item}
          style={[styles.card, service === item && styles.activeCard]}
          onPress={() => setService(item)}
        >
          <Text style={styles.cardText}>{item}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.section}>Vehicle Type</Text>

      <View style={styles.row}>
        {['Sedan', 'SUV', 'Minivan'].map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.smallBtn, vehicle === item && styles.activeSmallBtn]}
            onPress={() => setVehicle(item)}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.section}>Customer Info</Text>

      <TextInput
        style={styles.input}
        placeholder="Full name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <Text style={styles.section}>Choose Date & Time</Text>

      <TextInput
        style={styles.input}
        placeholder="Date example: May 5, 2026"
        value={date}
        onChangeText={setDate}
      />

      <TextInput
        style={styles.input}
        placeholder="Time example: 10:00 AM"
        value={time}
        onChangeText={setTime}
      />

      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Booking Summary</Text>
        <Text>Service: {service}</Text>
        <Text>Vehicle: {vehicle}</Text>
        <Text>Date: {date}</Text>
        <Text>Time: {time}</Text>
        <Text style={styles.price}>Total: ${getPrice()}</Text>
      </View>

      <TouchableOpacity style={styles.bookBtn} onPress={bookNow}>
        <Text style={styles.bookText}>Save Booking</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.whatsappBtn} onPress={openWhatsApp}>
        <Text style={styles.bookText}>Book on WhatsApp</Text>
      </TouchableOpacity>

      <Text style={styles.section}>Booking History</Text>

      {history.length === 0 ? (
        <Text style={styles.empty}>No booking yet.</Text>
      ) : (
        history.map((item, index) => (
          <View key={index} style={styles.historyCard}>
            <Text style={styles.historyTitle}>{item.service}</Text>
            <Text>{item.vehicle}</Text>
            <Text>{item.date} at {item.time}</Text>
            <Text>{item.name} - {item.phone}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        ))
      )}

      <View style={styles.playStoreBox}>
        <Text style={styles.playStoreTitle}>Play Store Preparation</Text>
        <Text style={styles.playStoreText}>App name: Medjira Car Wash</Text>
        <Text style={styles.playStoreText}>Short description: Mobile & shop car wash booking in Edmonton.</Text>
        <Text style={styles.playStoreText}>Next: create app icon, screenshots and privacy policy.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#111',
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'orange',
  },
  header: {
    color: 'white',
    marginBottom: 20,
    fontSize: 16,
  },
  section: {
    color: 'white',
    marginTop: 22,
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
  },
  activeCard: {
    backgroundColor: 'orange',
  },
  cardText: {
    color: 'white',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  smallBtn: {
    backgroundColor: '#ddd',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    flex: 1,
    alignItems: 'center',
  },
  activeSmallBtn: {
    backgroundColor: 'orange',
  },
  input: {
    backgroundColor: 'white',
    padding: 12,
    marginTop: 10,
    borderRadius: 10,
  },
  summary: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginTop: 25,
  },
  summaryTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  price: {
    fontWeight: 'bold',
    marginTop: 5,
    color: 'orange',
  },
  bookBtn: {
    backgroundColor: 'orange',
    padding: 15,
    marginTop: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  whatsappBtn: {
    backgroundColor: '#25D366',
    padding: 15,
    marginTop: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookText: {
    color: 'white',
    fontWeight: 'bold',
  },
  empty: {
    color: '#ccc',
    marginTop: 10,
  },
  historyCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
  },
  historyTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  playStoreBox: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 12,
    marginTop: 25,
    marginBottom: 40,
  },
  playStoreTitle: {
    color: 'orange',
    fontWeight: 'bold',
    fontSize: 18,
  },
  playStoreText: {
    color: 'white',
    marginTop: 6,
  },
});