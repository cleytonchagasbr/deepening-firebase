import React, { useState } from 'react';

import { Container, Account, Title, Subtitle } from './styles';
import { ButtonText } from '../../components/ButtonText';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleCreateUserAccount() {
    auth().createUserWithEmailAndPassword(email, password)
    .then(() => Alert.alert('Usuário criado com sucesso'))
    .catch(error => {
      if(error.code === 'auth/email-already-in-use') {
        return Alert.alert('E-mail já em uso. Escola outro e-email para cadastrar.');
      }
    });
  }

  function handleLogin() {
    auth().signInWithEmailAndPassword(email, password)
    .then(result => console.log(result))
    .catch(error => console.log(error))
  }

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <Input
        placeholder="senha"
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button title="Entrar" onPress={handleLogin} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={handleLogin} />
        <ButtonText title="Criar minha conta" onPress={handleCreateUserAccount} />
      </Account>
    </Container>
  );
}