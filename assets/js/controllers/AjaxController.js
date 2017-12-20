function AjaxController(action, controller, data, successHandler, errorHandler)
{
    var dataTotal = {
        requestInfo: {
            action,
            data,
            controller
        }
    };
    
    c(dataTotal);
    $.ajax({
        url:'http://Managment/db/main.php',
        method:"POST",
        contentType: "application/json",
        data:JSON.stringify(dataTotal),
        success: function(data)
        {   
            var response = jQuery.parseJSON(data);
            c(response);
            if(response.code === '000')
            {
               successHandler(response);
            }
            else
            {
                errorHandler(response.code);
            }
        }
    }); 
}