function StudentView()
{
    this.renderStudentTable = (allUsers, allGroups) => 
    {
        var tableContent =  '',
            groupName = '';
        
        if(allUsers && allUsers.length > 0)
        {
            allUsers.forEach((item) =>
            {
                groupName = this.getStudentGroupNameById(item.groupId, allGroups);
                tableContent += this.getOneTableRow(item, groupName);
            });
            
            this.closeAllPopups();
            document.getElementById('addButtonBox').getElementsByTagName('button')[0].setAttribute("onclick", "Student.showCreateStudentBox()");
            document.getElementById('studentsButton').classList.add('active');
            document.getElementById('groupsButton').classList.remove('active');
            document.getElementById('studentsTableBox').style.display = 'block';
            document.getElementById('groupsTableBox').style.display = 'none';
            $('#studentsTableBox tbody').empty().append(tableContent);
        }
    };
    this.renderCreateStudentBox = (groupsIdArr) =>
    {
        var selectContent = '',
            inputs = document.getElementById('createStudents').getElementsByTagName('input');
        
        for(let i = 0, len = inputs.length; i < len; i++)
        {
            inputs[i].value = '';
        }
        
        groupsIdArr.forEach((item) =>
        {
            selectContent += `<option value="${item.id}">ID: ${item.id} (${item.name})</option>`;
        });
        
        document.getElementById('createStudents').querySelector('[data-type="groupid"]').innerHTML = selectContent;       
        document.getElementById('createStudents').style.display = 'block';
    };
    this.renderStudentInfoBox = (student) =>
    {
        var studentInfoBox = document.getElementById('studentInfo');

        studentInfoBox.querySelector('input[data-type="userfirst"]').value = student.firstName;
        studentInfoBox.querySelector('input[data-type="userlast"]').value = student.lastName;
        studentInfoBox.querySelector('input[data-type="usersurname"]').value = student.surName;
        studentInfoBox.querySelector('input[data-type="birthday"]').value = student.birtday;
        studentInfoBox.querySelector('input[data-type="stydeyear"]').value = student.stydyYear;
        studentInfoBox.querySelector('select[data-type="gender"]').value = student.gender;
        
        document.getElementById('studentInfo').style.display = 'block';
    };
    this.renderEditStudentBox = (student, groupsArr) =>
    {
        var studentInfoBox = document.getElementById('editStudent'),
            selectContent = '';
        
        groupsArr.forEach((item) =>
        {
            selectContent += `<option value="${item.id}">ID: ${item.id} (${item.name})</option>`;
        });
        
        studentInfoBox.querySelector('select[data-type="groupid"]').innerHTML = selectContent;
        
        studentInfoBox.querySelector('input[data-type="userfirst"]').value = student.firstName;
        studentInfoBox.querySelector('input[data-type="userlast"]').value = student.lastName;
        studentInfoBox.querySelector('input[data-type="usersurname"]').value = student.surName;
        studentInfoBox.querySelector('input[data-type="birthday"]').value = student.birtday;
        studentInfoBox.querySelector('select[data-type="groupid"]').value = student.groupId;
        studentInfoBox.querySelector('select[data-type="gender"]').value = student.gender;
        
        document.getElementById('editStudent').style.display = 'block';
        studentInfoBox.setAttribute('data-studentid', student.id);
    };
    this.renderDeleteUserShowBox = (studentId) =>
    {
        var studentBox = document.getElementById('deleteStudent');
        
        studentBox.setAttribute('data-studentid', studentId);
        studentBox.style.display = 'block';
    };
    this.getOneTableRow = (student, groupName) => 
    {
        return `<tr data-studentid="${student.id}" onclick="Student.showStudentInfo(this)">
            <td>${student.id}</td>
            <td>${student.firstName}</td>
            <td>${student.lastName}</td>
            <td>${student.groupId !== null ? student.groupId : ''}</td>
            <td>${groupName}</td>
            <td>${student.birtday}</td>
            <td>
                <button class="editButton" onclick="event.stopPropagation();Student.editUserShowBox(this)"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                <button class="removeButton" onclick="event.stopPropagation();Student.deleteUserShowBox(this)"><i class="fa fa-times" aria-hidden="true"></i></button>
            </td>
        </tr>`;
    };
    this.getStudentGroupNameById = (groupId, allGroups) =>
    {
        var groupName = '';
        
        allGroups.some((item) =>
        {
            if(item.id === groupId)
            {
                groupName = item.name;
                return true;
            }
        });
        return groupName;
    };
}