<?php
 abstract class controllersTemplate 
{
    protected $data = '';
    protected $db = '';
    protected $validator = '';
    protected $response = '';
     
    public function __construct($db, $data, $validator, $response) 
    {
        $this->data = $data;
        $this->db = $db;
        $this->validator = $validator;
        $this->response = $response;
    }
}
