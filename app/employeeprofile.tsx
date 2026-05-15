import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
  Platform,
} from 'react-native'

import {
  useState,
} from 'react'

import DateTimePicker from '@react-native-community/datetimepicker'

import {
  Picker,
} from '@react-native-picker/picker'

import {
  Ionicons,
} from '@expo/vector-icons'

import Navbar from '../components/Navbar'

import Colors from '../constants/colors'

const initialEmployees = [
  {
    id: '1',
    name: 'Karthikeyan',
    role: 'Technical',
    joiningDate: '23/02/2026',
  },

  {
    id: '2',
    name: 'Arun Kumar',
    role: 'Mentoring',
    joiningDate: '11/01/2026',
  },
]

export default function EmployeeProfileScreen() {

  const [employees, setEmployees] =
    useState(initialEmployees)

  const [search, setSearch] =
    useState('')

  const [modalVisible, setModalVisible] =
    useState(false)

  const [editId, setEditId] =
    useState<string | null>(null)

  const [name, setName] =
    useState('')

  const [role, setRole] =
    useState('')

  const [joiningDate, setJoiningDate] =
    useState('')

  const [showDatePicker, setShowDatePicker] =
    useState(false)

  /* Search */

  const filteredEmployees =
    employees.filter((item) =>
      item.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    )

  /* Delete */

  const handleDelete = (
    id: string
  ) => {

    Alert.alert(
      'Delete Employee',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },

        {
          text: 'Delete',

          style: 'destructive',

          onPress: () => {

            const updated =
              employees.filter(
                (item) =>
                  item.id !== id
              )

            setEmployees(updated)
          },
        },
      ]
    )
  }

  /* Open Add Modal */

  const openAddModal = () => {

    setEditId(null)

    setName('')

    setRole('')

    setJoiningDate('')

    setModalVisible(true)
  }

  /* Edit */

  const handleEdit = (
    item: any
  ) => {

    setEditId(item.id)

    setName(item.name)

    setRole(item.role)

    setJoiningDate(
      item.joiningDate
    )

    setModalVisible(true)
  }

  /* Save */

  const handleSaveEmployee = () => {

    if (
      !name ||
      !role ||
      !joiningDate
    ) {

      Alert.alert(
        'Missing Fields',
        'Fill all details'
      )

      return
    }

    if (editId) {

      const updated =
        employees.map((item) =>

          item.id === editId
            ? {
                ...item,
                name,
                role,
                joiningDate,
              }
            : item
        )

      setEmployees(updated)

    } else {

      const newEmployee = {
        id: (
          employees.length + 1
        ).toString(),

        name,

        role,

        joiningDate,
      }

      setEmployees([
        ...employees,
        newEmployee,
      ])
    }

    setModalVisible(false)
  }

  return (

    <SafeAreaView
      style={styles.container}
    >

      {/* Navbar */}

      <Navbar title="Employees" />

      {/* Search */}

      <View style={styles.searchWrapper}>

        <View
          style={styles.searchContainer}
        >

          <Ionicons
            name="search"
            size={20}
            color={Colors.gray}
          />

          <TextInput
            placeholder="Search employee..."
            placeholderTextColor={
              Colors.gray
            }
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />

        </View>

      </View>

      {/* Table Header */}

      <View style={styles.tableHeader}>

        <Text
          style={[
            styles.headerText,
            { flex: 1.4 },
          ]}
        >
          Name
        </Text>

        <Text
          style={[
            styles.headerText,
            { flex: 1.2 },
          ]}
        >
          Role
        </Text>

        <Text
          style={[
            styles.headerText,
            { flex: 1.2 },
          ]}
        >
          Date
        </Text>

        <Text
          style={[
            styles.headerText,
            { flex: 1 },
          ]}
        >
          Action
        </Text>

      </View>

      {/* Employee List */}

      <FlatList
        data={filteredEmployees}

        keyExtractor={(item) =>
          item.id
        }

        contentContainerStyle={{
          paddingBottom: 120,
        }}

        renderItem={({ item }) => (

          <View style={styles.row}>

            <Text
              style={[
                styles.cell,
                { flex: 1.4 },
              ]}
            >
              {item.name}
            </Text>

            <Text
              style={[
                styles.cell,
                { flex: 1.2 },
              ]}
            >
              {item.role}
            </Text>

            <Text
              style={[
                styles.cell,
                { flex: 1.2 },
              ]}
            >
              {item.joiningDate}
            </Text>

            {/* Actions */}

            <View
              style={styles.actionRow}
            >

              {/* Edit */}

              <TouchableOpacity
                onPress={() =>
                  handleEdit(item)
                }
              >

                <Ionicons
                  name="create-outline"
                  size={22}
                  color="#2563eb"
                />

              </TouchableOpacity>

              {/* Delete */}

              <TouchableOpacity
                onPress={() =>
                  handleDelete(
                    item.id
                  )
                }
              >

                <Ionicons
                  name="trash-outline"
                  size={22}
                  color="#ef4444"
                />

              </TouchableOpacity>

            </View>

          </View>
        )}
      />

      {/* Floating Add Button */}

      <TouchableOpacity
        style={styles.floatingButton}
        activeOpacity={0.8}
        onPress={openAddModal}
      >

        <Ionicons
          name="add"
          size={30}
          color="#fff"
        />

      </TouchableOpacity>

      {/* Modal */}

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
      >

        <View style={styles.modalBg}>

          <View style={styles.modalCard}>

            <Text style={styles.modalTitle}>
              {editId
                ? 'Edit Employee'
                : 'Add Employee'}
            </Text>

            {/* Name */}

            <TextInput
              placeholder="Employee Name"
              style={styles.input}
              value={name}
              onChangeText={setName}
            />

            {/* Role Dropdown */}

            <View
              style={
                styles.pickerContainer
              }
            >

              <Picker
                selectedValue={role}
                onValueChange={(
                  itemValue
                ) =>
                  setRole(itemValue)
                }
                style={styles.picker}
              >

                <Picker.Item
                  label="Select Role"
                  value=""
                />

                <Picker.Item
                  label="Technical"
                  value="Technical"
                />

                <Picker.Item
                  label="Mentoring"
                  value="Mentoring"
                />

                <Picker.Item
                  label="Community"
                  value="Community"
                />

              </Picker>

            </View>

            {/* Date Picker */}

            <TouchableOpacity
              style={styles.dateButton}
              onPress={() =>
                setShowDatePicker(
                  true
                )
              }
            >

              <Ionicons
                name="calendar-outline"
                size={20}
                color={Colors.primary}
              />

              <Text
                style={
                  styles.dateText
                }
              >
                {joiningDate ||
                  'Select Joining Date'}
              </Text>

            </TouchableOpacity>

            {showDatePicker && (

              <DateTimePicker
                value={new Date()}

                mode="date"

                display={
                  Platform.OS ===
                  'ios'
                    ? 'spinner'
                    : 'default'
                }

                onChange={(
                  event,
                  selectedDate
                ) => {

                  setShowDatePicker(
                    false
                  )

                  if (
                    selectedDate
                  ) {

                    const day =
                      selectedDate
                        .getDate()
                        .toString()
                        .padStart(
                          2,
                          '0'
                        )

                    const month =
                      (
                        selectedDate.getMonth() +
                        1
                      )
                        .toString()
                        .padStart(
                          2,
                          '0'
                        )

                    const year =
                      selectedDate.getFullYear()

                    setJoiningDate(
                      `${day}/${month}/${year}`
                    )
                  }
                }}
              />
            )}

            {/* Buttons */}

            <View
              style={styles.modalButtons}
            >

              <TouchableOpacity
                style={
                  styles.cancelButton
                }
                onPress={() =>
                  setModalVisible(
                    false
                  )
                }
              >

                <Text
                  style={
                    styles.cancelText
                  }
                >
                  Cancel
                </Text>

              </TouchableOpacity>

              <TouchableOpacity
                style={
                  styles.saveButton
                }
                onPress={
                  handleSaveEmployee
                }
              >

                <Text
                  style={
                    styles.saveText
                  }
                >
                  Save
                </Text>

              </TouchableOpacity>

            </View>

          </View>

        </View>

      </Modal>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor:
      Colors.background,
  },

  searchWrapper: {
    marginTop: 18,

    marginHorizontal: 16,
  },

  searchContainer: {
    backgroundColor: '#fff',

    borderRadius: 18,

    flexDirection: 'row',

    alignItems: 'center',

    paddingHorizontal: 14,

    height: 56,

    elevation: 4,
  },

  searchInput: {
    flex: 1,

    marginLeft: 10,

    fontSize: 15,

    color: Colors.black,
  },

  tableHeader: {
    flexDirection: 'row',

    backgroundColor:
      Colors.primary,

    marginHorizontal: 16,

    marginTop: 18,

    borderRadius: 16,

    paddingVertical: 15,

    paddingHorizontal: 10,
  },

  headerText: {
    color: '#fff',

    fontSize: 13,

    fontWeight: 'bold',
  },

  row: {
    flexDirection: 'row',

    backgroundColor: '#fff',

    marginHorizontal: 16,

    marginTop: 12,

    borderRadius: 16,

    paddingVertical: 18,

    paddingHorizontal: 10,

    alignItems: 'center',

    elevation: 3,
  },

  cell: {
    fontSize: 12,

    color: Colors.black,
  },

  actionRow: {
    flex: 1,

    flexDirection: 'row',

    justifyContent:
      'space-around',
  },

  floatingButton: {
    position: 'absolute',

    bottom: 95,
    right: 22,

    width: 65,
    height: 65,

    borderRadius: 32.5,

    backgroundColor:
      Colors.primary,

    justifyContent: 'center',

    alignItems: 'center',

    elevation: 10,
  },

  modalBg: {
    flex: 1,

    backgroundColor:
      'rgba(0,0,0,0.4)',

    justifyContent: 'center',

    paddingHorizontal: 20,
  },

  modalCard: {
    backgroundColor: '#fff',

    borderRadius: 24,

    padding: 22,
  },

  modalTitle: {
    fontSize: 22,

    fontWeight: 'bold',

    color: Colors.primary,

    marginBottom: 20,
  },

  input: {
    backgroundColor:
      Colors.background,

    borderRadius: 14,

    padding: 16,

    marginBottom: 16,

    color: Colors.black,
  },

  pickerContainer: {
    backgroundColor:
      Colors.background,

    borderRadius: 14,

    marginBottom: 16,

    overflow: 'hidden',
  },

  picker: {
    color: Colors.black,
  },

  dateButton: {
    flexDirection: 'row',

    alignItems: 'center',

    backgroundColor:
      Colors.background,

    borderRadius: 14,

    padding: 16,

    marginBottom: 16,
  },

  dateText: {
    marginLeft: 10,

    color: Colors.black,
  },

  modalButtons: {
    flexDirection: 'row',

    justifyContent:
      'space-between',

    marginTop: 10,
  },

  cancelButton: {
    flex: 1,

    backgroundColor: '#e5e7eb',

    padding: 15,

    borderRadius: 14,

    marginRight: 10,

    alignItems: 'center',
  },

  saveButton: {
    flex: 1,

    backgroundColor:
      Colors.primary,

    padding: 15,

    borderRadius: 14,

    alignItems: 'center',
  },

  cancelText: {
    color: Colors.black,

    fontWeight: '600',
  },

  saveText: {
    color: '#fff',

    fontWeight: 'bold',
  },
})