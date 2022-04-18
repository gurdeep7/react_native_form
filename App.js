/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useCallback, useState} from 'react';
import {useForm} from 'react-hook-form';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Alert,
  useColorScheme,
  TextInput,
  Button,
  View,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {useEffect} from 'react/cjs/react.development';
const axios  =require("axios")

//import t from 'tcomb-form-native'; // 0.6.9

const data = [
  {label: '10th', value: '10th'},
  {label: '12th', value: '12th'},
  {label: 'Graduation', value: 'Graduation'},
  {label: 'Post Graduation', value: 'Post Graduation'},
  {label: 'Others', value: 'Others'},
];


const App = () => {
  const {register, handleSubmit, setValue} = useForm();
  const [isFocus, setIsFocus] = useState(true);

  const onSubmit = useCallback(formData => {
    
    const headers = {"Content-Type":"application/json"}
    const data = JSON.stringify(formData)
    var config = {
      method: 'post',
      url: "http://192.168.1.42:2345/register", //Add your local ip address
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      if(response.data.status == "passed"){
        Alert.alert("User Registerd successfully")
      }else{
        Alert.alert(JSON.stringify(response))
      }
      ;
    })
    .catch(function (error) {
      Alert.alert(JSON.stringify("Enter valid data, email should be unique"))
    });
  }, []);
  const onChange = useCallback(
    name => text => {
      setValue(name, text);
    },
    [],
  );

  var radio_props = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
  ];

  useEffect(() => {
    register('email');
    register('password');
  }, [register]);

  //dropdown

  return (
    <View style={styles.view}>
      <TextInput
        style={styles.textInput}
        autoCompleteType="email"
        blurOnSubmit
        keyboardType="email-address"
        textContentType="emailAddress"
        placeholder="Email"
        onChangeText={onChange('email')}
      />
      <TextInput
        style={styles.textInput}
        blurOnSubmit
        placeholder="Name"
        onChangeText={onChange('name')}
      />
      <TextInput
        style={styles.textInput}
        secureTextEntry
        autoCompleteType="password"
        placeholder="Password"
        onChangeText={onChange('password')}
      />
      <Dropdown
        label="Education"
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select your Education"
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue('education', item.value);
          setIsFocus(false);
        }}
      />
      <Text>Select Your Gender</Text>
      <RadioForm
        radio_props={radio_props}
        initial={-1}
        onPress={value => {
          setValue('gender', value);
        }}
      />
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  textInput: {
    fontSize: 25,
    borderWidth: 2,
    borderColor: 'lightgrey',
    margin: 3,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  view: {
    marginTop: 60,
  },
});

export default App;
