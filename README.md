# react-native-tabs
This is a react native Swipeable tabs 

##Demo
```
  <Tabs
        defaultValue={tab}
        onValueChange={(value) => {
          setTab(value);

        }}>
        <TabsList>
          <TabsTrigger value="account">
            <View style={styles.tabContent}>
              <Ionicons name="person" size={18} color="#64748b" />
              <Text>Account</Text>
            </View>
          </TabsTrigger>
          <TabsTrigger value="password">
            <View style={styles.tabContent}>
              <Ionicons name="key" size={18} color="#64748b" />
              <Text style={styles.tabText}>Password</Text>
            </View>
          </TabsTrigger>
          <TabsTrigger value="settings">
            <View style={styles.tabContent}>
              <Ionicons name="settings" size={18} color="#64748b" />
              <Text style={styles.tabText}>Settings</Text>
            </View>
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <View style={styles.tabContent}>
              <Ionicons name="notifications" size={18} color="#64748b" />
              <Text style={styles.tabText}>Notifications</Text>
            </View>
          </TabsTrigger>
        </TabsList>

        <TabsContentWrapper>
          {/* Account Tab */}
          <TabsContent value="account">
          </TabsContent>

          {/* Password Tab */}
          <TabsContent value="password">
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
          </TabsContent>
        </TabsContentWrapper>
      </Tabs>
```
