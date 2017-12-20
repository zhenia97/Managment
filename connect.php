<?php
    require_once 'config.php';
    require_once MAIN_LINK.'/db/controllers/controllersTemplate.php';
    require_once MAIN_LINK.'/db/classes/Database.php';
    require_once MAIN_LINK.'/db/classes/Response.php';
    require_once MAIN_LINK.'/db/classes/Validator.php';
    
    function c($c)
    {
        echo '<pre><br>';
        print_r($c);
        echo '</pre><br>';
    } 