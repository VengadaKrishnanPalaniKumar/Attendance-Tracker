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

  // Update attendance status
  const updateAttendanceStatus = (studentId, status, remarks = "") => {
    const existingRecord = getTodayAttendance(studentId, selectedDate);
    
    if (existingRecord) {
      setAttendanceRecords(prev => 
        prev.map(record => 
          record.id === existingRecord.id 
            ? { ...record, status, remarks }
            : record
        )
      );
    } else {
      const newRecord = {
        id: Date.now(),
        studentId,
        date: selectedDate,
        status,
        remarks
      };
      setAttendanceRecords(prev => [...prev, newRecord]);
    }
  };

  // Add new student
  const handleAddStudent = () => {
    if (newStudent.name && newStudent.rollNumber) {
      const student = {
        id: students.length + 1,
        ...newStudent
      };
      setStudents([...students, student]);
      setNewStudent({ name: "", rollNumber: "", email: "", phone: "" });
      setShowAddStudent(false);
    }
  };

  // Delete student
  const handleDeleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
    setAttendanceRecords(attendanceRecords.filter(record => record.studentId !== id));
  };

  // Edit student
  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setNewStudent(student);
    setShowAddStudent(true);
  };

  // Save edited student
  const handleSaveStudent = () => {
    if (editingStudent) {
      setStudents(prev => 
        prev.map(student => 
          student.id === editingStudent.id 
            ? { ...student, ...newStudent }
            : student
        )
      );
    } else {
      handleAddStudent();
    }
    setEditingStudent(null);
    setNewStudent({ name: "", rollNumber: "", email: "", phone: "" });
    setShowAddStudent(false);
  };

  // Get attendance statistics
  const getAttendanceStats = (studentId) => {
    const studentRecords = attendanceRecords.filter(record => record.studentId === studentId);
    const totalDays = studentRecords.length;
    const presentDays = studentRecords.filter(record => record.status === 'present').length;
    const lateDays = studentRecords.filter(record => record.status === 'late').length;
    const absentDays = studentRecords.filter(record => record.status === 'absent').length;
    
    return {
      totalDays,
      presentDays,
      lateDays,
      absentDays,
      attendancePercentage: totalDays > 0 ? Math.round(((presentDays + lateDays) / totalDays) * 100) : 0
    };
  };

  // Get overall class statistics for selected date
  const getClassStats = () => {
    const todayRecords = attendanceRecords.filter(record => record.date === selectedDate);
    const totalStudents = students.length;
    const presentCount = todayRecords.filter(record => record.status === 'present').length;
    const lateCount = todayRecords.filter(record => record.status === 'late').length;
    const absentCount = todayRecords.filter(record => record.status === 'absent').length;
    const notMarked = totalStudents - todayRecords.length;

    return {
      totalStudents,
      presentCount,
      lateCount,
      absentCount,
      notMarked,
      attendancePercentage: totalStudents > 0 ? Math.round(((presentCount + lateCount) / totalStudents) * 100) : 0
    };
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800';
      case 'absent': return 'bg-red-100 text-red-800';
      case 'late': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present': return <Check className="w-4 h-4" />;
      case 'absent': return <X className="w-4 h-4" />;
      case 'late': return <Clock className="w-4 h-4" />;
      default: return null;
    }
  };

  const classStats = getClassStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Attendance Tracker</h1>
              <p className="text-gray-300">{classSettings.className} - {classSettings.teacher}</p>
              <p className="text-gray-400 text-sm">{classSettings.semester}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-white font-semibold">Today's Attendance</p>
                <p className="text-2xl font-bold text-green-400">{classStats.attendancePercentage}%</p>
                <p className="text-sm text-gray-400">
                  {classStats.presentCount + classStats.lateCount}/{classStats.totalStudents} students
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-2 mb-8 border border-white/20">
          <nav className="flex space-x-2">
            {[
              { id: 'attendance', label: 'Take Attendance', icon: UserCheck },
              { id: 'students', label: 'Manage Students', icon: Users },
              { id: 'reports', label: 'Reports', icon: BarChart3 },
              { id: 'calendar', label: 'Calendar View', icon: Calendar }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center px-6 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === id
                    ? 'bg-white text-blue-900 shadow-lg'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <Icon className="w-5 h-5 mr-2" />
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          {activeTab === 'attendance' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                <h2 className="text-2xl font-bold text-white">Take Attendance</h2>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-white/20 text-white rounded-lg px-4 py-2 border border-white/30"
                />
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-green-500/20 rounded-xl p-4 text-center">
                  <UserCheck className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{classStats.presentCount}</p>
                  <p className="text-green-400 text-sm">Present</p>
                </div>
                <div className="bg-yellow-500/20 rounded-xl p-4 text-center">
                  <Clock className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{classStats.lateCount}</p>
                  <p className="text-yellow-400 text-sm">Late</p>
                </div>
                <div className="bg-red-500/20 rounded-xl p-4 text-center">
                  <UserX className="w-8 h-8 text-red-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{classStats.absentCount}</p>
                  <p className="text-red-400 text-sm">Absent</p>
                </div>
                <div className="bg-gray-500/20 rounded-xl p-4 text-center">
                  <Users className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{classStats.notMarked}</p>
                  <p className="text-gray-400 text-sm">Not Marked</p>
                </div>
              </div>

              {/* Student Attendance List */}
              <div className="space-y-4">
                {students.map(student => {
                  const attendance = getTodayAttendance(student.id);
                  return (
                    <div key={student.id} className="bg-white/10 rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">
                            {student.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-lg">{student.name}</h3>
                          <p className="text-gray-400">Roll: {student.rollNumber}</p>
                        </div>
                        {attendance && (
                          <span className={`px-3 py-1 rounded-full text-sm flex items-center space-x-1 ${getStatusColor(attendance.status)}`}>
                            {getStatusIcon(attendance.status)}
                            <span>{attendance.status.charAt(0).toUpperCase() + attendance.status.slice(1)}</span>
                          </span>
                        )}
                      </div>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => updateAttendanceStatus(student.id, 'present')}
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            attendance?.status === 'present'
                              ? 'bg-green-500 text-white'
                              : 'bg-white/20 text-white hover:bg-green-500/20'
                          }`}
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => updateAttendanceStatus(student.id, 'late')}
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            attendance?.status === 'late'
                              ? 'bg-yellow-500 text-white'
                              : 'bg-white/20 text-white hover:bg-yellow-500/20'
                          }`}
                        >
                          <Clock className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => updateAttendanceStatus(student.id, 'absent')}
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            attendance?.status === 'absent'
                              ? 'bg-red-500 text-white'
                              : 'bg-white/20 text-white hover:bg-red-500/20'
                          }`}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'students' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Manage Students</h2>
                <button
                  onClick={() => {
                    setShowAddStudent(true);
                    setEditingStudent(null);
                    setNewStudent({ name: "", rollNumber: "", email: "", phone: "" });
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Student
                </button>
              </div>

              {showAddStudent && (
                <div className="bg-white/20 rounded-xl p-6 space-y-4">
                  <h3 className="text-white font-semibold">
                    {editingStudent ? 'Edit Student' : 'Add New Student'}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={newStudent.name}
                      onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                      className="bg-white/20 text-white rounded-lg px-4 py-2 placeholder-gray-400"
                    />
                    <input
                      type="text"
                      placeholder="Roll Number"
                      value={newStudent.rollNumber}
                      onChange={(e) => setNewStudent({...newStudent, rollNumber: e.target.value})}
                      className="bg-white/20 text-white rounded-lg px-4 py-2 placeholder-gray-400"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={newStudent.email}
                      onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                      className="bg-white/20 text-white rounded-lg px-4 py-2 placeholder-gray-400"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={newStudent.phone}
                      onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})}
                      className="bg-white/20 text-white rounded-lg px-4 py-2 placeholder-gray-400"
                    />
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={handleSaveStudent}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {editingStudent ? 'Update' : 'Save'}
                    </button>
                    <button
                      onClick={() => {
                        setShowAddStudent(false);
                        setEditingStudent(null);
                        setNewStudent({ name: "", rollNumber: "", email: "", phone: "" });
                      }}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="grid gap-4">
                {students.map(student => (
                  <div key={student.id} className="bg-white/10 rounded-xl p-6 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {student.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">{student.name}</h3>
                        <p className="text-gray-400">Roll: {student.rollNumber}</p>
                        <p className="text-gray-400 text-sm">{student.email}</p>
                        <p className="text-gray-400 text-sm">{student.phone}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditStudent(student)}
                        className="text-blue-400 hover:text-blue-300 p-2"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteStudent(student.id)}
                        className="text-red-400 hover:text-red-300 p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Attendance Reports</h2>
              
              <div className="grid gap-6">
                {students.map(student => {
                  const stats = getAttendanceStats(student.id);
                  return (
                    <div key={student.id} className="bg-white/10 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-lg">
                              {student.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-white font-semibold text-lg">{student.name}</h3>
                            <p className="text-gray-400">Roll: {student.rollNumber}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-white">{stats.attendancePercentage}%</p>
                          <p className="text-gray-400 text-sm">Overall Attendance</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4 mb-4">
                        <div className="text-center">
                          <p className="text-lg font-bold text-green-400">{stats.presentDays}</p>
                          <p className="text-xs text-gray-400">Present</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-yellow-400">{stats.lateDays}</p>
                          <p className="text-xs text-gray-400">Late</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-red-400">{stats.absentDays}</p>
                          <p className="text-xs text-gray-400">Absent</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-white">{stats.totalDays}</p>
                          <p className="text-xs text-gray-400">Total Days</p>
                        </div>
                      </div>
                      
                      {/* Attendance Progress Bar */}
                      <div className="w-full bg-gray-700 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-green-400 to-blue-400 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${stats.attendancePercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'calendar' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Calendar View</h2>
              
              <div className="bg-white/10 rounded-xl p-6">
                <div className="text-center text-white">
                  <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold mb-2">Calendar Feature</h3>
                  <p className="text-gray-400">
                    Calendar view with attendance visualization will be implemented here.
                    This would show a monthly calendar with color-coded attendance data.
                  </p>
                </div>
              </div>

              {/* Recent Attendance Summary */}
              <div className="bg-white/10 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4">Recent Attendance Summary</h3>
                <div className="space-y-4">
                  {Array.from(new Set(attendanceRecords.map(record => record.date)))
                    .sort()
                    .reverse()
                    .slice(0, 5)
                    .map(date => {
                      const dayRecords = attendanceRecords.filter(record => record.date === date);
                      const presentCount = dayRecords.filter(record => record.status === 'present').length;
                      const totalStudents = students.length;
                      const percentage = Math.round((presentCount / totalStudents) * 100);
                      
                      return (
                        <div key={date} className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                          <div>
                            <p className="text-white font-semibold">
                              {new Date(date).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                            <p className="text-gray-400 text-sm">
                              {presentCount}/{totalStudents} students present
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-white">{percentage}%</p>
                            <div className="w-20 bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}