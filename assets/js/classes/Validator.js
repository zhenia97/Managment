function Validator()
{
    this.validateGroupName = (text) =>
    {
        return /^[a-zA-Z-\d]{2,20}$/g.test(text);
    };
    this.validateGroupSpeciality = (key, specialityKeys) =>
    {
        return key in specialityKeys;
    };
    this.validateUserFirstLastSurName = (text) =>
    {
        return /^[a-zA-Z]{2,20}$/g.test(text);
    };
    this.validateBirthday = (text) =>
    {
        if(/^[\d]{2}.[\d]{2}.[\d]{4}$/g.test(text))
        {
            var arr = text.split('.');
            return arr[0] >= 1 && arr[0] <= 31 && arr[1] >= 1 && arr[1] <= 12 && arr[2] >= 1960 && arr[2] <= 2017;
        }
        return false;
    };
}