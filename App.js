import React, { useState } from 'react';
import {View, Text, TextInput, Button,  FlatList,  TouchableOpacity,  StyleSheet,  Modal,} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const App = () => {
  const [nombre, setNombre] = useState('');
  const [fechaIngreso, setFecha] = useState(new Date());
  const [cantidadP, setCantidad] = useState('');
  const [estudiantes, setEstudiantes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setFecha(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const agregarEstudiante = () => {
    const nuevoEstudiante = { id: estudiantes.length + 1, nombre: nombre, fechaIngreso: fechaIngreso, cantidadP: cantidadP };
    setEstudiantes([...estudiantes, nuevoEstudiante]);
    setNombre('');
    setCantidad('');
    setFecha(new Date());
    setModalVisible(false);
  };

  const eliminarEstudiante = (id) => {
    setEstudiantes(estudiantes.filter((cliente) => cliente.id !== id));
  };

  return (
    <View style={styles.container}>
      {/* Botón para abrir el modal de agregar estudiante */}
      <Button title="Agregar Estudiante" onPress={() => setModalVisible(true)} />
      {/* Modal de agregar estudiante */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Campo de entrada para el nombre del estudiante */}
            <TextInput
              style={styles.input}
              placeholder="Nombre del estudiante"
              value={nombre}
              onChangeText={setNombre}
            />
            <TextInput
              style={styles.input}
              placeholder="Cantidad de materias"
              value={cantidadP}
              onChangeText={setCantidad}
            />

            {/* Botón para mostrar el datetimepicker */}
            <TouchableOpacity onPress={showDatepicker}><Text style={styles.Fecha}>Seleccionar fecha de ingreso</Text></TouchableOpacity>
            {/* Muestra la fecha seleccionada */}
            <Text>selected: {fechaIngreso.toLocaleString()}</Text>
            {/* Muestra el datetimepicker si la variable show es verdadera */}
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={false}
                onChange={onChange}
                locale='es-ES' // Establece el idioma del datetimepicker a español
              />
            )}
            {/* Botón para agregar el estudiante */}
            <Button title="Agregar Estudiante" onPress={agregarEstudiante} />
            {/* Botón para cancelar y cerrar el modal */}
            <Button
              title="Cancelar"
              onPress={() => setModalVisible(false)}
              color="red"
            />
          </View>
        </View>
      </Modal>
      {/* Lista de estudiantes */}
      <FlatList
        data={estudiantes}
        renderItem={({ item }) => (
          <View style={styles.clienteItem}>
            {/* Información del estudiante */}
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => {
                console.log('Detalles del estudiante', item);
              }}
            >
              <Text style={styles.clienteNombre}>{item.id}</Text>
              <Text style={styles.clienteNombre}>{item.nombre}</Text>
              <Text style={styles.clienteCantidad}>
                Cantidad de materias cursando: {item.cantidadP}
              </Text>
              <Text style={styles.clienteFecha}>
                Fecha de Ingreso: {item.fechaIngreso.toDateString()}
              </Text>
            </TouchableOpacity>

            {/* Botón para eliminar estudiante */}
            <TouchableOpacity
              style={styles.botonEliminar}
              onPress={() => eliminarEstudiante(item.id)} x
            >
              <Text style={styles.textoBotonEliminar}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001222',
    padding: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  clienteItem: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  clienteNombre: {
    fontSize: 18,
    color: '#333',
  },
  clienteFecha: {
    fontSize: 16,
    padding: 5,
    color: '#666',
  },
  botonEliminar: {
    padding: 10,
    backgroundColor: '#BE4200',
    borderRadius: 5,
  },
  textoBotonEliminar: {
    color: '#fff',
    fontWeight: 'bold',
  },
  Fecha: {
    padding: 10,
    fontSize: 15,
    color: '#0085E1',
  }

});

export default App;
