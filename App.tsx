import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Task = {
  id: string;
  text: string;
  done: boolean;
};

// Chave usada para salvar/recuperar as tarefas no AsyncStorage
const STORAGE_KEY = '@todo_app:tasks';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputText, setInputText] = useState('');
  // Controla se as tarefas já foram carregadas do storage.
  // Importante para evitar sobrescrever os dados salvos com uma lista vazia
  // antes do carregamento inicial terminar.
  const [isLoaded, setIsLoaded] = useState(false);

  // Carrega as tarefas salvas quando o aplicativo inicia
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored !== null) {
          const parsed: Task[] = JSON.parse(stored);
          setTasks(parsed);
        }
      } catch (error) {
        console.error('Erro ao carregar as tarefas:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadTasks();
  }, []);

  // Sempre que a lista de tarefas mudar (após o carregamento inicial),
  // salva no AsyncStorage para garantir a persistência local.
  useEffect(() => {
    if (!isLoaded) return;

    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      } catch (error) {
        console.error('Erro ao salvar as tarefas:', error);
      }
    };

    saveTasks();
  }, [tasks, isLoaded]);

  const addTask = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;

    const newTask: Task = {
      id: Date.now().toString(),
      text: trimmed,
      done: false,
    };

    setTasks((prev) => [...prev, newTask]);
    setInputText('');
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  // Renderiza cada item da lista de tarefas
  const renderTask = ({ item }: { item: Task }) => (
    <View style={styles.taskRow}>
      <Pressable style={styles.taskLeft} onPress={() => toggleTask(item.id)}>
        <View style={[styles.circle, item.done && styles.circleDone]}>
          {item.done && <Text style={styles.checkMark}>✓</Text>}
        </View>

        <Text style={[styles.taskText, item.done && styles.taskDone]}>
          {item.text}
        </Text>
      </Pressable>

      <Pressable onPress={() => deleteTask(item.id)} style={styles.deleteBtn}>
        <Text style={styles.deleteText}>✕</Text>
      </Pressable>
    </View>
  );

  // Mostra um indicador de carregamento enquanto as tarefas
  // estão sendo recuperadas do armazenamento local.
  if (!isLoaded) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <StatusBar style="light" />
        <ActivityIndicator size="large" color="#c81ecb" />
        <Text style={styles.loadingText}>Carregando tarefas...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar style="light" />

      <Text style={styles.title}>📝 Minhas Tarefas</Text>

      <Text style={styles.counter}>
        {tasks.filter((t) => t.done).length} de {tasks.length} concluídas
      </Text>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        style={styles.list}
        contentContainerStyle={{ paddingBottom: 12 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma tarefa ainda. Adicione uma!</Text>
        }
      />

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Nova tarefa..."
          placeholderTextColor="#64748b"
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={addTask}
          returnKeyType="done"
        />
        <Pressable style={styles.addBtn} onPress={addTask}>
          <Text style={styles.addBtnText}>+</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#94a3b8',
    marginTop: 12,
    fontSize: 15,
  },
  title: {
    color: '#f1f5f9',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  counter: {
    color: '#94a3b8',
    fontSize: 14,
    marginBottom: 20,
  },
  list: {
    flex: 1,
  },

  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 14,
    marginBottom: 10,
    padding: 14,
  },
  taskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#c81ecb',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  circleDone: {
    backgroundColor: '#c81ecb',
    borderColor: '#c81ecb',
  },
  checkMark: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },

  taskText: {
    color: '#f1f5f9',
    fontSize: 16,
    flex: 1,
  },
  taskDone: {
    textDecorationLine: 'line-through',
    color: '#475569',
  },

  deleteBtn: {
    paddingLeft: 12,
  },
  deleteText: {
    color: '#475569',
    fontSize: 18,
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#1e293b',
    color: '#f1f5f9',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  addBtn: {
    backgroundColor: '#c81ecb',
    width: 50,
    height: 50,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: {
    color: '#fff',
    fontSize: 28,
    lineHeight: 30,
    fontWeight: 'bold',
  },
  emptyText: {
    color: '#475569',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 15,
  },
});