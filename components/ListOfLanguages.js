import React from 'react';
import { SectionList } from 'react-native';
import { List } from 'react-native-paper';

const ListOfLanguages = ({ languages, drawer, setLanguage }) => {
  const [someOtherValue, setSomeOtherValue] = React.useState("English");
  const sections = [
    {
      title: 'Settings',
      data: [
        {
          title: 'Available Languages',
          icon: 'translate',
          data: languages.map((language) => ({ value: language })),
        },
        // Add more sections as needed
      ],
    },
  ];

  const renderSectionHeader = ({ section }) => (
    <List.Section title={section.title} />
  );

  const renderItem = ({ item }) => (
    <List.Accordion
      title={item.title}
      left={(props) => <List.Icon {...props} icon={item.icon} />}
      rippleColor="#2C4043"
      titleNumberOfLines={100}
    >
      {item.data.map((languageItem, index) => (
        <List.Item
          style={{backgroundColor: languageItem.value.value === someOtherValue ? "#2C4043" : null,borderRadius:5 }}
          key={index}
          onPress={() => {
            drawer.current.closeDrawer();
            setLanguage(languageItem.value.value);
            setSomeOtherValue(languageItem.value.value);
          }}
          titleStyle={{ color: languageItem.value.value === someOtherValue ? "white" : "black"}}
          title={String(languageItem.value.value)} // Ensure value is a string
        />
      ))}
    </List.Accordion>
  );
  
  return (
    <SectionList
      showsVerticalScrollIndicator={false}
      sections={sections}
      keyExtractor={(item, index) => item.value + index}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
    />
  );
};

export default ListOfLanguages;
