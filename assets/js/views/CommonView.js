function CommonView()
{
    this.closeAllPopups = () =>
    {
        var popups = document.getElementsByClassName('popupBox');
        
        for(let i = 0, len = popups.length; i < len; i++)
        {
            popups[i].parentNode.style.display = 'none';
        }
    };
}