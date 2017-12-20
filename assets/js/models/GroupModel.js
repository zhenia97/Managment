function GroupModel()
{
    this.groupsArr = [];
    this.specialityKeys = {};
    
    this.getAllGroupsArr = () =>
    {
        return this.groupsArr;
    };
    this.getAllGroupsIdArr = () =>
    {
        return this.groupsArr.map(item => item.id);
    };
    this.getGroupById = (groupId) =>
    {
        group = {};
        
        this.groupsArr.some((item) =>
        {
            if(item.id === groupId)
            {
                group = item;
                return true;
            }
        });
        return group;
    };
    this.addNewGroup = (group) =>
    {
        this.groupsArr.push(group);
    };
    this.updateGroup = (group) =>
    {
        var groupId = group.id;
        
        this.groupsArr.some((item, i) =>
        {
            if(item.id === groupId)
            {
                this.groupsArr[i] = group;
                return true;
            }
        });
    };
    this.geleteGroup = (groupId) =>
    {
        this.groupsArr.forEach((item, i) =>
        {
            if(item.id === groupId)
            {
                this.groupsArr.splice(i, 1);
            }
        });
    };
    this.getAllSpecialityKeysArr = () =>
    {
        return this.specialityKeys;
    };
    
    
    
    this.getAllGroupsStudentsRequest = (callbackFunc) =>
    {
        AjaxController('getAllGroupsStudents',
            'groupController',
            {},
            ({data: {groupsArr}, data: {studentsArr}, data: {specialityKeys}}) => 
            {
                this.groupsArr = groupsArr;
                for(let key in specialityKeys)
                {
                    this.specialityKeys[specialityKeys[key].id] = specialityKeys[key].name;
                }
                callbackFunc(groupsArr, studentsArr, this.specialityKeys);
            },
            this.basicErrorHandler
        ); 
    };
    this.deleteGroup = ({groupId}, callbackFunc) =>
    {
        AjaxController('deleteGroup',
            'groupController',
            {groupId},
            () => 
            {
                this.geleteGroup(groupId);
                callbackFunc();
            },
            this.basicErrorHandler
        );
    };
    this.createGroup = ({name, curatorNameLast, speciality}, callbackFunc) =>
    {
        AjaxController('createGroup',
            'groupController',
            {name, curatorNameLast, speciality},
            ({data: {group}}) => 
            {
                if(checkNullUndefined(group))
                {
                    this.addNewGroup(group);
                    callbackFunc();
                }
            },
            this.basicErrorHandler
        );
    };
    this.editGroup = ({name, curatorNameLast, speciality, groupId}, callbackFunc) =>
    {
        AjaxController('editGroup',
            'groupController',
            {name, curatorNameLast, speciality, groupId},
            ({data: {group}}) => 
            {
                if(checkNullUndefined(group))
                {
                    this.updateGroup(group);
                    callbackFunc();
                }
            },
            this.basicErrorHandler
        );
    };
    this.exchangeGroupStudents = ({groupId, newGroupId}, callbackFunc) =>
    {
        AjaxController('exchangeGroupStudents',
            'groupController',
            {groupId, newGroupId},
            () => callbackFunc(),
            this.basicErrorHandler
        );
    };
    this.emptyGroup = ({groupId}, callbackFunc) =>
    {
        AjaxController('emptyGroup',
            'groupController',
            {groupId},
            () => callbackFunc(),
            this.basicErrorHandler
        );
    };
}

