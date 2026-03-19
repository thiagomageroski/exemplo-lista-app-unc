import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Pressable } from 'react-native';
import { useState } from 'react';

const nomesIniciais = [
  "Luis",
  "Fernado",
  "José",
]

export default function App() {

  var [nomes, setNomes] = useState(nomesIniciais);
  var [novoNome, setNovoNome] = useState('');

  const adicionarNome = () => {
    if (novoNome.trim() !== '') {
      setNomes([...nomes, novoNome.trim()]);
      setNovoNome('');
    }
  }

  return (
    <View style={styles.container}>
      {

        nomes.map((nome, index) => (
          <View key={index} style={styles.elemtentos}>
            <Text style={styles.itens}> {nome} </Text>
          </View>
        ))
      }
      <View style={styles.inputContainer}>

        <TextInput
          style={styles.input}
          placeholder='Digite um novo nome'
          placeholderTextColor='#fff'
          value={novoNome}
          onChangeText={setNovoNome}
          onSubmitEditing={adicionarNome}
        />
        <Pressable style={styles.botao} onPress={adicionarNome}>
          <Text style={styles.textoBotao}>ADICIONAR</Text>
        </Pressable>

      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  botao: {
    backgroundColor: '#c81ecb',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#1e293b',
    color: '#fff',
    padding: 12,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  elemtentos: {
    backgroundColor: '#c81ecb',
    borderRadius: 16,
    marginTop: 8,
  },
  itens: {
    color: '#f5f5f5',
    fontSize: 16,
    fontWeight: '800',
    padding: 4,
  },
  images: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginTop: 16
  },
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: `bold`,
  },
  subtitle: {
    color: `#9ca3af`,
    fontSize: 16,
    marginTop: 8,
  },

});
