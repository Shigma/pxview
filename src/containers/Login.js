import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Linking,
} from 'react-native';
import dismissKeyboard from 'dismissKeyboard';
import { Actions, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import OverlaySpinner from 'react-native-loading-spinner-overlay';
import PXFormInput from '../components/PXFormInput';
import { login } from '../common/actions/auth';

const styles = StyleSheet.create({
  container: {
    padding: 5
  },
  loginButton: {
    marginTop: 15,
    backgroundColor: '#5cafec',
  },
  signupButton: {
    marginTop: 15,
    backgroundColor: '#8BC052',
  }
})

const validate = (values, props) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Email address/Pixiv ID is required";
  }
  if (!values.password) {
    errors.password = "Password is required";
  }
  return errors;
};

class Login extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: false
    };
  }
  
  submit = (data) => {
    //Actions.pop({ refresh: { test: 'abaer' }})
    // Actions.tabs();
    // Actions.userProfile({ type: ActionConst.RESET });
    const { dispatch } = this.props;
    const { email, password } = data;
    dismissKeyboard();
    this.setState({
      loading: true
    });
    dispatch(login(email, password)).then(() => {
      this.setState({
        loading: false
      });
      Actions.pop();
    });
  }

  handleOnPressSignUp = () => {
    const url = 'https://accounts.pixiv.net/signup';
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } 
      else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  render() {
    const { handleSubmit, error } = this.props;
    const { loading } = this.state;
    return (
      <View style={ styles.container }>
        <Field name="email" component={PXFormInput} label="Email address/Pixiv ID" />
        <Field name="password" component={PXFormInput} label="Password" secureTextEntry={true} />
        <Button 
          title='Login' 
          buttonStyle={styles.loginButton}
          raised
          onPress={handleSubmit(this.submit)}
        />
        <Button 
          title="Don't have an account?" 
          buttonStyle={styles.signupButton}
          raised
          onPress={this.handleOnPressSignUp}
        />
        <OverlaySpinner visible={ loading } />
      </View>
    );
  }
}

const LoginForm = reduxForm({
  form: "login",
  //destroyOnUnmount: false,
  validate
})(Login);

export default connect()(LoginForm);