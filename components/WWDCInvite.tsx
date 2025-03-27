import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const WWDCInvite = () => {
  const targetDate = new Date('2025-06-09T00:00:00');

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [countdown, setCountdown] = useState<CountdownTime>(calculateTimeLeft());
  const [totalParticipants, setTotalParticipants] = useState(13);
  const [counters, setCounters] = useState([0, 10, 3]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const participantIcons = [
    require('../assets/person-simple.png'),
    require('../assets/child.png'),
    require('../assets/old-people.png'),
  ];

  const updateCounter = (index: number, increment: boolean) => {
    const newCounters = [...counters];
    if (increment) {
      newCounters[index] += 1;
    } else if (newCounters[index] > 0) {
      newCounters[index] -= 1;
    }
    setCounters(newCounters);
    setTotalParticipants(newCounters.reduce((a, b) => a + b, 0));
  };

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <Image
          source={require('../assets/large.gif')}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.countdownOverlay}>
          <View style={styles.countdown}>
            <Text style={styles.countdownText}>{countdown.days} dias</Text>
            <Text style={styles.countdownDot}> • </Text>
            <Text style={styles.countdownText}>{countdown.hours}h</Text>
            <Text style={styles.countdownDot}> • </Text>
            <Text style={styles.countdownText}>{countdown.minutes}min</Text>
            <Text style={styles.countdownDot}> • </Text>
            <Text style={styles.countdownText}>{countdown.seconds}s</Text>
          </View>
        </View>
      </View>

      <View style={styles.eventTitleContainer}>
        <Text style={styles.eventName}>Apple WWDC</Text>
        <Text style={styles.date}>09 • 06 • 2025</Text>
      </View>

      <View style={styles.cardContainer}>
        <LinearGradient
          colors={['#1a1a1a', '#141414']}
          style={styles.inviteCard}
        >
          <Text style={styles.participantsLabel}>Participantes</Text>
          <View style={styles.participantCount}>
            <Text style={styles.participantNumber}>{totalParticipants}</Text>
          </View>

          <View style={styles.countersContainer}>
            {counters.map((count, index) => (
              <View key={index} style={styles.counterHolder}>
                <Text style={styles.counterText}>{count}</Text>
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={() => updateCounter(index, true)}
                >
                  <View style={styles.iconCircle}>
                    <Image
                      source={participantIcons[index]}
                      style={styles.participantIcon}
                      resizeMode="contain"
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.counterButton}
                  onPress={() => updateCounter(index, false)}
                >
                  <Image
                    source={require('../assets/minus-circle.png')}
                    style={styles.minusIcon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  videoContainer: {
    height: width * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: width * 0.8,
    height: width * 0.8,
  },
  countdownOverlay: {
    position: 'absolute',
    top: 20,
    alignItems: 'center',
  },
  countdown: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countdownText: {
    color: 'white',
    fontSize: 16,
  },
  countdownDot: {
    color: '#666',
    fontSize: 16,
    marginHorizontal: 5,
  },
  eventTitleContainer: {
    position: 'absolute',
    top: width * 0.68,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1,
  },
  eventName: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  date: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  cardContainer: {
    position: 'absolute',
    bottom: -40,
    left: 0,
    right: 0,
    height: height * 0.50,
  },
  inviteCard: {
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 20,
    alignItems: 'center',
    borderWidth: 0.2,
    borderBottomColor: 'transparent',
    borderColor: '#D8D8D8',
  },
  participantsLabel: {
    color: '#A4A4A4',
    fontSize: 19,
    fontWeight: 'semibold',
    marginBottom: 25,
    marginTop: 3,
  },
  participantCount: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#A4A4A4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  participantNumber: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  countersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  counterHolder: {
    alignItems: 'center',
    width: width * 0.25,
  },
  counterText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 15,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  participantIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  counterButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  minusIcon: {
    width: 30,
    height: 30,
    tintColor: '#FF3B30',
  },
});

export default WWDCInvite;
