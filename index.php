<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" type="text/css" href="/assets/css/style.css">
        <link rel="stylesheet" href="/assets/libs/font-awesome-4.7.0/css/font-awesome.min.css">
        <title>Managment</title>
    </head>
    <body>
        <div id="mainBox">
            <div id="mainBoxHeader">
                <div class="oneMainBoxHeaderName">
                    <button id="groupsButton" class="active" onclick="Group.showAllGroups()">Groups</button>
                </div>
                <div class="oneMainBoxHeaderName">
                    <button id="studentsButton" onclick="Student.showAllStudents()">Students</button>
                </div>
                <div id="addButtonBox">
                    <button onclick="Group.showCreateGroupBox()">+</button>
                </div>
            </div>
            <div id="groupsTableBox">
                <table>
                    <thead>
                        <th>Id</th>
                        <th>Group Name</th>
                        <th>Curator</th>
                        <th>Speciality</th>
                        <th>Count Students</th>
                        <th>Actions</th>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
            <div id="studentsTableBox">
                <table>
                    <thead>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Last Name</th>
                        <th>Group Id</th>
                        <th>Group Name</th>
                        <th>Birthday</th>
                        <th>Actions</th>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
        <?php
            require_once 'popups.php';
        ?>
    </body>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script> 
    <script src="/assets/js/controllers/AjaxController.js"></script>
    <script src="/assets/js/controllers/StudentController.js"></script>
    <script src="/assets/js/controllers/GroupController.js"></script>
    <script src="/assets/js/models/CommonModel.js"></script>
    <script src="/assets/js/models/StudentModel.js"></script>
    <script src="/assets/js/models/GroupModel.js"></script>
    <script src="/assets/js/views/CommonView.js"></script>
    <script src="/assets/js/views/StudentView.js"></script>
    <script src="/assets/js/views/GroupView.js"></script>
    <script src="/assets/js/classes/Validator.js"></script>
    <script src="/assets/js/actions.js"></script>
</html>