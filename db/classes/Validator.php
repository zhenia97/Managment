<?php
class Validator 
{
    public function validateGroupName($text)
    {
        return preg_match_all('/^[a-zA-Z-\d]{2,20}$/', $text);
    }
    public function validateUserFirstLastSurName($text)
    {
        return preg_match_all('/^[a-zA-Z]{2,20}$/', $text);
    }
    public function validateBirthday($text)
    {
        if(preg_match_all('/^[\d]{2}.[\d]{2}.[\d]{4}$/', $text))
        {
            $arr = explode('.', $text);
            return $arr[0] >= 1 && $arr[0] <= 31 && $arr[1] >= 1 && $arr[1] <= 12 && $arr[2] >= 1960 && $arr[2] <= 2017;
        }
        return false;
    }
}
