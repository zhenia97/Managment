<?php
    class groupController extends controllersTemplate
    {
        public function getAllGroupsStudents()
        {
            $groups = $this->db->select('*', 'groups', '1');
            $specialityKeys = $this->db->select('*', 'specialityKeys', '1');
            $students = $this->db->select('s.*, gs.`groupId`', 'students `s` LEFT JOIN groupStudents gs ON s.`id` = gs.`studentId`', '1');

            return ['groupsArr' => $groups, 'studentsArr' => $students, 'specialityKeys' => $specialityKeys];
        }
        public function getGroupById($groupId)
        {
            $group = [];
            
            if(!empty($groupId))
            {
                $group = $this->db->select('*', 'groups', "`id` = {$groupId}")[0];
            }
            return ['group' => $group];   
        }
        function checkGroupExist($groupId)
        {
            if(!empty($groupId))
            {
                $group = $this->db->select('*', 'groups', "`id` = {$groupId}");
                if(!empty($group))
                {
                    return true;
                }
            }
            $this->response->setError(113);
        }
        public function createGroup()
        {
            $groupName = $this->data['name'];
            $groupCurator = $this->data['curatorNameLast'];
            $groupSpeciality = $this->data['speciality'];
            $params = [];
            
            if(empty($groupName) || !$this->validator->validateGroupName($groupName))
            {
                $this->response->setError(103);
            }
            if(empty($groupCurator) || !$this->validator->validateUserFirstLastSurName($groupCurator))
            {
                $this->response->setError(104);
            }
            if(!in_array($groupSpeciality, [1,2,3,4,5,6]))
            {
                $this->response->setError(105);
            }
            
            $params['name'] = $groupName;
            $params['curatorNameLast'] = $groupCurator;
            $params['speciality'] = $groupSpeciality;
            $groupId = $this->db->insert('`groups`', $params);
               
            return $this->getGroupById($groupId);
        }
        public function editGroup()
        {
            $groupName = $this->data['name'];
            $groupCurator = $this->data['curatorNameLast'];
            $groupSpeciality = $this->data['speciality'];
            $groupId = $this->data['groupId'];
            $params = [];
            
            if(empty($groupId))
            {
                $this->response->setError(106);
            }
            if(empty($groupName) || !$this->validator->validateGroupName($groupName))
            {
                $this->response->setError(103);
            }
            if(empty($groupCurator) || !$this->validator->validateUserFirstLastSurName($groupCurator))
            {
                $this->response->setError(104);
            }
            if(!in_array($groupSpeciality, [1,2,3,4,5,6]))
            {
                $this->response->setError(105);
            }
            
            $this->checkGroupExist($groupId);
            
            $params['name'] = $groupName;
            $params['curatorNameLast'] = $groupCurator;
            $params['speciality'] = $groupSpeciality;
            $params['id'] = $groupId;
            
            $this->db->update('`groups`', "`name` = ?, `curatorNameLast` = ?, `speciality` = ?", '`id` = ?', $params);
            
            return $this->getGroupById($groupId);
        }
        function deleteGroup()
        {
            $groupId = $this->data['groupId'];
            
            if(empty($groupId))
            {
                $this->response->setError(106);
            }
            
            $this->checkGroupExist($groupId);
            
            $this->db->delete('`groups`', '`id` = ?',[$groupId]);
            return true;
        }
        function exchangeGroupStudents()
        {
            $groupId = $this->data['groupId'];
            $newGroupId = $this->data['newGroupId'];
            $params = [];
            
            if(empty($groupId) || empty($newGroupId))
            {
                $this->response->setError(106);
            }
            
            $this->checkGroupExist($groupId);
            
            $params['groupId'] = $groupId;
            $this->db->update('`groupStudents`', "`groupId` = {$newGroupId}", '`groupId` = ?', $params);
            return true;
        }
        function emptyGroup()
        {
            $groupId = $this->data['groupId'];
             
            if(empty($groupId))
            {
                $this->response->setError(106);
            }
            
            $this->checkGroupExist($groupId);
            
            $this->db->delete('`groupStudents`', '`groupId` = ?',[$groupId]);
            return true;
        }
    }
