<?php
    class DatabaseController 
    {
        private $conn = '';
        
        public function __construct() {
            $this->conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
        }
        
        public function getConn() {
            return $this->conn;
        }
        public function getParamType($param) {
            $type = '';
            if (is_int($param)) {
                $type .= 'i';
            } elseif (is_float($param)) {
                $type .= 'd';
            } elseif (is_string($param)) {
                $type .= 's';
            } else {
                $type .= 'b';
            }
            return $type;
        }

        public function insert($table, $params, $pre_fields = false, $pre_marks = false) {
            $types = '';
            $fields = [];
            $questMarks = [];
            foreach ($params as $field => $param) {
                $types .= $this->getParamType($param);
                $fields[] = $field;
                $questMarks[] = '?';
                if (is_string($param)) {
                    unset($p);
                    $p = strip_tags($params[$field]);
                    $params[$field] = &$p;
                } else {
                    $params[$field] = &$params[$field];
                }
            }
            array_unshift($params, $types);
            $fields = implode(',', $fields);
            $questMarks = implode(',', $questMarks);
            if ($pre_fields) {
                $fields = $pre_fields;
            }
            if ($pre_marks) {
                $questMarks = $pre_marks;
            }
            $sql = "INSERT INTO {$table} ({$fields}) VALUES ({$questMarks})";

            $query = $this->conn->prepare($sql);
            if (false === $query) {
                            error_log($sql);
                            error_log(json_encode($params));
                            error_log(mysqli_error($this->conn));
                    }
            $ref = new ReflectionClass('mysqli_stmt');
            $method = $ref->getMethod("bind_param");
            $method->invokeArgs($query, $params);

            $query->execute();

            $meta = $query->result_metadata();
            $lastId = $this->conn->insert_id;
            return $lastId;
        }

        public function select($fields, $from, $where = false, $params = false) {
            $where = empty($where) ? '1' : $where;
            $sql = "SELECT {$fields} FROM {$from} WHERE {$where}";
            $query = $this->conn->prepare($sql);
                    if (false === $query) {
                            error_log($sql);
                            error_log(json_encode($params));
                            error_log(mysqli_error($this->conn));
                    }
            if (!empty($params)) {
                $types = '';
                foreach ($params as $field => $param) {
                    $types .= $this->getParamType($param);
                    $params[$field] = &$params[$field];
                }
                $ref = new ReflectionClass('mysqli_stmt');
                $method = $ref->getMethod("bind_param");
                array_unshift($params, $types);
                $method->invokeArgs($query, $params);
            }
                    if (false === $query) {
                            error_log($sql);
                            error_log(json_encode($params));
                            error_log(mysqli_error($this->conn));
                    }
            $query->execute();

            $meta = $query->result_metadata();
            $params = [];
            while ($field = $meta->fetch_field()) {
                $params[] = &$row[$field->name];
            }
            call_user_func_array(array($query, 'bind_result'), $params);
            $result = array();
            while ($query->fetch()) {
                $c = array();
                foreach ($row as $key => $val) {
                    $c[$key] = $val;
                }
                $result[] = $c;
            }
            if ($result == null) {
                $result = [];
            }
            $query->close();
            return $result;
        }

        public function update($table, $set, $where, $params) {
            if (isset($where) && !empty($where)) {
                $sql = "UPDATE {$table} SET {$set} WHERE {$where}";
                $query = $this->conn->prepare($sql);
                            if (false === $query) {
                                    error_log($sql);
                                    error_log(json_encode($params));
                                    error_log(mysqli_error($this->conn));
                            }
                if (!empty($params)) {
                    $types = '';
                    foreach ($params as $field => $param) {
                        $types .= $this->getParamType($param);
                        if (is_string($param)) {
                            unset($p);
                            $p = strip_tags($param);
                            $params[$field] = &$p;
                        } else {
                            $params[$field] = &$params[$field];
                        }
                    }
                    $ref = new ReflectionClass('mysqli_stmt');
                    $method = $ref->getMethod("bind_param");
                    array_unshift($params, $types);
                    $method->invokeArgs($query, $params);
                }
                            if (false === $query) {
                                    error_log($sql);
                                    error_log(json_encode($params));
                                    error_log(mysqli_error($this->conn));
                            }
                $query->execute();
            }
            return;
        }

        public function delete($table, $where, $params, $what = null) {
            if (isset($where) && !empty($where)) {
                $sql = "DELETE {$what} FROM {$table} WHERE {$where}";
                $query = $this->conn->prepare($sql);
                            if (false === $query) {
                                    error_log($sql);
                                    error_log(json_encode($params));
                                    error_log(mysqli_error($this->conn));
                            }
                if (!empty($params)) {
                    $types = '';
                    foreach ($params as $field => $param) {
                        $types .= $this->getParamType($param);
                        $params[$field] = &$params[$field];
                    }
                    $ref = new ReflectionClass('mysqli_stmt');
                    $method = $ref->getMethod("bind_param");
                    array_unshift($params, $types);
                    $method->invokeArgs($query, $params);
                }
                            if (false === $query) {
                                    error_log($sql);
                                    error_log(json_encode($params));
                                    error_log(mysqli_error($this->conn));
                            }
                $query->execute();
            }
            return;
        }
    }
