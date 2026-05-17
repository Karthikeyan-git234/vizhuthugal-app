import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
  Platform,
} from 'react-native'

import {
  SafeAreaView,
} from 'react-native-safe-area-context'

import axios from 'axios'

import {
  useState,
  useEffect,
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

const BASE_URL =
  'https://vizhuthugal-backend-3jmj.onrender.com'

export default function EmployeeProfileScreen() {

  const [employees, setEmployees] =
    useState<any[]>([])

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

  const [phone, setPhone] =
    useState('')

  const [email, setEmail] =
    useState('')

  const [department, setDepartment] =
    useState('')

  const [joiningDate, setJoiningDate] =
    useState('')

  const [showDatePicker, setShowDatePicker] =
    useState(false)

  /* Fetch Employees */

  const fetchEmployees = async () => {

    try {

      const res =
        await axios.get(
          `${BASE_URL}/api/employees`
        )

      setEmployees(res.data)

    } catch (err) {

      console.log(err)

    }
  }

  useEffect(() => {

    fetchEmployees()

  }, [])

  /* Search */

  const filteredEmployees =
    employees.filter((item) =>
      item.name
        ?.toLowerCase()
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

          onPress: async () => {

            try {

              await axios.delete(

                `${BASE_URL}/api/employees/${id}`

              )

              fetchEmployees()

              Alert.alert(
                'Success',
                'Employee Deleted'
              )

            } catch (err) {

              console.log(err)

              Alert.alert(
                'Error',
                'Delete Failed'
              )

            }
          },
        },
      ]
    )
  }

  /* Open Modal */

  const openAddModal = () => {

    setEditId(null)

    setName('')

    setRole('')

    setPhone('')

    setEmail('')

    setDepartment('')

    setJoiningDate('')

    setModalVisible(true)
  }

  /* Edit */

  const handleEdit = (
    item: any
  ) => {

    setEditId(item.id.toString())

    setName(item.name)

    setRole(item.role)

    setPhone(item.phone)

    setEmail(item.email)

    setDepartment(item.department)

    setJoiningDate(
      item.joining_date
    )

    setModalVisible(true)
  }

  /* Save Employee */

  const handleSaveEmployee = async () => {

    if (
      !name ||
      !role ||
      !phone ||
      !email ||
      !department ||
      !joiningDate
    ) {

      Alert.alert(
        'Missing Fields',
        'Fill all details'
      )

      return
    }

    /* Phone Validation */

    const phoneRegex =
      /^[0-9]{10}$/

    if (
      !phoneRegex.test(phone)
    ) {

      Alert.alert(
        'Invalid Phone Number',
        'Phone number must contain exactly 10 digits'
      )

      return
    }

    /* Email Validation */

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (
      !emailRegex.test(email)
    ) {

      Alert.alert(
        'Invalid Email',
        'Enter a valid email address'
      )

      return
    }

    try {

      if (editId) {

        await axios.put(

          `${BASE_URL}/api/employees/${editId}`,

          {
            name,
            role,
            phone,
            email,
            department,
            joiningDate,
          }

        )

      } else {

        await axios.post(

          `${BASE_URL}/api/employees`,

          {
            name,
            role,
            phone,
            email,
            department,
            joiningDate,
          }

        )
      }

      fetchEmployees()

      Alert.alert(
        'Success',
        editId
          ? 'Employee Updated Successfully'
          : 'Employee Added Successfully'
      )

      setModalVisible(false)

      setEditId(null)

      setName('')

      setRole('')

      setPhone('')

      setEmail('')

      setDepartment('')

      setJoiningDate('')

    } catch (err) {

      console.log(err)

      Alert.alert(
        'Error',
        'Failed to save employee'
      )

    }
  }

  return (

    <SafeAreaView
      style={styles.container}
    >

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

      {/* Empty State */}

      {
        filteredEmployees.length === 0 ? (

          <View style={styles.emptyContainer}>

            <Ionicons
              name="document-text-outline"
              size={70}
              color="#cbd5e1"
            />

            <Text style={styles.emptyTitle}>
              No Details Found
            </Text>

            <Text style={styles.emptySubtitle}>
              Add employees to view details here
            </Text>

          </View>

        ) : (

          <FlatList
            data={filteredEmployees}

            keyExtractor={(item) =>
              item.id.toString()
            }

            contentContainerStyle={{
              paddingBottom: 120,
            }}

            renderItem={({ item }) => (

              <View style={styles.employeeCard}>

                {/* Top */}

                <View style={styles.cardTop}>

                  <View
                    style={
                      styles.avatarContainer
                    }
                  >

                    <Text
                      style={
                        styles.avatarText
                      }
                    >
                      {item.name?.charAt(0)}
                    </Text>

                  </View>

                  <View
                    style={
                      styles.employeeInfo
                    }
                  >

                    <Text
                      style={
                        styles.employeeName
                      }
                    >
                      {item.name}
                    </Text>

                    <Text
                      style={
                        styles.employeeRole
                      }
                    >
                      {item.role}
                    </Text>

                  </View>

                  {/* Actions */}

                  <View
                    style={
                      styles.actionButtons
                    }
                  >

                    {/* Edit */}

                    <TouchableOpacity
                      style={
                        styles.editButton
                      }
                      onPress={() =>
                        handleEdit(item)
                      }
                    >

                      <Ionicons
                        name="create-outline"
                        size={18}
                        color="#2563eb"
                      />

                    </TouchableOpacity>

                    {/* Delete */}

                    <TouchableOpacity
                      style={
                        styles.deleteButton
                      }
                      onPress={() =>
                        handleDelete(
                          item.id.toString()
                        )
                      }
                    >

                      <Ionicons
                        name="trash-outline"
                        size={18}
                        color="#ef4444"
                      />

                    </TouchableOpacity>

                  </View>

                </View>

                {/* Divider */}

                <View
                  style={styles.divider}
                />

                {/* Details */}

                <View
                  style={
                    styles.detailsContainer
                  }
                >

                  <View
                    style={styles.detailRow}
                  >

                    <Text
                      style={
                        styles.detailLabel
                      }
                    >
                      Phone
                    </Text>

                    <Text
                      style={
                        styles.detailValue
                      }
                    >
                      {item.phone}
                    </Text>

                  </View>

                  <View
                    style={styles.detailRow}
                  >

                    <Text
                      style={
                        styles.detailLabel
                      }
                    >
                      Email
                    </Text>

                    <Text
                      style={
                        styles.detailValue
                      }
                    >
                      {item.email}
                    </Text>

                  </View>

                  <View
                    style={styles.detailRow}
                  >

                    <Text
                      style={
                        styles.detailLabel
                      }
                    >
                      Department
                    </Text>

                    <Text
                      style={
                        styles.detailValue
                      }
                    >
                      {item.department}
                    </Text>

                  </View>

                  <View
                    style={styles.detailRow}
                  >

                    <Text
                      style={
                        styles.detailLabel
                      }
                    >
                      Joining Date
                    </Text>

                    <Text
                      style={
                        styles.detailValue
                      }
                    >
                      {item.joining_date}
                    </Text>

                  </View>

                </View>

              </View>
            )}
          />
        )
      }

      {/* Floating Button */}

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

            <Text
              style={styles.modalTitle}
            >
              {editId
                ? 'Edit Employee'
                : 'Add Employee'}
            </Text>

            {/* Employee Name */}

            <Text
              style={styles.inputLabel}
            >
              Employee Name
            </Text>

            <TextInput
              placeholder="Enter employee name"
              style={styles.input}
              value={name}
              onChangeText={setName}
            />

            {/* Phone */}

            <Text
              style={styles.inputLabel}
            >
              Phone Number
            </Text>

            <TextInput
              placeholder="Enter 10 digit phone number"
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              maxLength={10}
            />

            {/* Email */}

            <Text
              style={styles.inputLabel}
            >
              Email Address
            </Text>

            <TextInput
              placeholder="Enter email address"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {/* Department */}

            <Text
              style={styles.inputLabel}
            >
              Department
            </Text>

            <TextInput
              placeholder="Enter department"
              style={styles.input}
              value={department}
              onChangeText={setDepartment}
            />

            {/* Role */}

            <Text
              style={styles.inputLabel}
            >
              Employee Role
            </Text>

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

            {/* Joining Date */}

            <Text
              style={styles.inputLabel}
            >
              Joining Date
            </Text>

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
                  'Select joining date'}
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
                      `${year}-${month}-${day}`
                     )
                  }
                }}
              />
            )}

            {/* Buttons */}

            <View
              style={
                styles.modalButtons
              }
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
                  {editId
                    ? 'Update'
                    : 'Save'}
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

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 120,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.black,
    marginTop: 16,
  },

  emptySubtitle: {
    fontSize: 14,
    color: Colors.gray,
    marginTop: 8,
  },

  employeeCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 24,
    padding: 18,
    elevation: 4,
  },

  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatarContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor:
      Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  employeeInfo: {
    flex: 1,
    marginLeft: 14,
  },

  employeeName: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.black,
  },

  employeeRole: {
    fontSize: 13,
    color: Colors.gray,
    marginTop: 2,
  },

  actionButtons: {
    flexDirection: 'row',
  },

  editButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  deleteButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#fee2e2',
    justifyContent: 'center',
    alignItems: 'center',
  },

  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 16,
  },

  detailsContainer: {
    gap: 10,
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
  },

  detailLabel: {
    fontSize: 13,
    color: Colors.gray,
    fontWeight: '600',
  },

  detailValue: {
    fontSize: 13,
    color: Colors.black,
    fontWeight: '600',
    maxWidth: '60%',
    textAlign: 'right',
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

  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 8,
    marginTop: 4,
  },

  input: {
    backgroundColor:
      Colors.background,
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    color: Colors.black,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },

  pickerContainer: {
    backgroundColor:
      Colors.background,
    borderRadius: 14,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e5e7eb',
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
    borderWidth: 1,
    borderColor: '#e5e7eb',
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