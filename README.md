# 📝 To-Do List — React Native

Aplicativo de lista de tarefas desenvolvido com **React Native + Expo** como atividade acadêmica.
As tarefas são salvas localmente no dispositivo usando **AsyncStorage**, então não se perdem ao fechar o aplicativo.

## ✅ Funcionalidades

- Adicionar novas tarefas
- Marcar tarefas como concluídas (risco no texto + ícone ✓)
- Excluir tarefas da lista
- Contador de tarefas concluídas
- **Persistência local com AsyncStorage** — as tarefas continuam salvas ao fechar e abrir o app
- Compatível com Android, iOS e Web

## 🚀 Como executar

**1. Instale as dependências:**
```bash
npm install
```

**2. Rode o projeto:**
```bash
# Android
npx expo start --android

# iOS
npx expo start --ios

# Web
npx expo start --web
```

## 💾 Como funciona a persistência

As tarefas são armazenadas no dispositivo através do `@react-native-async-storage/async-storage`, sob a chave `@todo_app:tasks`.

- **Ao iniciar o app:** as tarefas salvas são carregadas automaticamente do armazenamento local.
- **Ao adicionar, marcar ou excluir uma tarefa:** a lista atualizada é gravada novamente no armazenamento.
- **Resultado:** ao fechar e abrir o aplicativo novamente, as tarefas (e seu status de concluída) continuam exatamente como estavam.

## 🛠️ Tecnologias

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- TypeScript