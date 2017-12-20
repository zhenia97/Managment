<?php
class Response 
{
    private $code;
    private $data;
    private $incoming;
    private $message = 'Success';

    public function __construct($input) 
    {
        $input = json_decode($input, true);
        
        $this->code = '000';
        $this->data = [];
        $this->incoming = $input['requestInfo'];
    }
    public function done()
    {
        die(json_encode(get_object_vars($this)));
    }
    public function setData($data)
    {
        $this->data = $data;
    }
    public function getAction()
    {
        return $this->incoming['action'];
    }
    public function getIncomingData()
    {
        return $this->incoming['data'];
    }
    public function getTargetController()
    {
        return $this->incoming['controller'];
    }
    public function setError($error)
    {
        $this->code = $error;
        
        switch($error)
        {
            case 100: $this->message = 'Empty action'; break;
            case 101: $this->message = 'Unefined action method'; break;
            case 102: $this->message = 'Unefined class'; break;
            case 103: $this->message = 'Empty group name'; break;
            case 104: $this->message = 'Empty group curator'; break;
            case 105: $this->message = 'Empty group speciality'; break;
            case 106: $this->message = 'Empty group id'; break;
            case 107: $this->message = 'Empty user first name'; break;
            case 108: $this->message = 'Empty user last name'; break;
            case 109: $this->message = 'Empty user surname'; break;
            case 110: $this->message = 'Empty user birthdaty'; break;
            case 111: $this->message = 'Empty student id'; break;
            case 112: $this->message = 'Student not exist'; break;
            case 113: $this->message = 'Group not exist'; break;
        }
        $this->done();
    }
}