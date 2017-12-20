<?php
    require_once '../connect.php';
    
    $db = new DatabaseController();
    $response = new Response(file_get_contents('php://input'));
    $validator = new Validator();
    
    $data = $response->getIncomingData();
    $action = $response->getAction();
    $controllerName = $response->getTargetController();
    
    switch ($controllerName)
    {
        case 'groupController': 
            require_once MAIN_LINK.'/db/controllers/'.$controllerName.'.php';
            break;
        case 'studentController': 
            require_once MAIN_LINK.'/db/controllers/'.$controllerName.'.php';
            break;
    }
    
    if(class_exists($controllerName, false))
    {
        if(!empty($action))
        {
            $controller = new $controllerName($db, $data, $validator, $response);
            if(method_exists($controller, $action))
            {
                $response->setData(call_user_func(array($controller, $action)));
                $response->done();
            }
            $response->setError(101);
        }
        $response->setError(100);
    }
    $response->setError(102);