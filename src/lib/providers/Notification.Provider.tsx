'use client';

import { useEffect, useState } from 'react';
import { getMessaging, onMessage } from 'firebase/messaging';

import { firebaseAppConfig } from '@/lib/index';
import { useFcmTokenHook } from '@/lib/utils/useFcmToken';

export const NotificationProviders = () => {
  const { fcmToken, notificationPermissionStatus } = useFcmTokenHook();
  const [tokenSet, setTokenSet] = useState(false);
  console.log(`Notification Permission Status for ${notificationPermissionStatus}`);
  async function setFCMToken(fcmToken: string) {
   console.log("your fcm token is", fcmToken)
  }
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      const messaging = getMessaging(firebaseAppConfig);
      const unsubscribe = onMessage(messaging, payload => {
        console.log('Foreground push notification received:', payload);
        // Handle the received push notification while the app is in the foreground
        // You can display a notification or update the UI based on the payload
      });
      return () => {
        unsubscribe(); // Unsubscribe from the onMessage event
      };
    }
  }, []);
  useEffect(() => {
    if (fcmToken && !tokenSet) {
      setTokenSet(true);
      setFCMToken(fcmToken);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fcmToken]);
  return <></>;
};
