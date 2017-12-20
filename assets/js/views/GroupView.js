function GroupView()
{
    this.renderGroupTable = (groupsArr, allGroupsCountStudents, specialityKeys) =>
    {
        var tableContent =  '',
            speciality = '',
            countStudents = 0,
            document = window.document;

        groupsArr.forEach((item) =>
        {
            countStudents = item.id in allGroupsCountStudents ? allGroupsCountStudents[item.id] : 0,
            speciality = item.speciality in specialityKeys ? specialityKeys[item.speciality] : '';
            
            tableContent += this.getOneTableRow(item, countStudents, speciality);
        });
        
        this.closeAllPopups();
        document.getElementById('addButtonBox').getElementsByTagName('button')[0].setAttribute("onclick", "Group.showCreateGroupBox()");
        document.getElementById('groupsButton').classList.add('active');
        document.getElementById('studentsButton').classList.remove('active');
        document.getElementById('studentsTableBox').style.display = 'none';
        document.getElementById('groupsTableBox').style.display = 'block';
        document.getElementById('groupsTableBox').getElementsByTagName('tbody')[0].innerHTML = tableContent;
    };
    this.renderCreateGroupBox = () =>
    {
        var inputs = document.getElementById('createGroup').getElementsByTagName('input');
        
        for(let i = 0, len = inputs.length; i < len; i++)
        {
            inputs[i].value = '';
        }
        document.getElementById('createGroup').style.display = 'block';
    };
    this.renderGroupStudentsTable = (students) =>
    {
        var tableContent = '';

        students.forEach((item) =>
        {
            tableContent += `<tr>
                <td>${item.id}</td>
                <td>${item.firstName}</td>
                <td>${item.lastName}</td>
                <td>${item.birtday}</td>
            </tr>`;
        });
        
        document.getElementById('groupStudents').style.display = 'block';
        document.getElementById('groupStudents').getElementsByTagName('tbody')[0].innerHTML = tableContent;
    };
    this.renderDeleteGroupShowBox = (groupId) =>
    {
        var groupBox = document.getElementById('deleteGroup');
        
        groupBox.setAttribute('data-groupid', groupId);
        groupBox.style.display = 'block';
    };
    this.renderEditGroupShowBox = (group) =>
    {
        var groupId = group.id,
            groupBox = document.getElementById('editGroup');
            
        groupBox.querySelector('input[data-type="groupname"]').value = group.name;
        groupBox.querySelector('input[data-type="groupcurator"]').value = group.curatorNameLast;
        groupBox.querySelector('select[data-type="groupspeciality"]').value = group.speciality;

        groupBox.style.display = 'block';
        groupBox.setAttribute('data-groupid', groupId);
    };
    this.renderExchangeGroupShowBox = (groupId, groupsArr) =>
    {
        var groupBox = '',
            selectContent = '';
        
        groupsArr.forEach((item) =>
        {
            if(item.id !== groupId)
            {
                selectContent += `<option value="${item.id}">ID: ${item.id} (${item.name})</option>`;
            }
        });
        groupBox = document.getElementById('exchangeGroup');
        groupBox.getElementsByTagName('select')[0].innerHTML = selectContent;
        groupBox.style.display = 'block';
        groupBox.setAttribute('data-groupid', groupId);
    };
    this.renderEmptyGroupShowBox = (groupId) =>
    {
        var emptyGroupBox = document.getElementById('emptyGroup');
         
        emptyGroupBox.style.display = 'block';
        emptyGroupBox.setAttribute('data-groupid', groupId);
    };
    this.getOneTableRow = (group, countStudents, speciality) => 
    {
        return `<tr data-groupid=${group.id} onclick="Group.showGroupStudents(this)">
            <td>${group.id}</td>
            <td>${group.name}</td>
            <td>${group.curatorNameLast}</td>
            <td>${speciality}</td>
            <td>${countStudents}</td>
            <td>
                <button class="emptyButton" onclick="event.stopPropagation();Group.emptyGroupShowBox(this)"><i class="fa fa-chain-broken" aria-hidden="true"></i></button>
                <button class="exchangeButton" onclick="event.stopPropagation();Group.exchangeGroupShowBox(this)"><i class="fa fa-exchange" aria-hidden="true"></i></button>
                <button class="editButton" onclick="event.stopPropagation();Group.editGroupShowBox(this)"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                <button class="removeButton" onclick="event.stopPropagation();Group.deleteGroupShowBox(this)"><i class="fa fa-times" aria-hidden="true"></i></button>
            </td>
        </tr>`;
    };
}