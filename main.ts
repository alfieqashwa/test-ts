const DATA = [
  {
    id: "1",
    name: "Jadwal Mengajar 1",
    startInTime: "07:00",
    endInTime: "09:01",
    startOutTime: "09:00",
    endOutTime: "13:00",
    days: [
      { name: "Senin", enabled: true },
      { name: "Selasa", enabled: true },
      { name: "Rabu", enabled: false },
      { name: "Kamis", enabled: false },
      { name: "Jumat", enabled: false },
      { name: "Sabtu", enabled: false },
      { name: "Minggu", enabled: false }
    ],
    schoolId: "123456",
    enabled: true,
    userId: "school-admin@school.ac.id"
  },
  {
    id: "2",
    name: "Jadwal Mengajar 2",
    startInTime: "12:00",
    endInTime: "13:00",
    startOutTime: "17:00",
    endOutTime: "18:00",
    days: [
      { name: "Senin", enabled: true },
      { name: "Selasa", enabled: true },
      { name: "Rabu", enabled: false },
      { name: "Kamis", enabled: false },
      { name: "Jumat", enabled: false },
      { name: "Sabtu", enabled: false },
      { name: "Minggu", enabled: false }
    ],
    schoolId: "123456",
    enabled: true,
    userId: "school-admin@school.ac.id"
  },
  {
    id: "3",
    name: "Jadwal Mengajar 3",
    startInTime: "06:00",
    endInTime: "07:00",
    startOutTime: "13:00",
    endOutTime: "14:00",
    days: [
      { name: "Senin", enabled: true },
      { name: "Selasa", enabled: true },
      { name: "Rabu", enabled: true },
      { name: "Kamis", enabled: true },
      { name: "Jumat", enabled: true },
      { name: "Sabtu", enabled: true },
      { name: "Minggu", enabled: false }
    ],
    schoolId: "123456",
    enabled: false,
    userId: "school-admin@school.ac.id"
  },
  {
    id: "4",
    name: "Jadwal Mengajar 4",
    startInTime: "06:00",
    endInTime: "07:00",
    startOutTime: "14:00",
    endOutTime: "19:00",
    days: [
      { name: "Senin", enabled: true },
      { name: "Selasa", enabled: true },
      { name: "Rabu", enabled: false },
      { name: "Kamis", enabled: false },
      { name: "Jumat", enabled: false },
      { name: "Sabtu", enabled: false },
      { name: "Minggu", enabled: false }
    ],
    schoolId: "123456",
    enabled: false,
    userId: "school-admin@school.ac.id"
  },
  {
    id: "5",
    name: "Jadwal Mengajar 5",
    startInTime: "06:00",
    endInTime: "07:00",
    startOutTime: "13:00",
    endOutTime: "14:00",
    days: [
      { name: "Senin", enabled: true },
      { name: "Selasa", enabled: true },
      { name: "Rabu", enabled: true },
      { name: "Kamis", enabled: true },
      { name: "Jumat", enabled: true },
      { name: "Sabtu", enabled: true },
      { name: "Minggu", enabled: false }
    ],
    schoolId: "123456",
    enabled: false,
    userId: "school-admin@school.ac.id"
  },
  {
    id: "6",
    name: "Jadwal Mengajar 6",
    startInTime: "06:00",
    endInTime: "07:00",
    startOutTime: "14:00",
    endOutTime: "19:00",
    days: [
      { name: "Senin", enabled: true },
      { name: "Selasa", enabled: true },
      { name: "Rabu", enabled: false },
      { name: "Kamis", enabled: false },
      { name: "Jumat", enabled: false },
      { name: "Sabtu", enabled: false },
      { name: "Minggu", enabled: false }
    ],
    schoolId: "123456",
    enabled: false,
    userId: "school-admin@school.ac.id"
  },
]

interface IDay {
  enabled: boolean
  name: string
}
export interface IAttendanceCardSchedule {
  id: string
  name: string
  startInTime?: string | null
  endInTime?: string | null
  startOutTime?: string | null
  endOutTime?: string | null
  enabled: boolean
  schoolId: string
  days: IDay[]
}

const INTERNET_BORN: string = "1970-01-01T"
function validateSchedule(input: IAttendanceCardSchedule[]): string {

  //? 1. FILTER DATA NEED TO CHECK

  //* 1a. filter enabled & filter day enabled
  const filteredSchedule = input
    .filter((s) => s.enabled)
    .map((s) => {
      const enabledDay = s.days.filter((day) => day.enabled)
      return { ...s, days: enabledDay }
    })

  // console.log(JSON.stringify(filteredSchedule, null, 2))

  //* 1b. convert time to datetimestring
  const convertedTime = filteredSchedule.map((s) => ({
    ...s,
    startInTime: s.startInTime == null ? s.startInTime : INTERNET_BORN + s.startInTime,
    endInTime: s.endInTime == null ? s.endInTime : INTERNET_BORN + s.endInTime,
    startOutTime: s.startOutTime == null ? s.startOutTime : INTERNET_BORN + s.startOutTime,
    endOutTime: s.endOutTime == null ? s.endOutTime : INTERNET_BORN + s.endOutTime,
  }))

  console.log(JSON.stringify(convertedTime, null, 2))

  //? 2. VALIDATION

  function validation(data: IAttendanceCardSchedule[]): void {

    //* 2a. Check if there's null time
    const isNullOrEmptyStringInTime = data?.some((s) =>
      (s.startInTime == null || s.startInTime === INTERNET_BORN)
      || (s.endInTime == null || s.endInTime === INTERNET_BORN)
      || (s.startOutTime == null || s.startOutTime === INTERNET_BORN)
      || (s.endOutTime == null || s.endOutTime === INTERNET_BORN)
    )

    //* 2b. Check if two ranges overlap
    const hasOverlapRange = data.some((s) =>
      (s.startInTime as string) < (s.endOutTime as string) && (s.startOutTime as string) < (s.endInTime as string)
    )

    if (isNullOrEmptyStringInTime) {
      console.log(`Failed. There's at least one null value in time`)
    } else {
      console.log(`Success. There's no null value in time`)
    }

    if (isNullOrEmptyStringInTime) return
    if (hasOverlapRange) {
      console.group(`:::hasOverlapRange::: `)
      console.log(`hasOverlapRange::: `, hasOverlapRange)
      console.log(`Failed. There's at least one overlap range schedule`)
      console.groupEnd()
    } else {
      console.group(`:::hasOverlapRange::: `)
      console.log(hasOverlapRange)
      console.log(`Success. There's no overlap range schedule`)
      console.groupEnd()
    }
  }

  validation(convertedTime)

  return ""
}

validateSchedule(DATA)

// Filter data
// 1. filter enabled dan filter day enabled
// 2. convert time to datetimestring

// Validation
// 1. check isNullInTime (fun some())
// 2a. check isOverlap range dalam/intra Schedule 
// 2b. check isOverlap range antar/inter Schedule dgn hari yang sama.
// 3b. Compare hari yg sama -> combine between filter() includes()

// const x = ["senin", "kamis", "jumat"];
// const y = ["senin", "minggu", "jumat"];
// x.filter((xx) => y.includes(xx))
// forEach 

// sorting two iterator // compare dua array