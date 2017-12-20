function StudentModel()
{
    this.studentsArr = [];
    
    this.getAllStudents = () =>
    {
        return this.studentsArr;
    };
    this.addNewStudent = (student) =>
    {
        this.studentsArr.push(student);
    };
    this.updateStudent = (student) =>
    {
        var studentId = student.id;
        
        this.studentsArr.some((item, i) =>
        {
            if(item.id === studentId)
            {
                this.studentsArr[i] = student;
                return true;
            }
        });
    };
    this.geleteStudent = (studentId) =>
    {
        this.studentsArr.forEach((item, i) =>
        {
            if(item.id === studentId)
            {
                this.studentsArr.splice(i, 1);
            }
        });
    };
    this.setStudentsArr = (studentsArr) =>
    {
        this.studentsArr = studentsArr;
    };
    this.getStudentById = (studentId) =>
    {
        var studentInfo = {};
        
        this.studentsArr.some((item) =>
        {
            if(item.id === studentId)
            {
                studentInfo = item;
            }
        });
        return studentInfo;
    };
    this.getAllGroupsCountStudents = (groupsArr) =>
    {
        var countStudentsObj = {};

        groupsArr.forEach((item) =>
        {
            countStudentsObj[item.id] = this.getCountStudentsInGroup(item.id);
        });
        return countStudentsObj;
    };
    this.getCountStudentsInGroup = (groupId) =>
    {
        var countStudents = 0;
        
        this.studentsArr.forEach((item) =>
        {
            if(item.groupId === groupId)
            {
                countStudents++;
            }
        });
        return countStudents;
    };
    this.replaceGroupStudents = (fromGroupId, toGroupId) =>
    {
        this.studentsArr.forEach((item) =>
        {
            if(item.groupId === fromGroupId)
            {
                item.groupId = toGroupId;
            }
        });
    }; 
    
   
    
    this.getGroupStudents = (groupId) =>
    {
        var studentsArr = [];
        
        this.studentsArr.forEach((item) =>
        {
            if(item.groupId === groupId)
            {
                studentsArr.push(item);
            }
        });
        return studentsArr;
    };
    this.createStudent = ({firstName, lastName, surName, birtday, groupId, gender}, callbackFunc) =>
    {
        AjaxController('createStudent',
            'studentController',
            {firstName, lastName, surName, birtday, groupId, gender},
            ({data: {student}}) => 
            {
                if(checkNullUndefined(student))
                {
                    this.addNewStudent(student);
                    callbackFunc();
                }
            },
            this.basicErrorHandler
        );
    };
    this.editStudent = ({firstName, lastName, surName, birtday, groupId, gender, studentId}, callbackFunc) =>
    {
        AjaxController('editStudent',
            'studentController',
            {firstName, lastName, surName, birtday, groupId, gender, studentId},
            ({data: {student}}) => 
            {
                if(checkNullUndefined)
                {
                    this.updateStudent(student);
                    callbackFunc();
                }
            },
            this.basicErrorHandler
        );
    };
    this.deleteStudent = ({studentId}, callbackFunc) =>
    {
        AjaxController('deleteStudent',
            'studentController',
            {studentId},
            () => 
            {
                this.geleteStudent(studentId);
                callbackFunc();
            },
            this.basicErrorHandler
        );
    };
}

