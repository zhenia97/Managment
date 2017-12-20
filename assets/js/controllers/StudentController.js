function StudentController({GroupModel, StudentModel}, View)
{
    this.View = View;
    this.GroupModel = GroupModel;
    this.StudentModel = StudentModel;
    
    this.showAllStudents= () =>
    {
        var allStudents = this.StudentModel.getAllStudents(),
            allGroups = this.GroupModel.getAllGroupsArr();
            
        this.View.renderStudentTable(allStudents, allGroups);
    };
    this.showCreateStudentBox = () =>
    {
        var allGroupsArr = this.GroupModel.getAllGroupsArr();
        this.View.renderCreateStudentBox(allGroupsArr);
    };
    this.showStudentInfo = (studentRow) =>
    {
        var studentId = parseInt(studentRow.getAttribute('data-studentid')),
            student = {};
            
        if(checkNullUndefined(studentId))
        {
            student = this.StudentModel.getStudentById(studentId);
            this.View.renderStudentInfoBox(student);
        }
    };
    this.editUserShowBox = (studentRow) =>
    {
        var studentId = parseInt(studentRow.parentNode.parentNode.getAttribute('data-studentid')),
            student = {},
            allGroups = [];
            
        if(checkNullUndefined(studentId))
        {
            allGroups = this.GroupModel.getAllGroupsArr();
            student = this.StudentModel.getStudentById(studentId);
            this.View.renderEditStudentBox(student, allGroups);
        }
    };
    this.deleteUserShowBox = (studentRow) =>
    {
        var studentId = parseInt(studentRow.parentNode.parentNode.getAttribute('data-studentid'));
        if(checkNullUndefined(studentId))
        {
            this.View.renderDeleteUserShowBox(studentId);
        }
    };
    this.render = () =>
    {
        var allStudents = this.StudentModel.getAllStudents(),
            allGroups = this.GroupModel.getAllGroupsArr();

        this.View.renderStudentTable(allStudents, allGroups);
    };
    
    
    
    this.createStudent = () =>
    {
        var inputsBox = document.getElementById('createStudents').querySelectorAll('input, select'),
            groupsIdArr = this.GroupModel.getAllGroupsIdArr(),
            studentObj = {},
            studentInfo = {};
            
        studentInfo = this.studentBoxGetInputParams(inputsBox, groupsIdArr);
        studentObj = studentInfo.data;
        if(!studentInfo.checkError)
        {
            this.StudentModel.createStudent(
                studentObj, 
                () => this.render()
            );   
        }
    };
    this.editStudent = () =>
    {
        var inputsBox = document.getElementById('editStudent').querySelectorAll('input, select'),
            studentId = parseInt(document.getElementById('editStudent').getAttribute('data-studentid')),
            groupsIdArr = this.GroupModel.getAllGroupsIdArr(),
            studentObj = {},
            studentInfo = {};
            
        studentInfo = this.studentBoxGetInputParams(inputsBox, groupsIdArr);
        studentObj = studentInfo.data;
        if(!studentInfo.checkError)
        {
            studentObj.studentId = studentId;
            this.StudentModel.editStudent(
                studentObj, 
                () => () => this.render()
            );   
        }
    };
    this.deleteStudent = () =>
    {
        var studentId = parseInt(document.getElementById('deleteStudent').getAttribute('data-studentid'));

        if(checkNullUndefined(studentId))
        {
            this.StudentModel.deleteStudent(
                {studentId}, 
                () => this.render()
            );   
        }
    };
    this.studentBoxGetInputParams = (inputsBox, groupsIdArr) =>
    {
        var data = {},
            checkError = false;
        
        for(let i = 0, len = inputsBox.length; i < len; i++)
        {
            let element = inputsBox[i],
                dataType = element.getAttribute('data-type'),
                dataVal = element.value.trim();
        
            element.classList.remove('inpurError');
            switch(dataType)
            {
                case 'userfirst': 
                    if(!this.Validator.validateUserFirstLastSurName(dataVal))
                    {
                        checkError = true;
                        element.classList.add('inpurError');
                    }
                    data.firstName = dataVal;
                    break;
                case 'userlast': 
                    if(!this.Validator.validateUserFirstLastSurName(dataVal))
                    {
                        checkError = true;
                        element.classList.add('inpurError');
                    }
                    data.lastName = dataVal;
                    break;
                case 'usersurname':
                    if(!this.Validator.validateUserFirstLastSurName(dataVal))
                    {
                        checkError = true;
                        element.classList.add('inpurError');
                    }
                    data.surName = dataVal;
                    break;
                case 'birthday': 
                    if(!this.Validator.validateBirthday(dataVal))
                    {
                        checkError = true;
                        element.classList.add('inpurError');
                    }
                    data.birtday = dataVal;
                    break;
                case 'groupid': 
                    if(!groupsIdArr.includes(parseInt(dataVal)))
                    {
                        checkError = true;
                        element.classList.add('inpurError');
                    }
                    data.groupId = parseInt(dataVal);
                    break;
                case 'gender': 
                    if(![1, 2].includes(parseInt(dataVal)))
                    {
                        checkError = true;
                        element.classList.add('inpurError');
                    }
                    data.gender = parseInt(dataVal);
                    break;
            }
        }
        return {data, checkError};
    };
}