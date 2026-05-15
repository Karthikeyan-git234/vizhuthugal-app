import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import API from '../services/api'

import DateTimePicker from '@react-native-community/datetimepicker'

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Animated,
  Modal,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native'

import {
  Ionicons,
  Entypo,
  MaterialIcons,
} from '@expo/vector-icons'

import Colors from '../constants/colors'

export default function AttendanceScreen() {

  const [attendance, setAttendance] =
    useState<any[]>([])

  const [loading, setLoading] =
    useState(true)

  const [modalVisible, setModalVisible] =
    useState(false)

  const [editMode, setEditMode] =
    useState(false)

  const [selectedId, setSelectedId] =
    useState<number | null>(null)

  const [employeeName, setEmployeeName] =
    useState('')

  const [workDone, setWorkDone] =
    useState('')

  const [search, setSearch] =
    useState('')

  const [selectedDate, setSelectedDate] =
    useState<Date | null>(null)

  const [showFilterDatePicker, setShowFilterDatePicker] =
    useState(false)

  const [showSuccess, setShowSuccess] =
    useState(false)

  const slideAnim = useRef(
    new Animated.Value(-120)
  ).current

  const [checkIn, setCheckIn] =
    useState(new Date())

  const [checkOut, setCheckOut] =
    useState(new Date())

  const [
    showCheckInPicker,
    setShowCheckInPicker,
  ] = useState(false)

  const [
    showCheckOutPicker,
    setShowCheckOutPicker,
  ] = useState(false)

  // =====================================
  // FETCH
  // =====================================

  const fetchAttendance =
    async () => {

      try {

        const res =
          await API.get('/work')

        setAttendance(res.data)

      } catch (err) {

        console.log(err)

      } finally {

        setLoading(false)

      }
    }

  useEffect(() => {

    fetchAttendance()

  }, [])

  // =====================================
  // FILTERED DATA
  // =====================================

  const filteredAttendance =
    useMemo(() => {

      return attendance.filter(
        (item) => {

          const matchesSearch =

            item.employee_name
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              )

          const matchesDate =

            selectedDate
              ? new Date(
                  item.created_at
                ).toDateString() ===
                selectedDate.toDateString()
              : true

          return (
            matchesSearch &&
            matchesDate
          )
        }
      )

    }, [
      attendance,
      search,
      selectedDate,
    ])

  // =====================================
  // SUCCESS MESSAGE
  // =====================================

  const showSuccessMessage = () => {

    setShowSuccess(true)

    Animated.timing(
      slideAnim,
      {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }
    ).start()

    setTimeout(() => {

      Animated.timing(
        slideAnim,
        {
          toValue: -120,
          duration: 500,
          useNativeDriver: true,
        }
      ).start()

      setTimeout(() => {

        setShowSuccess(false)

      }, 500)

    }, 2200)
  }

  // =====================================
  // ADD / UPDATE
  // =====================================

  const handleSubmit =
    async () => {

      if (
        !employeeName ||
        !workDone
      ) {

        Alert.alert(
          'Validation',
          'Fill all fields'
        )

        return
      }

      try {

        const payload = {

          employeeName,

          checkIn,

          checkOut,

          workDone,

        }

        if (
          editMode &&
          selectedId
        ) {

          await API.put(

            `/work/${selectedId}`,

            payload

          )

        } else {

          await API.post(
            '/work',
            payload
          )
        }

        fetchAttendance()

        resetForm()

        showSuccessMessage()

      } catch (error: any) {

        Alert.alert(
          'Error',
          error.response?.data
            ?.message ||
            'Something went wrong'
        )
      }
    }

  // =====================================
  // EDIT
  // =====================================

  const handleEdit = (
    item: any
  ) => {

    setEditMode(true)

    setSelectedId(item.id)

    setEmployeeName(
      item.employee_name
    )

    setWorkDone(
      item.work_done
    )

    setCheckIn(
      new Date(item.check_in)
    )

    setCheckOut(
      new Date(item.check_out)
    )

    setModalVisible(true)
  }

  // =====================================
  // DELETE
  // =====================================

  const handleDelete =
    (id: number) => {

      Alert.alert(

        'Delete Attendance',

        'Are you sure?',

        [

          {
            text: 'Cancel',
            style: 'cancel',
          },

          {
            text: 'Delete',

            style: 'destructive',

            onPress:
              async () => {

                try {

                  await API.delete(
                    `/work/${id}`
                  )

                  fetchAttendance()

                  showSuccessMessage()

                } catch (err) {

                  console.log(err)

                }
              },
          },
        ]
      )
    }

  // =====================================
  // RESET
  // =====================================

  const resetForm = () => {

    setEmployeeName('')

    setWorkDone('')

    setCheckIn(new Date())

    setCheckOut(new Date())

    setSelectedId(null)

    setEditMode(false)

    setModalVisible(false)
  }

  return (

    <View style={styles.container}>

      <StatusBar
        barStyle="dark-content"
      />

      {/* Success */}

      {
        showSuccess && (

          <Animated.View

            style={[

              styles.successBox,

              {
                transform: [
                  {
                    translateY:
                      slideAnim,
                  },
                ],
              },

            ]}
          >

            <Ionicons
              name="checkmark-circle"
              size={22}
              color="#fff"
            />

            <Text
              style={
                styles.successText
              }
            >

              Action Completed Successfully

            </Text>

          </Animated.View>
        )
      }

      {/* Header */}

      <View style={styles.header}>

        <View>

          <Text style={styles.heading}>

            Attendance

          </Text>

          <Text
            style={
              styles.subHeading
            }
          >

            Employee attendance records

          </Text>

        </View>

        <View
          style={
            styles.headerIcon
          }
        >

          <Entypo
            name="calendar"
            size={24}
            color="#fff"
          />

        </View>

      </View>

      {/* Search */}

      <View style={styles.searchContainer}>

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

      {/* Filter */}

      <TouchableOpacity

        style={styles.filterButton}

        onPress={() =>
          setShowFilterDatePicker(
            true
          )
        }
      >

        <Ionicons
          name="calendar-outline"
          size={18}
          color="#fff"
        />

        <Text
          style={
            styles.filterText
          }
        >

          {
            selectedDate
              ? selectedDate.toDateString()
              : 'Filter By Date'
          }

        </Text>

      </TouchableOpacity>

      {
        showFilterDatePicker && (

          <DateTimePicker
            value={
              selectedDate ||
              new Date()
            }
            mode="date"
            onChange={(
              e,
              date
            ) => {

              setShowFilterDatePicker(
                false
              )

              if (date) {

                setSelectedDate(
                  date
                )
              }
            }}
          />
        )
      }

      {/* Clear Filter */}

      {
        selectedDate && (

          <TouchableOpacity

            style={
              styles.clearButton
            }

            onPress={() =>
              setSelectedDate(
                null
              )
            }
          >

            <Text
              style={
                styles.clearText
              }
            >

              Clear Date Filter

            </Text>

          </TouchableOpacity>
        )
      }

      {/* List */}

      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
      >

        {
          loading ? (

            <ActivityIndicator
              size="large"
              color={
                Colors.primary
              }
              style={{
                marginTop: 60,
              }}
            />

          ) : filteredAttendance.length === 0 ? (

            <View
              style={
                styles.emptyContainer
              }
            >

              <Ionicons
                name="document-text-outline"
                size={80}
                color="#cbd5e1"
              />

              <Text
                style={
                  styles.emptyTitle
                }
              >

                No Records Found

              </Text>

            </View>

          ) : (

            filteredAttendance.map(
              (
                item,
                index
              ) => (

                <View
                  key={index}
                  style={
                    styles.card
                  }
                >

                  {/* Top */}

                  <View
                    style={
                      styles.cardTop
                    }
                  >

                    <View
                      style={
                        styles.avatar
                      }
                    >

                      <Text
                        style={
                          styles.avatarText
                        }
                      >

                        {
                          item.employee_name?.charAt(
                            0
                          )
                        }

                      </Text>

                    </View>

                    <View
                      style={{
                        flex: 1,
                      }}
                    >

                      <Text
                        style={
                          styles.employeeName
                        }
                      >

                        {
                          item.employee_name
                        }

                      </Text>

                      <Text
                        style={
                          styles.dateText
                        }
                      >

                        {
                          new Date(
                            item.created_at
                          ).toDateString()
                        }

                      </Text>

                    </View>

                    {/* Actions */}

                    <View
                      style={
                        styles.actionRow
                      }
                    >

                      <TouchableOpacity

                        style={
                          styles.editButton
                        }

                        onPress={() =>
                          handleEdit(
                            item
                          )
                        }
                      >

                        <MaterialIcons
                          name="edit"
                          size={18}
                          color="#2563eb"
                        />

                      </TouchableOpacity>

                      <TouchableOpacity

                        style={
                          styles.deleteButton
                        }

                        onPress={() =>
                          handleDelete(
                            item.id
                          )
                        }
                      >

                        <MaterialIcons
                          name="delete"
                          size={18}
                          color="#dc2626"
                        />

                      </TouchableOpacity>

                    </View>

                  </View>

                  {/* Times */}

                  <View
                    style={
                      styles.timeRow
                    }
                  >

                    <View
                      style={
                        styles.timeBox
                      }
                    >

                      <Text
                        style={
                          styles.timeLabel
                        }
                      >

                        Check In

                      </Text>

                      <Text
                        style={
                          styles.timeValue
                        }
                      >

                        {
                          new Date(
                            item.check_in
                          ).toLocaleTimeString(
                            [],
                            {
                              hour:
                                '2-digit',
                              minute:
                                '2-digit',
                            }
                          )
                        }

                      </Text>

                    </View>

                    <View
                      style={
                        styles.timeBox
                      }
                    >

                      <Text
                        style={
                          styles.timeLabel
                        }
                      >

                        Check Out

                      </Text>

                      <Text
                        style={
                          styles.timeValue
                        }
                      >

                        {
                          new Date(
                            item.check_out
                          ).toLocaleTimeString(
                            [],
                            {
                              hour:
                                '2-digit',
                              minute:
                                '2-digit',
                            }
                          )
                        }

                      </Text>

                    </View>

                  </View>

                  {/* Work */}

                  <View
                    style={
                      styles.workBox
                    }
                  >

                    <Text
                      style={
                        styles.workTitle
                      }
                    >

                      Work Done

                    </Text>

                    <Text
                      style={
                        styles.workText
                      }
                    >

                      {
                        item.work_done
                      }

                    </Text>

                  </View>

                </View>
              )
            )
          )
        }

      </ScrollView>

      {/* FAB */}

      <TouchableOpacity

        style={styles.fab}

        activeOpacity={0.85}

        onPress={() => {

          resetForm()

          setModalVisible(true)

        }}
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
        animationType="slide"
        transparent
      >

        <View style={styles.modalBg}>

          <View style={styles.modalCard}>

            <Text
              style={
                styles.modalTitle
              }
            >

              {
                editMode
                  ? 'Edit Attendance'
                  : 'Add Attendance'
              }

            </Text>

            <TextInput
              placeholder="Employee Name"
              placeholderTextColor={
                Colors.gray
              }
              style={styles.input}
              value={employeeName}
              onChangeText={
                setEmployeeName
              }
            />

            <TouchableOpacity

              style={
                styles.input
              }

              onPress={() =>
                setShowCheckInPicker(
                  true
                )
              }
            >

              <Text>

                Check In :
                {' '}

                {
                  checkIn.toLocaleTimeString()
                }

              </Text>

            </TouchableOpacity>

            {
              showCheckInPicker && (

                <DateTimePicker
                  value={checkIn}
                  mode="time"
                  onChange={(
                    e,
                    date
                  ) => {

                    setShowCheckInPicker(
                      false
                    )

                    if (date) {

                      setCheckIn(
                        date
                      )
                    }
                  }}
                />
              )
            }

            <TouchableOpacity

              style={
                styles.input
              }

              onPress={() =>
                setShowCheckOutPicker(
                  true
                )
              }
            >

              <Text>

                Check Out :
                {' '}

                {
                  checkOut.toLocaleTimeString()
                }

              </Text>

            </TouchableOpacity>

            {
              showCheckOutPicker && (

                <DateTimePicker
                  value={checkOut}
                  mode="time"
                  onChange={(
                    e,
                    date
                  ) => {

                    setShowCheckOutPicker(
                      false
                    )

                    if (date) {

                      setCheckOut(
                        date
                      )
                    }
                  }}
                />
              )
            }

            <TextInput
              placeholder="Work Done"
              placeholderTextColor={
                Colors.gray
              }
              multiline
              style={
                styles.textArea
              }
              value={workDone}
              onChangeText={
                setWorkDone
              }
            />

            {/* Buttons */}

            <View
              style={
                styles.buttonRow
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
                  styles.submitButton
                }

                onPress={
                  handleSubmit
                }
              >

                <Text
                  style={
                    styles.submitText
                  }
                >

                  {
                    editMode
                      ? 'Update'
                      : 'Save'
                  }

                </Text>

              </TouchableOpacity>

            </View>

          </View>

        </View>

      </Modal>

    </View>
  )
}

const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor:
      Colors.background,

    padding: 16,

    paddingTop: 55,

  },

  header: {

    flexDirection: 'row',

    justifyContent:
      'space-between',

    alignItems: 'center',

    marginBottom: 18,

  },

  heading: {

    fontSize: 30,

    fontWeight: 'bold',

    color: Colors.black,

  },

  subHeading: {

    color: Colors.gray,

    marginTop: 3,

    fontSize: 13,

  },

  headerIcon: {

    width: 55,

    height: 55,

    borderRadius: 18,

    backgroundColor:
      Colors.primary,

    justifyContent: 'center',

    alignItems: 'center',

  },

  searchContainer: {

    flexDirection: 'row',

    alignItems: 'center',

    backgroundColor:
      Colors.white,

    borderRadius: 16,

    paddingHorizontal: 15,

    marginBottom: 14,

    height: 55,

    elevation: 2,

  },

  searchInput: {

    flex: 1,

    marginLeft: 10,

    color: Colors.black,

  },

  filterButton: {

    height: 50,

    backgroundColor:
      Colors.primary,

    borderRadius: 14,

    justifyContent: 'center',

    alignItems: 'center',

    flexDirection: 'row',

    marginBottom: 10,

  },

  filterText: {

    color: '#fff',

    marginLeft: 8,

    fontWeight: '600',

  },

  clearButton: {

    alignSelf: 'flex-end',

    marginBottom: 12,

  },

  clearText: {

    color: '#dc2626',

    fontWeight: '600',

  },

  card: {

    backgroundColor:
      Colors.white,

    borderRadius: 22,

    padding: 16,

    marginBottom: 14,

    elevation: 3,

  },

  cardTop: {

    flexDirection: 'row',

    alignItems: 'center',

    marginBottom: 12,

  },

  avatar: {

    width: 48,

    height: 48,

    borderRadius: 16,

    backgroundColor:
      Colors.primary,

    justifyContent: 'center',

    alignItems: 'center',

    marginRight: 12,

  },

  avatarText: {

    color: '#fff',

    fontSize: 20,

    fontWeight: 'bold',

  },

  employeeName: {

    fontSize: 16,

    fontWeight: 'bold',

    color: Colors.black,

  },

  dateText: {

    color: Colors.gray,

    marginTop: 3,

    fontSize: 12,

  },

  actionRow: {

    flexDirection: 'row',

    alignItems: 'center',

    gap: 8,

  },

  editButton: {

    width: 34,

    height: 34,

    borderRadius: 12,

    backgroundColor:
      '#dbeafe',

    justifyContent: 'center',

    alignItems: 'center',

  },

  deleteButton: {

    width: 34,

    height: 34,

    borderRadius: 12,

    backgroundColor:
      '#fee2e2',

    justifyContent: 'center',

    alignItems: 'center',

  },

  timeRow: {

    flexDirection: 'row',

    justifyContent:
      'space-between',

    marginBottom: 12,

  },

  timeBox: {

    flex: 1,

    backgroundColor:
      '#f8fafc',

    padding: 12,

    borderRadius: 14,

    marginHorizontal: 3,

  },

  timeLabel: {

    fontSize: 11,

    color: Colors.gray,

  },

  timeValue: {

    marginTop: 5,

    fontWeight: 'bold',

    color: Colors.black,

  },

  workBox: {

    backgroundColor:
      '#f8fafc',

    padding: 14,

    borderRadius: 14,

  },

  workTitle: {

    fontWeight: 'bold',

    color: Colors.black,

    marginBottom: 6,

    fontSize: 13,

  },

  workText: {

    color: Colors.gray,

    lineHeight: 20,

    fontSize: 13,

  },

  fab: {

    position: 'absolute',

    right: 22,

    bottom: 25,

    width: 62,

    height: 62,

    borderRadius: 22,

    backgroundColor:
      Colors.primary,

    justifyContent: 'center',

    alignItems: 'center',

    elevation: 8,

  },

  modalBg: {

    flex: 1,

    backgroundColor:
      'rgba(0,0,0,0.35)',

    justifyContent: 'flex-end',

  },

  modalCard: {

    backgroundColor:
      Colors.white,

    borderTopLeftRadius: 28,

    borderTopRightRadius: 28,

    padding: 22,

  },

  modalTitle: {

    fontSize: 22,

    fontWeight: 'bold',

    marginBottom: 18,

    color: Colors.black,

  },

  input: {

    backgroundColor:
      '#f8fafc',

    borderRadius: 14,

    padding: 15,

    marginBottom: 14,

    borderWidth: 1,

    borderColor: '#e2e8f0',

  },

  textArea: {

    backgroundColor:
      '#f8fafc',

    borderRadius: 14,

    padding: 15,

    height: 110,

    textAlignVertical: 'top',

    borderWidth: 1,

    borderColor: '#e2e8f0',

    marginBottom: 18,

  },

  buttonRow: {

    flexDirection: 'row',

    justifyContent:
      'space-between',

  },

  cancelButton: {

    flex: 1,

    height: 52,

    borderRadius: 16,

    backgroundColor:
      '#e2e8f0',

    justifyContent: 'center',

    alignItems: 'center',

    marginRight: 10,

  },

  submitButton: {

    flex: 1,

    height: 52,

    borderRadius: 16,

    backgroundColor:
      Colors.primary,

    justifyContent: 'center',

    alignItems: 'center',

  },

  cancelText: {

    fontWeight: 'bold',

    color: Colors.black,

  },

  submitText: {

    fontWeight: 'bold',

    color: '#fff',

  },

  emptyContainer: {

    marginTop: 120,

    alignItems: 'center',

  },

  emptyTitle: {

    marginTop: 16,

    fontSize: 22,

    fontWeight: 'bold',

    color: Colors.gray,

  },

  successBox: {

    position: 'absolute',

    top: 20,

    left: 20,

    right: 20,

    backgroundColor:
      '#16a34a',

    padding: 16,

    borderRadius: 16,

    flexDirection: 'row',

    alignItems: 'center',

    zIndex: 999,

  },

  successText: {

    color: '#fff',

    marginLeft: 10,

    fontWeight: '600',

  },

})