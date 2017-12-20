function c(c)
{
    console.log(c);
}
function checkNullUndefined(val)
{
    return val !== null && typeof val !== 'undefined';
}
function closePopupBox(item)
{
    while ((item = item.parentElement))
    {
        if(item.classList.contains('popupWrapBox'))
        {
            item.style.display = 'none';
            return true;
        }
    }
}

var CommonView = new CommonView(),
    CommonModel  = new CommonModel(),
    Validator = new Validator();

GroupView.prototype = CommonView;
StudentView.prototype = CommonView;

GroupModel.prototype = CommonModel;
StudentModel.prototype = CommonModel;

GroupController.prototype.Validator = Validator;
StudentController.prototype.Validator = Validator;

var GroupModel = new GroupModel(),
    StudentModel = new StudentModel(),
    GroupView = new GroupView(),
    StudentView = new StudentView();

var Group = new GroupController({GroupModel, StudentModel}, GroupView);
var Student = new StudentController({GroupModel, StudentModel}, StudentView);

window.onload = () => 
{
    Group.showAllGroupsRequest();
};


