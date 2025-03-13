import React, { createContext, useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';

type TabsContextType = {
  activeTab: string;
  setActiveTab: (value: string) => void;
  tabValues: string[];
  registerTab: (value: string) => void;
  activeIndex: number;
};

const TabsContext = createContext<TabsContextType | null>(null);

export const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs provider');
  }
  return context;
};

type TabsProps = {
  defaultValue: string;
  children: React.ReactNode;
  onValueChange?: (value: string) => void;
  className?: string;
};

export default function Tabs({ defaultValue, children, onValueChange, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);
  const [tabValues, setTabValues] = useState<string[]>([]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    onValueChange?.(value);
  };

  const registerTab = (value: string) => {
    setTabValues((prev) => {
      if (!prev.includes(value)) {
        return [...prev, value];
      }
      return prev;
    });
  };

  const activeIndex = tabValues.indexOf(activeTab);

  return (
    <TabsContext.Provider
      value={{
        activeTab,
        setActiveTab: handleTabChange,
        tabValues,
        registerTab,
        activeIndex,
      }}>
      <View style={styles.container} className={className}>
        {children}
      </View>
    </TabsContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
  },
});
