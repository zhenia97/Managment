function GroupController({GroupModel, StudentModel}, View)
{
    this.View = View;
    this.GroupModel = GroupModel;
    this.StudentModel = StudentModel;
    
    this.showCreateGroupBox = () =>
    {
        this.View.renderCreateGroupBox();
    };
    this.deleteGroupShowBox = (groupRow) =>
    {
        var groupId = parseInt(groupRow.parentNode.parentNode.getAttribute('data-groupid'));
        
        if(checkNullUndefined(groupId))
        {
            this.View.renderDeleteGroupShowBox(groupId);
        }
    };
    this.editGroupShowBox = (groupRow) =>
    {
        var groupId = parseInt(groupRow.parentNode.parentNode.getAttribute('data-groupid')),
            group = {};
            
        if(checkNullUndefined(groupId))
        {
            group = this.GroupModel.getGroupById(groupId);
            this.View.renderEditGroupShowBox(group);
        }
    };
    this.exchangeGroupShowBox = (groupRow) =>
    {
        var groupId = parseInt(groupRow.parentNode.parentNode.getAttribute('data-groupid')),
            groupsArr = this.GroupModel.getAllGroupsArr();
        
        if(checkNullUndefined(groupId))
        {
            this.View.renderExchangeGroupShowBox(groupId, groupsArr);
        }
    };
    this.emptyGroupShowBox = (groupRow) =>
    {
        var groupId = parseInt(groupRow.parentNode.parentNode.getAttribute('data-groupid'));
        
        if(checkNullUndefined(groupId))
        {
            this.View.renderEmptyGroupShowBox(groupId);
        }
    };
    this.showGroupStudents = (groupRow) =>
    {
        var groupId = parseInt(groupRow.getAttribute('data-groupid')),
            students = [];
        
        if(checkNullUndefined(groupId))
        {
            students = this.StudentModel.getGroupStudents(groupId);
            this.View.renderGroupStudentsTable(students);
        }
    };
    this.render = () =>
    {
        var allGroups = this.GroupModel.getAllGroupsArr(),
            allSpecialityKeys = this.GroupModel.getAllSpecialityKeysArr(),
            allGroupsCountStudents = this.StudentModel.getAllGroupsCountStudents(allGroups);
            
        this.View.renderGroupTable(allGroups, allGroupsCountStudents, allSpecialityKeys);
    };
    
    
    
    this.showAllGroups = () =>
    {
        this.render();
    };
    this.showAllGroupsRequest = () =>
    {
        var allGroupsCountStudents = {};
        
        this.GroupModel.getAllGroupsStudentsRequest((groupsArr, studentsArr, specialityKeys) =>
        {
            if(checkNullUndefined(studentsArr) && studentsArr.length > 0)
            {
                this.StudentModel.setStudentsArr(studentsArr);
            }
            if(checkNullUndefined(groupsArr) && groupsArr.length > 0)
            {
                allGroupsCountStudents = this.StudentModel.getAllGroupsCountStudents(groupsArr);
                this.View.renderGroupTable(groupsArr, allGroupsCountStudents, specialityKeys);
            }
        });   
    };
    this.deleteGroup = () =>
    {
        var groupId = parseInt(document.getElementById('deleteGroup').getAttribute('data-groupid'));
        
        if(checkNullUndefined(groupId))
        {
            this.GroupModel.deleteGroup(
                {groupId}, 
                () => this.render()
            );   
        }
    };
    this.createGroup = () =>
    {
        var inputsBox = document.getElementById('createGroup').querySelectorAll('input, select'),
            allSpecialityKeys = this.GroupModel.getAllSpecialityKeysArr(),
            groupInfo = {},
            groupObj = {};
            
        groupInfo = this.groupBoxGetInputParams(inputsBox, allSpecialityKeys);
        groupObj = groupInfo.data;
        if(!groupInfo.checkError)
        {
            this.GroupModel.createGroup(
                groupObj, 
                () => this.render()
            );   
        }
    };
    this.editGroup = () =>
    {
       var inputsBox = document.getElementById('editGroup').querySelectorAll('input, select'),
            allSpecialityKeys = this.GroupModel.getAllSpecialityKeysArr(),
            groupId = parseInt(document.getElementById('editGroup').getAttribute('data-groupid')),
            groupInfo = {},
            groupObj = {};
            
        groupInfo = this.groupBoxGetInputParams(inputsBox, allSpecialityKeys);
        groupObj = groupInfo.data;
        if(!groupInfo.checkError)
        {
            groupObj.groupId = groupId;
            this.GroupModel.editGroup(
                groupObj, 
                () => this.render()
            );   
        }
    };
    this.exchangeGroupStudents = () =>
    {
        var exchangeGroupBox = document.getElementById('exchangeGroup'),
            groupId = parseInt(exchangeGroupBox.getAttribute('data-groupid')),
            newGroupId = parseInt(exchangeGroupBox.getElementsByTagName('select')[0].value);
        
        if(checkNullUndefined(groupId) && checkNullUndefined(newGroupId))
        {
            this.GroupModel.exchangeGroupStudents(
                {groupId, newGroupId}, 
                () =>
                {   
                    this.StudentModel.replaceGroupStudents(groupId, newGroupId);
                    this.render();
                }
            );   
        }
    };
    this.emptyGroup = () =>
    {
        var groupId =  parseInt(document.getElementById('emptyGroup').getAttribute('data-groupid'));

        if(checkNullUndefined(groupId))
        {
            this.GroupModel.emptyGroup(
                {groupId}, 
                () =>
                {   
                    this.StudentModel.replaceGroupStudents(groupId, null);
                    this.render();
                }
            );  
        }
    };
    
    
    
    this.groupBoxGetInputParams = (inputsBox, allSpecialityKeys) =>
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
                case 'groupname': 
                    if(!this.Validator.validateGroupName(dataVal))
                    {
                        checkError = true;
                        element.classList.add('inpurError');
                    }
                    data.name = dataVal;
                    break;
                case 'groupcurator': 
                    if(!this.Validator.validateUserFirstLastSurName(dataVal))
                    {
                        checkError = true;
                        element.classList.add('inpurError');
                    }
                    data.curatorNameLast = dataVal;
                    break;
                case 'groupspeciality':
                    if(!this.Validator.validateGroupSpeciality(dataVal, allSpecialityKeys))
                    {
                        checkError = true;
                        element.classList.add('inpurError');
                    }
                    data.speciality = dataVal;
                    break;
            }
        }
        return {data, checkError};
    };
}