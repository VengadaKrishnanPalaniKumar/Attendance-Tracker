import { useState } from "react";
import { Users, Calendar, BarChart3, Plus, Check, X, Edit3, Trash2, Save, UserCheck, UserX, Clock } from "lucide-react";

export default function ClassroomAttendanceTracker() {
  const [activeTab, setActiveTab] = useState('attendance');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  // Students State
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Udhya Kumar.K",
      rollNumber: "95222303086",
      email: "udhyakumar86@gmail.com",
      phone: "9600866971"
    },
    {
      id: 2,
      name: "Vengada Krishnan.P",
      rollNumber: "95222303087",
      email: "vengatkrishnan87@gmail.com",
      phone: "9043216387"
    },
    {
      id: 3,
      name: "Vignesh Kumar.C",
      rollNumber: "95222303088",
      email: "vigneshkumar88@gmail.com",
      phone: "9876543210"
    },
    {
      id: 4,
      name: "Vinoth Kumar.S",
      rollNumber: "95222303089",
      email: "vinothkumar89@gmail.com",
      phone: "9123456789"
    }
  ]);

  // Attendance Records State
  const [attendanceRecords, setAttendanceRecords] = useState([
    { id: 1, studentId: 1, date: "2024-01-15", status: "present", remarks: "" },
    { id: 2, studentId: 2, date: "2024-01-15", status: "absent", remarks: "Sick leave" },
    { id: 3, studentId: 3, date: "2024-01-15", status: "present", remarks: "" },
    { id: 4, studentId: 4, date: "2024-01-15", status: "late", remarks: "Traffic" },
    { id: 5, studentId: 5, date: "2024-01-15", status: "present", remarks: "" },
    { id: 6, studentId: 1, date: "2024-01-16", status: "present", remarks: "" },
    { id: 7, studentId: 2, date: "2024-01-16", status: "present", remarks: "" },
    { id: 8, studentId: 3, date: "2024-01-16", status: "absent", remarks: "Family emergency" },
    { id: 9, studentId: 4, date: "2024-01-16", status: "present", remarks: "" },
    { id: 10, studentId: 5, date: "2024-01-16", status: "late", remarks: "" }
  ]);

  // New Student Form State
  const [newStudent, setNewStudent] = useState({
    name: "",
    rollNumber: "",
    email: "",
    phone: ""
  });

  // Class Settings State
  const [classSettings, setClassSettings] = useState({
    departmentName: "Computer Science Enginnering",
    teacher: "Dr. Suresh Kumar",
    semester: "Fifth Semester"
  });

  // Get today's attendance for a student
  const getTodayAttendance = (studentId, date = selectedDate) => {
    return attendanceRecords.find(record => 
      record.studentId === studentId && record.date === date
    );
  };
}
 