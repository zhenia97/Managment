<div id="createGroup" class="popupWrapBox">
    <div class="popupBox">
        <i class="fa fa-times closePopup" aria-hidden="true" onclick="closePopupBox(this)"></i>
        <div class="popupBoxTitle">Create Group</div>
        <div class="popupInputsBox">
            <div class="popupOneInputs"> 
                <input data-type="groupname" placeholder="Group Name">
            </div>
            <div class="popupOneInputs"> 
                <input data-type="groupcurator" placeholder="Curator">
            </div>
            <div class="popupOneInputs"> 
                <select data-type="groupspeciality">
                    <option value="1" selected>Computer Science</option>
                    <option value="2">Software Engineering</option>
                    <option value="3">Cybernetics</option>
                    <option value="4">Information Technology</option>
                    <option value="5">System Analysis</option>
                    <option value="6">Computer Engineering</option>
                </select>
            </div>
        </div>
        <div class="popupFinishBox">
            <button onclick="Group.createGroup(this)">Create</button>
        </div>
    </div>
</div>
<div id="createStudents" class="popupWrapBox">
    <div class="popupBox">
        <i class="fa fa-times closePopup" aria-hidden="true" onclick="closePopupBox(this)"></i>
        <div class="popupBoxTitle">Create Student</div>
        <div class="popupInputsBox">
            <div class="popupOneInputs"> 
                <input data-type="userfirst" placeholder="First Name">
            </div>
            <div class="popupOneInputs"> 
                <input data-type="userlast" placeholder="Last Name">
            </div>
            <div class="popupOneInputs"> 
                <input data-type="usersurname" placeholder="Surname">
            </div>
            <div class="popupOneInputs"> 
                <input data-type="birthday" placeholder="Birthday: dd.mm.yyyy">
            </div>
            <div class="popupOneInputs"> 
                <select data-type="groupid"></select>
            </div>
            <div class="popupOneInputs"> 
                <select data-type="gender">
                    <option value="1" selected>Male</option>
                    <option value="2">Female</option>
                </select>
            </div>
            <div class="popupFinishBox">
                <button onclick="Student.createStudent(this)">Create</button>
            </div>
        </div>
    </div>
</div>
<div id="deleteGroup" class="popupWrapBox">
    <div class="popupBox">
        <i class="fa fa-times closePopup" aria-hidden="true" onclick="closePopupBox(this)"></i>
        <div class="popupBoxTitle">Are Your sure?</div>
        <div class="popupFinishBox">
            <button onclick="Group.deleteGroup(this)">Delete</button>
            <button onclick="closePopupBox(this)">Cancel</button>
        </div>
    </div>
</div>
<div id="deleteStudent" class="popupWrapBox">
    <div class="popupBox">
        <i class="fa fa-times closePopup" aria-hidden="true" onclick="closePopupBox(this)"></i>
        <div class="popupBoxTitle">Are Your sure?</div>
        <div class="popupFinishBox">
            <button onclick="Student.deleteStudent(this)">Delete</button>
            <button onclick="closePopupBox(this)">Cancel</button>
        </div>
    </div>
</div>
<div id="emptyGroup" class="popupWrapBox">
    <div class="popupBox">
        <i class="fa fa-times closePopup" aria-hidden="true" onclick="closePopupBox(this)"></i>
        <div class="popupBoxTitle">Remove students from group?</div>
        <div class="popupFinishBox">
            <button onclick="Group.emptyGroup(this)">Continue</button>
            <button onclick="closePopupBox(this)">Cancel</button>
        </div>
    </div>
</div>
<div id="exchangeGroup" class="popupWrapBox">
    <div class="popupBox">
        <i class="fa fa-times closePopup" aria-hidden="true" onclick="closePopupBox(this)"></i>
        <div class="popupBoxTitle">Select group to move students</div>
        <div class="popupInputsBox">
            <div class="popupOneInputs"> 
                <select></select>
            </div>
        </div>
        <div class="popupFinishBox">
            <button onclick="Group.exchangeGroupStudents(this)">Continue</button>
            <button onclick="closePopupBox(this)">Cancel</button>
        </div>
    </div>
</div>
<div id="groupStudents" class="popupWrapBox">
    <div class="popupBox">
        <i class="fa fa-times closePopup" aria-hidden="true" onclick="closePopupBox(this)"></i>
        <div class="popupBoxTitle">Group Students</div>
        <div class="popupInputsBox">
            <table>
                <thead>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Last Name</th>
                    <th>Birthday</th>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>
</div>
<div id="editGroup" class="popupWrapBox">
    <div class="popupBox">
        <i class="fa fa-times closePopup" aria-hidden="true" onclick="closePopupBox(this)"></i>
        <div class="popupBoxTitle">Edit group</div>
        <div class="popupInputsBox">
            <div class="popupOneEditRow">
                <div class="popupOneEditRowTerm">Group Name</div>
                <div class="popupOneEditRowDescription">
                    <input data-type="groupname" placeholder="Group Name">
                </div>
            </div>
            <div class="popupOneEditRow">
                <div class="popupOneEditRowTerm">Curator</div>
                <div class="popupOneEditRowDescription">
                    <input data-type="groupcurator" placeholder="Curator">
                </div>
            </div>
            <div class="popupOneEditRow">
                <div class="popupOneEditRowTerm">Speciality</div>
                <div class="popupOneEditRowDescription">
                    <select data-type="groupspeciality">
                        <option value="1" selected>Computer Science</option>
                        <option value="2">Software Engineering</option>
                        <option value="3">Cybernetics</option>
                        <option value="4">Information Technology</option>
                        <option value="5">System Analysis</option>
                        <option value="6">Computer Engineering</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="popupFinishBox">
            <button onclick="Group.editGroup(this)">Update</button>
            <button onclick="closePopupBox(this)">Cancel</button>
        </div>
    </div>
</div>
<div id="editStudent" class="popupWrapBox">
    <div class="popupBox">
        <i class="fa fa-times closePopup" aria-hidden="true" onclick="closePopupBox(this)"></i>
        <div class="popupBoxTitle">Edit student</div>
        <div class="popupInputsBox">
            <div class="popupOneEditRow">
                <div class="popupOneEditRowTerm">First Name</div>
                <div class="popupOneEditRowDescription">
                    <input data-type="userfirst" placeholder="First Name">
                </div>
            </div>
            <div class="popupOneEditRow">
                <div class="popupOneEditRowTerm">Last Name</div>
                <div class="popupOneEditRowDescription">
                    <input data-type="userlast" placeholder="Last Name">
                </div>
            </div>
            <div class="popupOneEditRow">
                <div class="popupOneEditRowTerm">Surname</div>
                <div class="popupOneEditRowDescription">
                    <input data-type="usersurname" placeholder="Surname">
                </div>
            </div>
            <div class="popupOneEditRow">
                <div class="popupOneEditRowTerm">Birthday</div>
                <div class="popupOneEditRowDescription">
                     <input data-type="birthday" placeholder="Birthday">
                </div>
            </div>
            <div class="popupOneEditRow">
                <div class="popupOneEditRowTerm">Group Id</div>
                <div class="popupOneEditRowDescription">
                    <select data-type="groupid"></select>
                </div>
            </div>
            <div class="popupOneEditRow">
                <div class="popupOneEditRowTerm">Gender</div>
                <div class="popupOneEditRowDescription">
                    <select data-type="gender">
                    <option value="1" selected>Male</option>
                    <option value="2">Feramale</option>
                </select>
                </div>
            </div>
        </div>
        <div class="popupFinishBox">
            <button onclick="Student.editStudent(this)">Update</button>
            <button onclick="closePopupBox(this)">Cancel</button>
        </div>
    </div>
</div>
<div id="studentInfo" class="popupWrapBox">
    <div class="popupBox">
        <i class="fa fa-times closePopup" aria-hidden="true" onclick="closePopupBox(this)"></i>
        <div class="popupBoxTitle">Student info</div>
        <div class="popupInputsBox">
            <div class="popupOneEditRow">
                <div class="popupOneEditRowTerm">First Name</div>
                <div class="popupOneEditRowDescription">
                    <input data-type="userfirst" placeholder="First Name" disabled>
                </div>
            </div>
            <div class="popupOneEditRow">
                <div class="popupOneEditRowTerm">Last Name</div>
                <div class="popupOneEditRowDescription">
                    <input data-type="userlast" placeholder="Last Name" disabled>
                </div>
            </div>
            <div class="popupOneEditRow">
                <div class="popupOneEditRowTerm">Surname</div>
                <div class="popupOneEditRowDescription">
                    <input data-type="usersurname" placeholder="Surname" disabled>
                </div>
            </div>
            <div class="popupOneEditRow">
                <div class="popupOneEditRowTerm">Birthday</div>
                <div class="popupOneEditRowDescription">
                     <input data-type="birthday" placeholder="Birthday" disabled>
                </div>
            </div>
            <div class="popupOneEditRow">
                <div class="popupOneEditRowTerm">Stydy Year</div>
                <div class="popupOneEditRowDescription">
                     <input data-type="stydeyear" placeholder="Stydy year" disabled>
                </div>
            </div>
            <div class="popupOneEditRow">
                <div class="popupOneEditRowTerm">Gender</div>
                <div class="popupOneEditRowDescription">
                    <select data-type="gender" disabled>
                    <option value="1" selected>Male</option>
                    <option value="2">Feramale</option>
                </select>
                </div>
            </div>
        </div>
        <div class="popupFinishBox"></div>
    </div>
</div>