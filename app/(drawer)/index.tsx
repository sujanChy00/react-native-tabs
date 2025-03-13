import { Stack } from 'expo-router';

import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';
import TabsDemo from '~/components/tabs-demo';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <TabsDemo />
    </>
  );
}
