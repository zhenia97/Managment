<?php
    class studentController extends controllersTemplate
    {
        function getStudentById($studentId)
        {           
            $student = [];
            
            if(!empty($studentId))
            {
                $student = $this->db->select('s.*, g.id as `groupId`, g.name as `groupName`',
                        'students `s` left JOIN groupStudents gs ON s.`id` = gs.`studentId` left JOIN groups g on g.`id` = gs.`groupId`',
                        "s.`id` = {$studentId}")[0];
            }
            return ['student' => $student];             
        }
        function checkStudentExist($studentId)
        {
            if(!empty($studentId))
            {
                $student = $this->db->select('*', 'students', "`id` = {$studentId}");
                if(!empty($student))
                {
                    return true;
                }
            }
            $this->response->setError(112);
        }
        function createStudent()
        {
            $userFirstName = $this->data['firstName'];
            $userLastName = $this->data['lastName'];
            $userSurName = $this->data['surName'];
            $userBirthday = $this->data['birtday'];
            $groupId = $this->data['groupId'];
            $gender = $this->data['gender'];
            $params = [];
            
            if(empty($userFirstName) || !$this->validator->validateUserFirstLastSurName($userFirstName))
            {
                $this->response->setError(107);
            }
            if(empty($userLastName) || !$this->validator->validateUserFirstLastSurName($userLastName))
            {
                $this->response->setError(108);
            }
            if(empty($userSurName) || !$this->validator->validateUserFirstLastSurName($userSurName))
            {
                $this->response->setError(109);
            }
            if(empty($userBirthday) || !$this->validator->validateBirthday($userBirthday))
            {
                $this->response->setError(110);
            }
            if(empty($groupId))
            {
                $this->response->setError(106);
            }
            
            $params['firstName'] = $userFirstName;
            $params['lastName'] = $userLastName;
            $params['surName'] = $userSurName;
            $params['birtday'] = $userBirthday;
            $params['gender'] = $gender;
            $params['stydyYear'] = 2017;
            $studentId = $this->db->insert('`students`', $params);
            
            $params = [];
            $params['studentId'] = $studentId;
            $params['groupId'] = $groupId;
            $this->db->insert('`groupStudents`', $params);
            
            return $this->getStudentById($studentId);
        }
        function deleteStudent()
        {
            $studentId = $this->data['studentId'];
             
            if(empty($studentId))
            {
                $this->response->setError(106);
            }
            $this->checkStudentExist($studentId);
            
            $this->db->delete('`groupStudents`', '`studentId` = ?',[$studentId]);
            $this->db->delete('`students`', '`id` = ?',[$studentId]);
            
            return true;
        }
        function editStudent()
        {
            $userFirstName = $this->data['firstName'];
            $userLastName = $this->data['lastName'];
            $userSurName = $this->data['surName'];
            $userBirthday = $this->data['birtday'];
            $groupId = $this->data['groupId'];
            $gender = $this->data['gender'];
            $studentId = $this->data['studentId'];
            $params = [];
            
            if(empty($userFirstName) || !$this->validator->validateUserFirstLastSurName($userFirstName))
            {
                $this->response->setError(107);
            }
            if(empty($userLastName) || !$this->validator->validateUserFirstLastSurName($userLastName))
            {
                $this->response->setError(108);
            }
            if(empty($userSurName) || !$this->validator->validateUserFirstLastSurName($userSurName))
            {
                $this->response->setError(109);
            }
            if(empty($userBirthday) || !$this->validator->validateBirthday($userBirthday))
            {
                $this->response->setError(110);
            }
            if(empty($groupId))
            {
                $this->response->setError(106);
            }
            if(empty($studentId))
            {
                $this->response->setError(111);
            }
            
            $this->checkStudentExist($studentId);
            
            $params['firstName'] = $userFirstName;
            $params['lastName'] = $userLastName;
            $params['surName'] = $userSurName;
            $params['birtday'] = $userBirthday;
            $params['gender'] = $gender;
            $params['id'] = $studentId;
          
            $this->db->update('`students`', "`firstName` = ?, `lastName` = ?, `surName` = ?, `birtday` = ?, `gender` = ?", '`id` = ?', $params);
            
            $checkStudentInGroup = $this->db->select('*', 'groupStudents', "studentId = {$studentId}");
            if(!empty($checkStudentInGroup))
            {
                $params = [];
                $params['groupId'] = $groupId;
                $params['studentId'] = $studentId;
                $this->db->update('`groupStudents`', "`groupId` = ?", '`studentId` = ?', $params);
            }
            else 
            {
                $params = [];
                $params['studentId'] = $studentId;
                $params['groupId'] = $groupId;
                $this->db->insert('`groupStudents`', $params);
            }
            return $this->getStudentById($studentId);
        }
    }
